import StatusCard from "../../components/UI/StatusCard/StatusCard";
import classes from "./Dashboard.module.css";
import { Chart, registerables } from "chart.js";
import { useLazyQuery } from "@apollo/client";
import { STATUS_COUNT } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import { useContext, useEffect, useState } from "react";
import { Status } from "../../models/Enums";
import { Divider, Spin } from "antd";
import TicketStatusHistory from "../../components/Dashboard/TicketStatusHistory";
import UserContext from "../../contexts/UserContext";
import { useIsSmallDevice } from "../../helpers/useIsSmallDevice";
import AgentQueue from "./AgentQueue";
import NewTicket from "../../components/Ticket/NewTicket";
import SiteFilter from "../../components/common/SiteFilter";
Chart.register(...registerables);

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [siteId, setSiteId] = useState<number | null>(null);

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
    getStatusCount({ variables: { siteId } });
  }, [getStatusCount, siteId]);

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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NewTicket type="Dashboard" />
      </div>
      <Divider type="horizontal" />
      {(user?.isAdmin || user?.isAgent) &&
        user?.siteAccess.adminOrAgent.length > 1 && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SiteFilter
              value={siteId}
              onChange={(value) => {
                setSiteId(value);
              }}
              allowClear={true}
              sites={user?.siteAccess.adminOrAgent}
            />
          </div>
        )}
      <div
        style={{
          display: "flex",
          flexDirection: isSmallDevice ? "column" : "row",
        }}
      >
        <div
          className={classes["ticket-dashboard-container__status-card-wrapper"]}
        >
          {loadingStatusCount ? (
            <Spin style={{ marginTop: "2rem" }} size="large" />
          ) : (
            <>
              {(Object.keys(Status) as Array<keyof typeof Status>).map(
                (status) => (
                  <StatusCard
                    key={status}
                    siteId={siteId}
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
          <TicketStatusHistory
            today={statusCounts?.ticketStatusCount}
            siteId={siteId}
          />
          <AgentQueue siteId={siteId} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
