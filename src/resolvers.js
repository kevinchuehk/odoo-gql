const GraphQLJSON = require("graphql-type-json")

module.exports = {
    JSON: GraphQLJSON,
    Query: {
        async searchRead(_, { input }, context) {
            let { model, params } = input
            return await context.odoo.searchRead(model, params)
        },

        async read(_, { input }, context) {
            let { model, params } = input
            return await context.odoo.read(model, params)
        },

        async count(_, { input }, context) {
            let { model, params } = input
            return await context.odoo.count(model, params)
        },

        async search(_, { input }, context) {
            let { model, params } = input
            return await context.odoo.search(model, params)
        }
    },

    Mutation: {
        async create(_, { input }, context) {
            let { model, params } = input
            return await context.odoo.create(model, params)
        },

        async update(_, { input }, context) {
            let { model, params } = input
            return await context.odoo.update(model, params)
        },

        async delete(_, { input }, context) {
            let { model, params } = input
            return await context.odoo.delete(model, params)
        }
    }
}