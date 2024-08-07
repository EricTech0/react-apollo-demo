import { gql, TypedDocumentNode, useSuspenseQuery } from '@apollo/client';
import { Link, LinkItem } from './LinkItem';
import { Suspense } from 'react';

interface Data {
    feed: {
        id: string;
        links: Link[];
    };
}

interface Variables {
    sortBy?: LinkOrderByInput;
}

interface LinkOrderByInput {
    description: string
    url: string
    createdAt: string
}

const GET_FEED: TypedDocumentNode<Data, Variables> = gql`
    query GetFeed($sortBy: LinkOrderByInput) {
        feed(orderBy: $sortBy) {
            id
            links {
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
        }
    }
`;


const Feed = () => {
    const { data, error } = useSuspenseQuery(GET_FEED);

    if (error) return `Error! ${error.message}`;

    return (
        <Suspense fallback={<p>Loading..</p>}>
            {
                data?.feed?.links &&
                data.feed.links.map(
                    (link: Link, index: number) =>
                        <LinkItem key={link.id} link={link} index={index} />)
            }
        </Suspense >
    )

}

export default Feed