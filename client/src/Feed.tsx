import {
  gql,
  useLazyQuery,
} from "@apollo/client";
import { LinkItem, Link } from "./LinkItem";

export const CORE_LINK_FIELDS = gql`
  fragment CoreLinkFields on Link {
    id
    createdAt
    url
    description
    postedBy {
      id
      name
    }
    votes {
      id
      user {
        id
      }
    }
  }
`;

export const GET_FEED = gql`
  ${CORE_LINK_FIELDS}
  query GetFeed($sortBy: LinkOrderByInput!) {
    feed(orderBy: $sortBy) {
      id
      links {
        ...CoreLinkFields
      }
    }
  }
`;

const Feed = () => {
  const [getFeed, { loading, error, data }] =
    useLazyQuery(GET_FEED);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data?.feed?.links &&
        data.feed.links.map(
          (link: Link, index: number) => (
            <LinkItem
              key={link.id}
              link={link}
              index={index}
            />
          )
        )}
      <button
        onClick={() =>
          getFeed({
            variables: {
              sortBy: { createdAt: "asc" },
            },
          })
        }
      >
        fetch graphql query
      </button>
    </>
  );
};
export default Feed;
