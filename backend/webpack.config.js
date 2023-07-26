const path = require('path');
const webpack = require('webpack');
const { GOOGLE_CLIENT_ID } = require('./config');

const environment = process.env.ENVIRONMENT;

console.log('environment:::::', environment);
require('dotenv').config({ path: `.env.${process.env.ENVIRONMENT}` })

let ENVIRONMENT_VARIABLES = {}
if (["production.local", "production.remote"].includes(environment)) {
    ENVIRONMENT_VARIABLES = {
        'process.env.ATLAS_URI': JSON.stringify(process.env.ATLAS_URI),
        'process.env.ATLAS_URI_TEST': JSON.stringify(process.env.ATLAS_URI_TEST),
        'process.env.GOOGLE_CLIENT_ID': JSON.stringify(process.env.GOOGLE_CLIENT_ID),
        'process.env.GOOGLE_CLIENT_SECRET': JSON.stringify(process.env.GOOGLE_CLIENT_SECRET),
        'process.env.COOKIE_KEY': JSON.stringify(process.env.COOKIE_KEY),
        'process.env.CLIENT_HOME_PAGE_URL': JSON.stringify(process.env.CLIENT_HOME_PAGE_URL),
        'process.env.GOOGLE_REDIRECT_URL': JSON.stringify(process.env.GOOGLE_REDIRECT_URL),
        'process.env.ENVIRONMENT': JSON.stringify(process.env.ENVIRONMENT),
    };
}

module.exports = {
    entry: './start.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'api.bundle.js',
    },
    target: 'node',
    plugins: [
        new webpack.DefinePlugin(ENVIRONMENT_VARIABLES),
    ],
};