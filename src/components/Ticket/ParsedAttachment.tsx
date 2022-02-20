import { Button, Image, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLazyQuery } from "@apollo/client";
import { ATTACHMENT } from "../../api/queries";
import {
  FileOutlined,
  DownloadOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import useIsVisible from "../../helpers/useIsVisible";

const ParsedAttachment = ({
  comment,
  match,
  isSelf,
}: {
  comment: string;
  match: string;
  isSelf: boolean;
}) => {
  const attachmentId = parseInt(match.split("attachment:")[1]);
  const [first, ...rest] = comment.split(match);
  const commentRemaining = `${first} ${rest.join(match)}`;

  const url = `${
    process.env.REACT_APP_API_URL?.split("graphql")[0]
  }attachment/${attachmentId}`;
  const token = localStorage.getItem("helpdesk_token");

  const [file, setFile] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [isImage, setIsImage] = useState(false);

  // This query only loads the attachment's info from the db, not the file
  const [getAttachment, { data: attachment, loading: loadingAttachment }] =
    useLazyQuery(ATTACHMENT, {
      onCompleted: () => {
        // After attachment's info is retrieved, then fetch the file
        getFile();
      },
      onError: () => {
        setIsError(true);
      },
    });

  // Load attachment only if the comment bubble is in view to prevent
  // unnecessary API calls
  const ref = useRef<any>();
  const isVisible = useIsVisible(ref);
  useEffect(() => {
    if (isVisible && !attachment) {
      getAttachment({ variables: { id: attachmentId } });
    }
  }, [isVisible]);

  const getFile = () => {
    setFileLoading(true);
    axios({
      method: "get",
      url,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: token ? `Bearer ${token}` : "",
      },
      responseType: "blob",
    })
      .then(function (response) {
        if (response.headers["content-type"].split("/")[0] === "image") {
          setIsImage(true);
        }
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const dataURL = URL.createObjectURL(blob);
        setFile(dataURL);
      })
      .catch(function () {
        setIsError(true);
      })
      .finally(function () {
        setFileLoading(false);
      });
  };

  // Create a hidden <a> element within the document to act as a download anchor
  const download = () => {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = file;
    a.download = attachment.ticketAttachment.originalName;
    a.click();
  };

  // Shorten file names longer than 25 characters
  const shortFileName = (name: string): string => {
    if (name.length < 25) return name;
    const split = name.split(".");
    const ext = split[split.length - 1];
    const rest = split.slice(0, -1).join(".");
    return `${rest.substring(0, 20)}...${ext}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isSelf ? "flex-end" : "flex-start",
      }}
      ref={ref}
    >
      {commentRemaining.length > 0 && <div>{commentRemaining}</div>}
      <div>
        <FileOutlined />{" "}
        {(loadingAttachment || fileLoading) && (
          <Spin size="small" style={{ marginRight: 5, marginLeft: 5 }} />
        )}
        {attachment && (
          <span>{shortFileName(attachment.ticketAttachment.originalName)}</span>
        )}
        {file && (
          <Button
            icon={<DownloadOutlined />}
            onClick={download}
            shape="circle"
            style={{ marginLeft: 10 }}
          />
        )}
      </div>
      {file && isImage && (
        <div style={{ marginTop: 10 }}>
          <Image height={75} width={75} src={file} />
        </div>
      )}
      {isError && (
        <div style={{ color: "orange" }}>
          <WarningOutlined style={{ marginRight: 5 }} />
          Error loading attachment.
        </div>
      )}
    </div>
  );
};

export default ParsedAttachment;
