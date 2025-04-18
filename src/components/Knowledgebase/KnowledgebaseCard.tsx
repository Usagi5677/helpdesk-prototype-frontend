import { Card, Avatar, Popconfirm, Button, message, Tooltip } from "antd";
import Knowledgebase from "../../models/Knowledgebase";
import { FaTrash } from "react-icons/fa";
import classes from "./KnowledgebaseCard.module.css";
import sanitizeHtml from "sanitize-html";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useMutation } from "@apollo/client";
import { errorMessage } from "../../helpers/gql";
import { DELETE_KNOWLEDGEBASE } from "../../api/mutations";
import { Link } from "react-router-dom";
import EditKnowledgebase from "./EditKnowledgebase";
import { stringToColor } from "../../helpers/style";
import SiteWithIcon from "../common/SiteWithIcon";
const { Meta } = Card;

const KnowledgebaseCard = ({
  knowledgebase,
}: {
  knowledgebase: Knowledgebase;
}) => {
  const { user } = useContext(UserContext);
  const [removeKnowledgebase, { loading: deleting }] = useMutation(
    DELETE_KNOWLEDGEBASE,
    {
      onCompleted: () => {
        message.success("Successfully removed knowledge base.");
      },
      onError: (error) => {
        errorMessage(error, "Unexpected error while removing knowledge base.");
      },
      refetchQueries: ["getAllKnowledgebase"],
    }
  );
  const remove = () => {
    removeKnowledgebase({
      variables: {
        knowledgebaseId: knowledgebase.id,
      },
    });
  };

  //sanitize tags
  const dirty = knowledgebase.body;
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

  const regex = /(<([^>]+)>)/gi;
  const htmlTagsRemoved = clean.replace(regex, " ");
  return (
    <Card
      className={classes["knowledgebase-card"]}
      bodyStyle={{
        padding: 0,
      }}
      actions={
        user?.isAdmin
          ? [
              <Popconfirm
                key="delete"
                disabled={deleting}
                title={`Are you sure to remove this information?`}
                onConfirm={() => remove()}
                okText="Confirm"
                cancelText="No"
                placement="topRight"
              >
                <Tooltip title={"Delete"} placement="top">
                  <Button
                    htmlType="button"
                    size="middle"
                    icon={<FaTrash />}
                    shape="round"
                    className={classes["btn-delete"]}
                    loading={deleting}
                  />
                </Tooltip>
              </Popconfirm>,
              <EditKnowledgebase
                key="editKnowledgebase"
                knowledgebase={knowledgebase}
              />,
            ]
          : undefined
      }
    >
      <Link to={"/knowledgebase/" + knowledgebase.id} key={knowledgebase.id}>
        <Meta
          title={
            <div
              className={classes["title-wrapper"]}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ marginRight: ".5rem" }}>
                <Tooltip
                  title={`${knowledgebase.createdBy.fullName} (${knowledgebase.createdBy.rcno})`}
                  placement="bottom"
                >
                  <Avatar
                    style={{
                      backgroundColor: stringToColor(
                        knowledgebase.createdBy.fullName
                      ),
                    }}
                  >
                    {knowledgebase.createdBy.fullName
                      .match(/^\w|\b\w(?=\S+$)/g)
                      ?.join()
                      .replace(",", "")
                      .toUpperCase()}
                  </Avatar>
                </Tooltip>
              </div>
              <div
                style={{
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {knowledgebase.title}
              </div>
              <SiteWithIcon site={knowledgebase.site} small />
            </div>
            // </div>
          }
        />
        <div className={classes["divider"]}></div>

        <div
          className={classes["knowledgebase-card-description"]}
          style={{
            height: 80,
            overflow: "hidden",
            textOverflow: "ellipsis",
            padding: 10,
          }}
          onClick={() => false}
        >
          <div style={{ whiteSpace: "pre-wrap" }}>{htmlTagsRemoved}</div>
        </div>
      </Link>
    </Card>
  );
};

export default KnowledgebaseCard;
