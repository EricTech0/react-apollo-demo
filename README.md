1. Start & set up server `cd server && yarn && yarn dev`
2. Navigate to `http://localhost:4000/` to view graphql playground

```
query {
    feed{
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
```

3. `yarn run view-db` to view data in the SQLlite DB on `http://localhost:5555`

4. Start & set up Client `cd client && yarn && yarn start`
