require('dotenv').config();

module.exports = {
  SUBSCRIBER_ID: process.env.ONDC_SUBSCRIBER_ID,
  UNIQUE_KEY_ID: process.env.ONDC_UNIQUE_KEY_ID,
  PRIVATE_KEY: process.env.ONDC_PRIVATE_KEY,
  PUBLIC_KEY: process.env.ONDC_PUBLIC_KEY,
  
  environments: {
    development: {
      registryUrl: 'https://staging.registry.ondc.org/lookup',
      gatewayUrl: 'https://staging.gateway.ondc.org'
    },
    production: {
      registryUrl: 'https://registry.ondc.org/lookup',
      gatewayUrl: 'https://gateway.ondc.org'
    }
  },

  getConfig: function() {
    const env = process.env.NODE_ENV || 'development';
    return this.environments[env];
  }
};