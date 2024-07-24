import Link from './Link';
import { useQuery, gql } from '@apollo/client';

const FEED_QUERY = gql`
    query {
        feed(orderBy: { createdAt: asc }) {
            id
            description
            url
        }
    }
`;

const LinkList = () => {
    const { data, loading, error } = useQuery(FEED_QUERY);

    return (
        <div>
            {data && (
                <>
                    {data.feed.map((link: any) => (
                        <Link key={link.id} {...link} />
                    ))}
                </>
            )}
        </div>
    );
};

export default LinkList