import StatusCard from "../../components/UI/StatusCard/StatusCard";
import classes from "./Dashboard.module.css";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Timeline from "../../components/Timeline/Timeline";
import { useLazyQuery } from "@apollo/client";
import { STATUS_COUNT } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import { useEffect } from "react";
import { Status } from "../../models/Enums";
import { Spin } from "antd";
Chart.register(...registerables);

const data = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      label: "Open",
      backgroundColor: "rgba(0, 183, 255, 0.2)",
      borderColor: "rgb(0, 183, 255)",
      borderWidth: 1,
      data: [3, 3, 3, 3, 3, 3, 3],
    },
    {
      label: "Pending",
      backgroundColor: "rgba(247, 173, 3, 0.2)",
      borderColor: "rgb(247, 173, 3)",
      borderWidth: 1,
      data: [6, 6, 6, 6, 6, 6, 6],
    },
    {
      label: "Solved",
      backgroundColor: "rgba(83, 233, 0, 0.2)",
      borderColor: "rgb(83, 233, 0)",
      borderWidth: 1,
      data: [5, 5, 5, 5, 5, 5, 5],
    },
    {
      label: "Closed",
      backgroundColor: "rgba(140, 146, 149, 0.2)",
      borderColor: "rgb(140, 146, 149)",
      borderWidth: 1,
      data: [4, 4, 4, 4, 4, 4, 4],
    },
    {
      label: "Unassigned",
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      borderColor: "rgb(255, 0, 0)",
      borderWidth: 1,
      data: [1, 1, 1, 1, 1, 1],
    },
  ],
};

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

const options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const Dashboard = () => {
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

  return (
    <div className={classes["ticket-dashboard-container"]}>
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
                  title={status}
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
      <div className={classes["ticket-dashboard-container__barchart_wrapper"]}>
        <Bar data={data} height={400} width={600} options={options} />
      </div>
      <div className={classes["ticket-dashboard-container__card-wrapper"]}>
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
      </div>
    </div>
  );
};

export default Dashboard;
