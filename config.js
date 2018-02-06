module.exports = {
	PORT: 3000,
	env: process.env.NODE_ENV || 'development',
	secret: process.env.JWT_SECRET || '7DSb8CkPKkO7kswqFfCPvadEomwptkw1dxjw11C97E2oOymA463owqhqB0caAkM',
	refreshSecret: process.env.JWT_REFRESHING_SECRET || 'MmZMcKbeYqw1MSLl95VDXJkPOXfeXyNAeXuoH9SuO46YvwBTvIsAQpTZ4DqANfBy',
};
