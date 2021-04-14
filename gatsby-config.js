require("dotenv").config();
module.exports = {
	siteMetadata: {
		title: "groundHogDay",
	},

	plugins: [
		{
			resolve: "gatsby-source-shopify",
			options: {
				apiKey: process.env.SHOPIFY_ADMIN_API_KEY,
				password: process.env.SHOPIFY_ADMIN_PASSWORD,
				storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
			},
		},
		"gatsby-plugin-gatsby-cloud",
		"gatsby-plugin-image",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: "./src/images/",
			},
			__key: "images",
		},
	],
};
