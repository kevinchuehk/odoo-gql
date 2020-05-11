const GraphQLJSON = require("graphql-type-json")
const { GraphQLScalarType } = require("graphql")

const removeEmpty = array => array.filter(el => el)
const criteria2Array = criteria => {
    let { field, operator, value } = criteria
    return [field, operator, value]
}

const getSearchInput = input => {
    let { criterias, offset, limit } = input
    return removeEmpty([
        criterias.map(criteria2Array),
        offset,
        limit
    ])
}

const getCountInput = input => {
    let { criterias } = input
    return [criterias.map(criteria2Array)]
}

const getSearchReadInput = input => {
    let { criterias, fields, offset, limit } = input
    return removeEmpty([
        criterias.map(criteria2Array),
        fields,
        offset,
        limit
    ])
}

const getReadInput = input => {
    let { ids, fields } = input
    return removeEmpty([ids, fields])
}

module.exports = {
    JSON: GraphQLJSON,
    Any: new GraphQLScalarType({
        name: "Any",
        description: "Literally anything",
        serialize(value) {
            return value
        },
        parseValue(value) {
            return value
        },
        parseLiteral(ast) {
            return ast.value
        }
    }),
    Query: {
        async searchRead(_, { input }, context) {
            let { model } = input
            let params = getSearchReadInput(input)
            return await context.odoo.searchRead(model, params)
        },

        async read(_, { input }, context) {
            let { model } = input
            let params = getReadInput(input)
            return await context.odoo.read(model, params)
        },

        async count(_, { input }, context) {
            let { model } = input
            let params = getCountInput(input)
            return await context.odoo.count(model, params)
        },

        async search(_, { input }, context) {
            let { model } = input
            let params = getSearchInput(input)
            return await context.odoo.search(model, params)
        }
    },

    Mutation: {
        async create(_, { input }, context) {
            let { model, data } = input
            return await context.odoo.create(model, [data])
        },

        async update(_, { input }, context) {
            let { model, ids, data } = input
            return await context.odoo.update(model, [ids, data])
        },

        async delete(_, { input }, context) {
            let { model, ids } = input
            return await context.odoo.delete(model, [ids])
        }
    }
}