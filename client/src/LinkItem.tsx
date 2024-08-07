export interface Link {
  id: string;
  createdAt: Date;
  url: string;
  description: string;
  postedBy: {
    id: string;
    name: string;
  };
  votes: {
    id: string;
    user: { id: string };
  }[];
}

export const LinkItem = ({
  link: {
    createdAt,
    url,
    description,
    postedBy,
    votes,
  },
  index,
}: {
  link: Link;
  index: number;
}) => {
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index}.</span>
        <div
          className="ml1 gray f11"
          style={{ cursor: "pointer" }}
        >
          ▲
        </div>
      </div>
      <div className="ml1">
        <div>
          {description} ({url})
        </div>
        <div className="f6 lh-copy gray">
          {votes.length} votes | by{" "}
          {postedBy ? postedBy.name : "Unknown"}{" "}
          {createdAt.toString()}
        </div>
      </div>
    </div>
  );
};
