import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI_STANDARD ||
      process.env.MONGO_URI ||
      process.env.MONGO_URI_ATLAS;

    if (!mongoUri) {
      throw new Error('No MongoDB URI found. Set MONGO_URI (or MONGO_URI_STANDARD).');
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
