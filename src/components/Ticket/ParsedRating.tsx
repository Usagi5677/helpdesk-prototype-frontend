import RatingStars from "./RatingStars";

const ParsedRating = ({
  comment,
  match,
  isSelf,
}: {
  comment: string;
  match: string;
  isSelf: boolean;
}) => {
  const rating = parseInt(match.split("rating:")[1]);
  const [first, ...rest] = comment.split(match);
  const commentRemaining = `${first} ${rest.join(match)}`;
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isSelf ? "flex-end" : "flex-start",
        }}
      >
        {commentRemaining.length > 0 && <div>{commentRemaining}</div>}
        <div>
          <RatingStars rating={rating} fontSize={20} />
        </div>
      </div>
    </>
  );
};

export default ParsedRating;
