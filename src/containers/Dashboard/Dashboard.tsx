import {
  FaBoxOpen,
  FaSpinner,
  FaCheck,
  FaBan,
  FaUserAltSlash,
} from "react-icons/fa";
import StatusCard from "../../components/UI/StatusCard/StatusCard";
import classes from "./Dashboard.module.css";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

var data = {
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

var options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const Dashboard = () => {
  return (
    <div className={classes["ticket-dashboard-container"]}>
      <div
        className={classes["ticket-dashboard-container__status-card-wrapper"]}
      >
        <StatusCard
          icon={<FaBoxOpen />}
          title={"Open"}
          amount={10}
          iconBackgroundColor={"rgba(0, 183, 255, 0.2)"}
          iconColor={"rgb(0, 183, 255)"}
        />
        <StatusCard
          icon={<FaSpinner />}
          title={"Pending"}
          amount={10}
          iconBackgroundColor={"rgba(247, 173, 3, 0.2)"}
          iconColor={"rgb(247, 173, 3)"}
        />
        <StatusCard
          icon={<FaCheck />}
          title={"Solved"}
          amount={10}
          iconBackgroundColor={"rgba(83, 233, 0, 0.2)"}
          iconColor={"rgb(83, 233, 0)"}
        />
        <StatusCard
          icon={<FaBan />}
          title={"Closed"}
          amount={10}
          iconBackgroundColor={"rgba(140, 146, 149, 0.2)"}
          iconColor={"rgb(140, 146, 149)"}
        />
        <StatusCard
          icon={<FaUserAltSlash />}
          title={"Unassigned"}
          amount={10}
          iconBackgroundColor={"rgba(255, 0, 0, 0.2)"}
          iconColor={"rgb(255, 0, 0)"}
        />
      </div>
      <div className={classes['ticket-dashboard-container__barchart_wrapper']}>
        <Bar data={data} height={400} width={600} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
