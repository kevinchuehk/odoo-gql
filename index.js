const { ApolloServer } = require("apollo-server")
const { importSchema } = require("graphql-import")
const typeDefs = importSchema("schema.graphql")
const resolvers = require('./src/resolvers.js')
const Odoo = require('odoo-xmlrpc')

const client = new Odoo({
    url: process.env.ODOO_URL,
    port: process.env.ODOO_PORT,
    db: process.env.ODOO_DB,
    username: process.env.ODOO_USER,
    password: process.env.ODOO_PASSW
})

client.search = function(model, params) {
    return new Promise((resolve, reject) => {
        this.execute_kw(model, 'search', params, (err, value) => {
            if (err) return reject(err)
            resolve(value)
        })
    })
}

client.count = function(model, params) {
    return new Promise((resolve, reject) => {
        this.execute_kw(model, 'search_count', params, (err, value) => {
            if (err) return reject(err)
            resolve(value)
        })
    })
}

client.read = function(model, params) {
    return new Promise((resolve, reject) => {
        this.execute_kw(model, 'read', params, (err, value) => {
            if (err) return reject(err)
            resolve(value)
        })
    })
}

client.searchRead = function(model, params) {
    return new Promise((resolve, reject) => {
        this.execute_kw(model, 'search_read', params, (err, value) => {
            if (err) return reject(err)
            resolve(value)
        })
    })
}

client.create = function(model, params) {
    return new Promise((resolve, reject) => {
        this.execute_kw(model, 'create', params, (err, value) => {
            if (err) return reject(err)
            resolve(value)
        })
    })
}

client.update = function(model, params) {
    return new Promise((resolve, reject) => {
        this.execute_kw(model, 'write', params, (err, value) => {
            if (err) return reject(err)
            resolve(value)
        })
    })
}

client.delete = function(model, params) {
    return new Promise((resolve, reject) => {
        this.execute_kw(model, 'unlink', params, (err, value) => {
            if (err) return reject(err)
            resolve(value)
        })
    })
}

client.connect((err) => {
    if (err) return console.log(err)
    console.log('Connected to Odoo server.')
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ odoo: client })
    })

    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`)
    })
})