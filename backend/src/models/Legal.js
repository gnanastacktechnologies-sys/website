import mongoose from 'mongoose';

const legalSchema = new mongoose.Schema(
  {
    privacyPolicy: { type: String, default: '' },
    termsOfService: { type: String, default: '' },
    refundPolicy: { type: String, default: '' },
    cancellationPolicy: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const Legal = mongoose.model('Legal', legalSchema);

export default Legal;
