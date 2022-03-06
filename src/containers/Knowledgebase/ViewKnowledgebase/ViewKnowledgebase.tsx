import { errorMessage } from "../../../helpers/gql";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { Button, Spin } from "antd";
import { useLazyQuery } from "@apollo/client";
import { SINGLEKNOWLEDGEBASE } from "../../../api/queries";
import KnowledgebaseModel from "../../../models/Knowledgebase";
import sanitizeHtml from "sanitize-html";
import classes from "./ViewKnowledgebase.module.css";
import moment from "moment";
import ReactQuill from "react-quill";
import { LeftOutlined } from "@ant-design/icons";
import UserAvatar from "../../../components/common/UserAvatar";

const ViewKnowledgebase = () => {
  const { id }: any = useParams();
  const navigate = useNavigate();

  const [
    getKnowledgebase,
    { data: knowledgebase, loading: loadingKnowledgebase },
  ] = useLazyQuery(SINGLEKNOWLEDGEBASE, {
    onError: (err) => {
      errorMessage(err, "Error loading request.");
    },
  });

  // Fetch knowledgebase when component mount
  useEffect(() => {
    getKnowledgebase({ variables: { knowledgebaseId: parseInt(id) } });
  }, [getKnowledgebase, id]);

  const knowledgebaseData: KnowledgebaseModel =
    knowledgebase?.singleKnowledgebase;

  //sanitize tags
  const dirty = knowledgebaseData?.body;
  const clean = sanitizeHtml(dirty, {
    allowedTags: [
      "address",
      "article",
      "aside",
      "footer",
      "header",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "hgroup",
      "main",
      "nav",
      "section",
      "blockquote",
      "dd",
      "div",
      "dl",
      "dt",
      "figcaption",
      "figure",
      "hr",
      "li",
      "main",
      "ol",
      "p",
      "pre",
      "ul",
      "a",
      "abbr",
      "b",
      "bdi",
      "bdo",
      "br",
      "cite",
      "code",
      "data",
      "dfn",
      "em",
      "i",
      "kbd",
      "mark",
      "q",
      "rb",
      "rp",
      "rt",
      "rtc",
      "ruby",
      "s",
      "samp",
      "small",
      "span",
      "strong",
      "sub",
      "sup",
      "time",
      "u",
      "var",
      "wbr",
      "caption",
      "col",
      "colgroup",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "tr",
    ],
    allowedAttributes: {
      a: ["href"],
    },
  });

  return (
    <div className={classes["knowledgebase-container"]}>
      <div className={classes["knowledgebase-content-wrapper"]}>
        <div className={classes["header"]}>
          <Button
            type="ghost"
            style={{ borderRadius: 20 }}
            onClick={() => navigate(-1)}
            icon={<LeftOutlined />}
          >
            Back
          </Button>
          <div className={classes["title"]}>{knowledgebaseData?.title}</div>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  marginRight: 10,
                }}
              >
                <div>{knowledgebaseData?.createdBy.fullName}</div>
                <div
                  style={{ fontSize: "80%", opacity: 0.5 }}
                  title={moment(knowledgebaseData?.createdAt).format(
                    "DD MMMM YYYY HH:mm:ss"
                  )}
                >
                  {moment(knowledgebaseData?.createdAt).format("DD MMMM YYYY")}
                </div>
              </div>
              <UserAvatar user={knowledgebaseData?.createdBy} />
            </div>
            <div style={{ width: 28 }}>{loadingKnowledgebase && <Spin />}</div>
          </div>
        </div>
        <div className={classes["content"]}>
          <ReactQuill readOnly={true} theme={"bubble"} value={clean} />
        </div>
      </div>
    </div>
  );
};

export default ViewKnowledgebase;
