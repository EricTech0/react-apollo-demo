function postedBy(parent, args, context) {
    const { id } = parent;
    return context.prisma.link.findUnique({ where: { id } }).postedBy()
}

function votes(parent, args, context) {
    return context.prisma.link.findUnique({ where: { id: parent.id } }).votes()
}

module.exports = {
    postedBy,
    votes
}