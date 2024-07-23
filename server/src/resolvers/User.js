function links(parent, args, context) {
    const { id } = parent
    return context.prisma.user.findUnique({ where: { id } }).links()
}

module.exports = {
    links
}