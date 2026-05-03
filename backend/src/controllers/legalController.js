import Legal from '../models/Legal.js';

// Get legal data
export const getLegalData = async (req, res) => {
  try {
    let legal = await Legal.findOne();
    if (!legal) {
      legal = await Legal.create({});
    }
    res.status(200).json({ success: true, data: legal });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};

// Update legal data
export const updateLegalData = async (req, res) => {
  try {
    const { privacyPolicy, termsOfService, refundPolicy, cancellationPolicy } = req.body;
    let legal = await Legal.findOne();
    
    if (!legal) {
      legal = new Legal();
    }

    if (privacyPolicy !== undefined) legal.privacyPolicy = privacyPolicy;
    if (termsOfService !== undefined) legal.termsOfService = termsOfService;
    if (refundPolicy !== undefined) legal.refundPolicy = refundPolicy;
    if (cancellationPolicy !== undefined) legal.cancellationPolicy = cancellationPolicy;

    await legal.save();
    res.status(200).json({ success: true, data: legal });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};
