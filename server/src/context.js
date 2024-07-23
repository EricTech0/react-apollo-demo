const { getUserId } = require('./utils');
const { PrismaClient } = require('@prisma/client');
const { PubSub } = require('apollo-server');

const context = ({ req }) => {
    return {
        ...req,
        prisma: new PrismaClient(),
        pubsub: new PubSub(),
        userId: req && req.headers.authorization ? getUserId(req) : null
    };
};

module.exports = context;
