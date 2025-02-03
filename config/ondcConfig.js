module.exports = {
    PROTOCOL_VERSIONS: {
      CORE_VERSION: '0.9.1',
      TRANSACTION_VERSION: '1.1.0'
    },
    
    DOMAINS: {
      RETAIL: 'nic2004:52110',
      LOGISTICS: 'nic2004:60212'
    },
  
    SIGNATURE_ALGORITHMS: {
      PRIMARY: 'ed25519',
      DIGEST_METHOD: 'BLAKE-512'
    },
  
    AUTHORIZATION: {
      SIGNATURE_HEADERS: [
        '(created)',
        '(expires)',
        'digest'
      ],
      SIGNATURE_VALIDITY_PERIOD: 3600 // 1 hour in seconds
    }
  };