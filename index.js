// Import necessary modules
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");

// Import GraphQL schema
const typeDefs = importSchema("./schema.graphql");

// Load environment variables
require("dotenv").config();

// Define GraphQL resolvers
const resolvers = {
  Query: {
    // Resolver for querying ether balance by address
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver for querying total supply of ether
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver for querying the latest Ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver for querying block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    // Initialize Ethereum data source
    ethDataSource: new EtherDataSource(),
  }),
});

// Set server timeout to 0 to prevent automatic shutdown
server.timeout = 0;

// Start the server on port 9000
server.listen("9000").then(({ url }) => {
  // Log server URL when it's ready
  console.log(`🚀 Server ready at ${url}`);
});
