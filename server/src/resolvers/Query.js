async function feed(parent, args, context, info) {
    const where = args.filter
        ? {
            OR: [
                { description: { contains: args.filter } },
                { url: { contains: args.filter } },
            ],
        }
        : {}

    const links = await context.prisma.link.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy,
    })

    return links
}

function feedByCurrentUserId(parent, args, context) {
    const { userId } = context;
    return context.prisma.user.findUnique({ where: { id: userId } }).links()
}

module.exports = {
    feed,
    feedByCurrentUserId
}