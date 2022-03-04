import StatusCard from "../../components/UI/StatusCard/StatusCard";
import classes from "./Dashboard.module.css";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Timeline from "../../components/Timeline/Timeline";
import { useLazyQuery } from "@apollo/client";
import { STATUS_COUNT } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import { useContext, useEffect } from "react";
import { Status } from "../../models/Enums";
import { Divider, Spin } from "antd";
import TicketStatusHistory from "../../components/Dashboard/TicketStatusHistory";
import UserContext from "../../contexts/UserContext";
import { useIsSmallDevice } from "../../helpers/useIsSmallDevice";
import AgentQueue from "./AgentQueue";
import NewTicket from "../../components/Ticket/NewTicket";
Chart.register(...registerables);

const pieData = {
  labels: ["Urgent", "High", "Medium", "Low"],
  datasets: [
    {
      backgroundColor: [
        "rgba(71, 102, 255, 0.2)",
        "rgba(0, 255, 239, 0.2)",
        "rgba(0, 102, 164, 0.2)",
        "rgba(0, 183, 235, 0.2)",
      ],
      borderColor: [
        "rgba(71, 102, 255, 1)",
        "rgba(0, 255, 239, 1)",
        "rgba(0, 102, 164, 1)",
        "rgba(0, 183, 235, 1)",
      ],
      borderWidth: 1,
      data: [1, 2, 3, 4],
    },
  ],
};

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [
    getStatusCount,
    {
      data: statusCounts,
      loading: loadingStatusCount,
      refetch: refetchStatusCount,
    },
  ] = useLazyQuery(STATUS_COUNT, {
    onError: (err) => {
      errorMessage(err, "Error loading ticket status count.");
    },
  });

  useEffect(() => {
    getStatusCount();
  }, []);

  // Refetch ticket status count every 10 seconds
  useEffect(() => {
    var handle = setInterval(refetchStatusCount, 10000);
    return () => {
      clearInterval(handle);
    };
  });

  const isSmallDevice = useIsSmallDevice();

  return (
    <div className={classes["ticket-dashboard-container"]}>
      <div
        style={{
          display: "flex",
          flexDirection: isSmallDevice ? "column" : "row",
        }}
      >
        <div
          style={{
            width: isSmallDevice ? "100%" : 200,
            margin: isSmallDevice ? "20px 0 20px 0" : "0 20px 0 0",
            padding: isSmallDevice ? "0 20px" : undefined,
          }}
        >
          <NewTicket type="Card" />
        </div>
        <Divider type="vertical" style={{ height: "100%" }} />
        <div
          className={classes["ticket-dashboard-container__status-card-wrapper"]}
        >
          {loadingStatusCount ? (
            <Spin size="large" />
          ) : (
            <>
              {(Object.keys(Status) as Array<keyof typeof Status>).map(
                (status) => (
                  <StatusCard
                    key={status}
                    status={status}
                    amount={
                      statusCounts?.ticketStatusCount.find(
                        (s: any) => s.status === status
                      )?.count ?? 0
                    }
                  />
                )
              )}
            </>
          )}
        </div>
      </div>
      {(user?.isAdmin || user?.isAgent) && statusCounts && (
        <div
          style={{
            display: "flex",
            flexDirection: isSmallDevice ? "column" : "row",
            marginTop: 20,
            alignItems: "flex-start",
            paddingBottom: 20,
          }}
        >
          <TicketStatusHistory today={statusCounts?.ticketStatusCount} />
          <AgentQueue />
        </div>
      )}
      {/* <div className={classes["ticket-dashboard-container__card-wrapper"]}>
        <div
          className={
            classes["ticket-dashboard-container__my-activities-wrapper"]
          }
        >
          <Timeline />
        </div>
        <div
          className={classes["ticket-dashboard-container__piechart_wrapper"]}
        >
          <Pie data={pieData} />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
