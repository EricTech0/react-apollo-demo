const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const context = require('./context');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
});

server.listen().then(({ url }) => {
    console.log(`Server is running on ${url}`);
});
