const axios = require('axios');
require('dotenv').config({ path: '../.env' });

async function testInit() {
  const payload = {
    context: {
      domain: process.env.ONDC_DOMAIN || "ONDC:RET10",
      country: process.env.ONDC_COUNTRY || "IND",
      city: process.env.ONDC_CITY || "std:080",
      action: "init",
      core_version: "1.1.0",
      bap_id: "buyer-app.ondc.org",
      transaction_id: "T" + Date.now(),
      message_id: "M" + Date.now(),
      timestamp: new Date().toISOString()
    },
    message: {
      order: {
        items: [{
          id: "1",
          quantity: {
            count: 1
          }
        }],
        billing: {
          name: "Test User",
          phone: process.env.DEFAULT_PHONE,
          email: "test@example.com",
          address: {
            door: "123",
            building: process.env.DEFAULT_ADDRESS,
            city: process.env.DEFAULT_CITY,
            state: process.env.DEFAULT_STATE,
            country: "India",
            area_code: "560001"
          }
        }
      }
    }
  };

  try {
    const response = await axios.post('http://localhost:3000/api/v1/init', payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testInit();