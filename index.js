// Built in Packages
const path = require('path');

// Node_modules imports
const knex = require('knex');
const express = require('express');
const bodyParser = require('body-parser');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Local consts
const dbConfig = require('./knexfile');
const config = require('./config');

const db = knex(dbConfig[config.env]);
const app = express();
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

app.use(
	'/graphql',
	bodyParser.json(),
	graphqlExpress({
		schema,
		context: {
			db,
			secret: config.secret,
			refreshing_secret: config.refreshing_secret,
		},
	})
);

app.use(
	'/graphiql',
	graphiqlExpress({
		endpointURL: '/graphql',
	})
);

app.listen(config.PORT, () => {
	console.log(`\n	- Running on http://127.0.0.1:${config.PORT} \n`);
	console.log(`	- GraphiQL on http://127.0.0.1:${config.PORT}/graphiql \n`);
});
