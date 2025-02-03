const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
  subscriberId: { 
    type: String, 
    required: true 
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verifiedAt: Date,
  validationDetails: {
    type: mongoose.Schema.Types.Mixed
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Verification', VerificationSchema);
