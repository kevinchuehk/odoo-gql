const { gql } = require("apollo-server")

const typeDefs = gql`
scalar JSON
scalar Any

input Criteria {
  field: String!
  operator: String!
  value: Any!
}

input SearchInput {
  model: String!
  criterias: [Criteria]
  offset: Int
  limit: Int
}

input CountInput {
  model: String!
  criterias: [Criteria]
}

input SearchReadInput {
  model: String!
  criterias: [Criteria]
  fields: [String!]!
  offset: Int
  limit: Int
}

input ReadInput {
  model: String!
  ids: [Int!]!
  fields: [String!]
}

type Query {
  search(input: SearchInput!): JSON
  count(input: CountInput!): Int
  searchRead(input: SearchReadInput!): JSON
  read(input: ReadInput!): JSON
}

input CreateInput {
  model: String!
  data: JSON!
}

input UpdateInput {
  model: String!
  ids: [Int!]!
  data: JSON!
}

input DeleteInput {
  model: String!
  ids: [Int!]!
}

type Mutation {
  create(input: CreateInput): JSON
  update(input: UpdateInput): JSON
  delete(input: DeleteInput): JSON
}
`

module.exports = typeDefs