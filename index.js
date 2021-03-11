const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Product {
    name: String!
    description: String
  }

  type Query {
    allProducts: [Product!]
    searchProduct(name: String!, description: String): [Product!]
  }
`;

const products = [
  {
    name: "Coca Cola 600ml",
    description: "Refresco de Cola"
  },
  {
    name: "Galletas Marías",
    description: "Galletas de masa"
  }
];

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    allProducts(query, params, context) {
      return products;
    },
    searchProduct(query, params, context) {
      const name = params.name;
      const description = params.description || "";
      return products.filter((product) => {
        return (
          product.name.search(new RegExp(name.replace(/\s+/g, "|"), "i")) >= 0
        );
      });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
