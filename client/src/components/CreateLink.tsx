import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_LINK_MUTATION = gql`
  mutation PostAnonymousMutation(
    $description: String!
    $url: String!
  ) {
    postAnonymous(description: $description, url: $url) {
      id
      url
      description
    }
  }
`;


const CreateLink = () => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        description: '',
        url: ''
    });

    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        onError(err) {
            console.log(err);
        },
        onCompleted: () => navigate('/')
    });

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createLink({
                        variables: {
                            description: formState.description,
                            url: formState.url
                        }
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
                                description: e.target.value
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
                                url: e.target.value
                            })
                        }
                        type="text"
                        placeholder="The URL for the link"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateLink;