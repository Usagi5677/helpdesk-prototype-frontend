import { StarOutlined, StarFilled } from "@ant-design/icons";

const RatingStars = ({
  rating,
  fontSize,
}: {
  rating?: number;
  fontSize: number;
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {[1, 2, 3, 4, 5].map((st) => (
        <div key={st} style={{ color: "gold" }}>
          {rating && rating >= st ? (
            <StarFilled style={{ fontSize }} />
          ) : (
            <StarOutlined style={{ fontSize }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default RatingStars;
