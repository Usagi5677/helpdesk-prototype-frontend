import { errorMessage } from "../../../helpers/gql";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { Spin } from "antd";
import { useLazyQuery } from "@apollo/client";
import { SINGLEKNOWLEDGEBASE } from "../../../api/queries";
import KnowledgebaseModel from "../../../models/Knowledgebase";
import sanitizeHtml from "sanitize-html";
import classes from "./ViewKnowledgebase.module.css";
import { FaArrowLeft } from "react-icons/fa";
import moment from "moment";
import ReactQuill from "react-quill";

const ViewKnowledgebase = () => {
  const { id }: any = useParams();
  const navigate = useNavigate();

  const [getKnowledgebase, { data: knowledgebase, loading: loadingKnowledgebase }] = useLazyQuery(
    SINGLEKNOWLEDGEBASE,
    {
      onError: (err) => {
        errorMessage(err, "Error loading request.");
      },
    }
  );

  // Fetch knowledgebase when component mount
  useEffect(() => {
    getKnowledgebase({ variables: { knowledgebaseId: parseInt(id) } });
  }, []);

  const knowledgebaseData: KnowledgebaseModel = knowledgebase?.singleKnowledgebase;

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
          <button className={classes["back-btn"]} onClick={() => navigate(-1)}>
            <FaArrowLeft /> <span>Back</span>
          </button>
          <div className={classes["title"]}>{knowledgebaseData?.title}</div>
          <div style={{ width: 28 }}>{loadingKnowledgebase && <Spin />}</div>
        </div>
        <div className={classes["content"]}>
          <ReactQuill readOnly={true} theme={"bubble"} value={clean}/>
        </div>
      </div>
      <div className={classes["knowledgebase-information-wrapper"]}>
        <div className={classes["heading"]}>Knowledgebase Information</div>
        <div>
          <div className={classes["heading__row"]}>
            <div className={classes["heading__row__left"]}>ID:</div>
            <div className={classes["heading__row__right"]}>{knowledgebaseData?.id}</div>
          </div>
          <div className={classes["heading__row"]}>
            <div className={classes["heading__row__left"]}>Mode:</div>
            <div className={classes["heading__row__right"]}>{knowledgebaseData?.mode}</div>
          </div>
          <div className={classes["heading__row"]}>
            <div className={classes["heading__row__left"]}>Created At:</div>
            <div className={classes["heading__row__right"]}>
              {moment(knowledgebaseData?.createdAt).format("DD MMMM YYYY HH:mm")}
            </div>
          </div>
          <div className={classes["heading__row"]}>
            <div className={classes["heading__row__left"]}>Created By:</div>
            <div className={classes["heading__row__right"]}>
              {knowledgebaseData?.createdBy.fullName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewKnowledgebase;
