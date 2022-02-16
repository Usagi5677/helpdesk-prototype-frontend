import { Card } from "antd";
import Knowledgebase from "../../models/Knowledgebase";

const KnowledgebaseCard = ({ knowledgebase }: { knowledgebase: Knowledgebase }) => {
  return (
    <Card
      title={knowledgebase.title}
      style={{ width: 300, height: 100, border: "1px solid black", overflow: "hidden" }}
    >
      <div dangerouslySetInnerHTML={{ __html: knowledgebase.body }}></div>
    </Card>
  );
};

export default KnowledgebaseCard;
