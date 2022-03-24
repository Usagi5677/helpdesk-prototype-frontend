import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { STATUS_COUNT_HISTORY } from "../../api/queries";
import moment from "moment";
import { Status } from "../../models/Enums";
import { statusColors } from "../../helpers/style";
import { DatePicker, Spin } from "antd";
import { errorMessage } from "../../helpers/gql";
import { useIsSmallDevice } from "../../helpers/useIsSmallDevice";
import { DATETIME_FORMATS } from "../../helpers/constants";

const TicketStatusHistory = ({
  today,
  siteId,
}: {
  today: any;
  siteId: number | null;
}) => {
  const [dates, setDates] = useState<any>([
    moment().subtract(1, "week"),
    moment(),
  ]);
  const [getHistory, { data: history, loading }] = useLazyQuery(
    STATUS_COUNT_HISTORY,
    {
      onError: (err) => {
        errorMessage(err, "Error loading history.");
      },
    }
  );

  useEffect(() => {
    getHistory({
      variables: {
        from: dates[0].toISOString(),
        to: dates[1].toISOString(),
        siteId,
      },
    });
  }, [dates, getHistory, siteId]);

  let data = () => {
    let labels = history?.ticketStatusCountHistory.map((rec: any) =>
      moment(rec.date).format(DATETIME_FORMATS.DAY_MONTH)
    );
    let datasets = (Object.keys(Status) as Array<keyof typeof Status>).map(
      (status) => {
        const [color, bgColor] = statusColors(status);
        return {
          label: status,
          backgroundColor: bgColor,
          borderColor: color,
          borderWidth: 1,
          data: history?.ticketStatusCountHistory.map(
            (rec: any) =>
              rec.statusCounts.find(
                (statusCount: any) => statusCount.status === status
              )?.count ?? 0
          ),
        };
      }
    );

    if (history && today) {
      const todayDate = moment();
      if (dates[1].isSame(todayDate, "day")) {
        labels.push(todayDate.format(DATETIME_FORMATS.DAY_MONTH));
        (Object.keys(Status) as Array<keyof typeof Status>).forEach(
          (status: any) => {
            let dataset = datasets.find((ds) => ds.label === status);
            let todayData = today.find((t: any) => t.status === status);
            if (dataset) {
              dataset.data.push(todayData?.count ?? 0);
            }
          }
        );
      }
    }
    return {
      labels,
      datasets,
    };
  };

  const isSmallDevice = useIsSmallDevice();

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        flex: 1,
        width: isSmallDevice ? "100%" : undefined,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <DatePicker.RangePicker
          defaultValue={dates}
          format={DATETIME_FORMATS.DAY_MONTH_YEAR}
          style={{ width: 350, borderRadius: 20 }}
          popupStyle={{ borderRadius: 20 }}
          disabledDate={(date) => date.isAfter(moment(), "day")}
          onChange={setDates}
          allowClear={false}
          ranges={{
            "Past 7 Days": [moment().subtract(1, "week"), moment()],
            "This Week": [moment().startOf("week"), moment()],
            "Past 30 Days": [moment().subtract(30, "day"), moment()],
            "This Month": [moment().startOf("month"), moment()],
          }}
        />
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 400,
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <Bar
            data={data()}
            height={400}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TicketStatusHistory;
