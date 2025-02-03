const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
  subscriberId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  uniqueKeyId: { 
    type: String, 
    required: true 
  },
  publicKey: { 
    type: String, 
    required: true 
  },
  domain: { 
    type: String, 
    required: true 
  },
  city: [String],
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);
