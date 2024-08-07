import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import {
  CORE_LINK_FIELDS,
  GET_FEED,
} from "./Feed";
import { Link } from "./LinkItem";

const CREATE_LINK_MUTATION = gql`
  ${CORE_LINK_FIELDS}
  mutation PostMutationAnonymous(
    $description: String!
    $url: String!
  ) {
    postAnonymous(
      description: $description
      url: $url
    ) {
      ...CoreLinkFields
    }
  }
`;

const CreateFeed = () => {
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

  const [createFeed, { data, loading, error }] =
    useMutation(CREATE_LINK_MUTATION, {
      update(cache, { data: { postAnonymous } }) {
        // Read the existing feed from the cache
        const existingData = cache.readQuery<{
          feed: { links: Link[] };
        }>({
          query: GET_FEED,
          variables: {
            sortBy: { createdAt: "asc" },
          }, // Ensure you include the variables
        });

        if (existingData && existingData.feed) {
          // Update the cache with the new link
          cache.writeQuery({
            query: GET_FEED,
            data: {
              feed: {
                ...existingData.feed,
                links: [
                  ...existingData.feed.links,
                  postAnonymous,
                ],
              },
            },
            variables: {
              sortBy: { createdAt: "asc" },
            }, // Ensure you include the variables
          });
        }
      },
    });

  if (error)
    return `Submission error! ${error.message}`;

  return (
    <div>
      <h3>New Feed</h3>
      {loading ? (
        "loading..."
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createFeed({
              variables: {
                description:
                  formState.description,
                url: formState.url,
              },
            });
          }}
        >
          <div className="flex flex-column mt3">
            <input
              className="mb2"
              value={formState.description}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  description: e.target.value,
                })
              }
              type="text"
              placeholder="A description for the link"
            />
            <input
              className="mb2"
              value={formState.url}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  url: e.target.value,
                })
              }
              type="text"
              placeholder="The URL for the link"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default CreateFeed;
