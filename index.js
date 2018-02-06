// Built in Packages
const path = require('path');

// Node_modules imports
const knex = require('knex');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Local imports
const dbConfig = require('./knexfile');
const config = require('./config');
const { addUser } = require('./util/add_user');

const db = knex(dbConfig[config.env]);
const app = express();
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

app.use(cors('*'));
app.use(addUser);

app.use(
	'/graphql',
	bodyParser.json(),
	graphqlExpress(req => ({
		schema,
		context: {
			db,
			secret: config.secret,
			refreshSecret: config.refreshSecret,
			user: req.user,
		},
	}))
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
