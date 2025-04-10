import { useLazyQuery } from "@apollo/client";
import { Badge, Collapse, Divider } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AGENT_QUEUE } from "../../api/queries";
import SiteWithIcon from "../../components/common/SiteWithIcon";
import StatusTag from "../../components/common/StatusTag";
import { errorMessage } from "../../helpers/gql";
import { getEqualValuesUnder140 } from "../../helpers/style";
import { useIsSmallDevice } from "../../helpers/useIsSmallDevice";
import Ticket from "../../models/Ticket";
import User from "../../models/User";

interface AgentQueueModel {
  tickets: Ticket[];
  agent: User;
}

const AgentQueue = ({ siteId }: { siteId: number | null }) => {
  const [getAgentQueue, { data, refetch }] = useLazyQuery(AGENT_QUEUE, {
    onError: (err) => {
      errorMessage(err, "Error loading agent queue.");
    },
  });

  useEffect(() => {
    getAgentQueue({ variables: { siteId } });
  }, [getAgentQueue, siteId]);

  // Refetch ticket status count every 10 seconds
  useEffect(() => {
    var handle = setInterval(refetch, 10000);
    return () => {
      clearInterval(handle);
    };
  });

  const highestCount = () => {
    let highest = 5;
    data?.agentQueue.forEach((aq: any) => {
      const count = aq.tickets.length;
      if (count > highest) highest = count;
    });
    return highest;
  };

  const colors = getEqualValuesUnder140(highestCount());

  const sortedQueue = data?.agentQueue
    .slice()
    .sort(
      (a: AgentQueueModel, b: AgentQueueModel) =>
        b.tickets.length - a.tickets.length
    );

  const isSmallDevice = useIsSmallDevice();
  return (
    <div
      style={{
        width: isSmallDevice ? "100%" : 300,
        borderRadius: 20,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        backgroundColor: "white",
        margin: isSmallDevice ? "20px 0 0 0" : "0 0 0 20px",
        padding: 20,
      }}
    >
      {sortedQueue?.length > 0 ? (
        <Collapse ghost style={{ paddingBottom: 12 }}>
          {sortedQueue.map((rec: AgentQueueModel) => (
            <Collapse.Panel
              collapsible={rec.tickets.length === 0 ? "disabled" : undefined}
              header={
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Badge
                    count={rec.tickets.length}
                    showZero
                    style={{
                      backgroundColor: `hsla(${
                        colors[rec.tickets.length]
                      },100%, 85%, 1)`,
                      color: "black",
                      marginRight: ".5rem",
                    }}
                  />
                  {rec.agent.fullName} ({rec.agent.rcno})
                </div>
              }
              key={rec.agent.id}
            >
              {rec.tickets.map((ticket: Ticket, i: number) => (
                <div key={ticket.id}>
                  {i !== 0 && <Divider style={{ margin: 5 }} />}
                  <Link to={`/ticket/${ticket.id}`}>
                    <div
                      id="agentQueueTicket"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "4px 0 4px 10px",
                        borderRadius: 20,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: ".25rem" }}>
                          <SiteWithIcon site={ticket.site} small />
                        </div>
                        <strong style={{ marginRight: ".25rem" }}>
                          {ticket.id}:
                        </strong>
                        {ticket.title}
                      </div>
                      <div>
                        <StatusTag status={ticket.status} />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Collapse.Panel>
          ))}
        </Collapse>
      ) : (
        "No agents assigned to site."
      )}
    </div>
  );
};

export default AgentQueue;
