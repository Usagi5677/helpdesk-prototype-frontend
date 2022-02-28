import { useState, useEffect, useContext } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { LoadingOutlined, NotificationOutlined, DownOutlined } from "@ant-design/icons";

//import { onMessageListener } from "../../firebase";

import { Spin, Dropdown, Menu, Badge, Button, notification } from "antd";
import UserContext from "../../contexts/UserContext";
//import { useHistory } from "react-router-dom";
//import { leaveUrls, preotUrls } from "../../constants/urls";
import { errorMessage } from "../../helpers/gql";
import { NOTIFICATIONS } from "../../api/queries";
import { FaBars, FaBell } from "react-icons/fa";
import { NOTIFICATION_CREATED } from "../../api/subscriptions";
import classes from "./Notification.module.css";
import { READ_ALL_NOTIFICATIONS, READ_ONE_NOTIFICATION } from "../../api/mutations";

const Notifications = () => {
  const { user } = useContext(UserContext);
  const [subscribed, setSubscribed] = useState(false);

  const [readNotification] = useMutation(READ_ONE_NOTIFICATION, {
    onError: (error) => {
      errorMessage(error, "Unexpected error while reading notification.");
    },
    refetchQueries: ["notifications"],
  });

  const [readAllNotification] = useMutation(READ_ALL_NOTIFICATIONS, {
    onError: (error) => {
      errorMessage(error, "Unexpected error while reading all notification.");
    },
    refetchQueries: ["notifications"],
  });

  const [getAllNotificationOfUser, { data, loading, subscribeToMore }] = useLazyQuery(
    NOTIFICATIONS,
    {
      onCompleted: () => {
        subscribe();
      },
      onError: (err) => {
        errorMessage(err, "Error loading request.");
      },
    }
  );

  useEffect(() => {
    getAllNotificationOfUser();
  }, []);

  const subscribe = () => {
    // Ensure subscription is done once and not every render
    if (subscribed) return;
    subscribeToMore({
      document: NOTIFICATION_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = [...prev.notifications, subscriptionData.data.notificationCreated];
        return { notifications: updated };
      },
    });
    setSubscribed(true);
  };

  const notificationsData: any = data?.notifications;
  console.log(data)
  const renderLog = (log: any) => {
    return (
      <>
        <div>
          <Badge
            status={log.read ? "default" : "processing"}
            style={{ whiteSpace: "normal" }}
            text={log.body}
          />
        </div>
        <div
          style={{
            fontStyle: "italic",
            fontSize: ".8em",
            opacity: 0.8,
          }}
        >
          {moment(log.sendTime).fromNow()}
        </div>
      </>
    );
  };

  return (
    <Dropdown
      placement="bottomRight"
      trigger={["click"]}
      overlay={
        loading && notificationsData?.length === 0 ? (
          <Spin
            style={{ textAlign: "center", padding: "20px 100px" }}
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin={true} />}
          />
        ) : (
          <div className={classes["notification-menu"]}>
            {notificationsData?.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "20px 100px",
                  fontStyle: "italic",
                }}
              >
                You have no notifications!
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onClick={() => {
                      //setNotifications([]);
                      readAllNotification();
                    }}
                    type="link"
                  >
                    Clear All
                  </Button>
                </div>
                {notificationsData?.map((log: any) => (
                  <div
                    className={classes["notification-menu-item"]}
                    style={{ padding: "7px 15px" }}
                    key={log.id}
                  >
                    <div
                      onClick={(e) => readNotification({ variables: { notificationId: log.id } })}
                    >
                      {renderLog(log)}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )
      }
    >
      <div style={{ position: "relative" }}>
        <Badge size="small" count={notificationsData?.length} style={{ marginTop: 6 }}>
          <FaBell
            style={{
              cursor: "pointer",
              color: "white",
              fontSize: 18,
              marginTop: 6,
            }}
          />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default Notifications;
