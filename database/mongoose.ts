import mongose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

declare global {

  var mongooseCache:{

      conn: typeof mongose | null
      promise: Promise<typeof mongose> | null
  }
}
let cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

export const connectToDatabase = async () => {
  if (cached.conn) 
    return cached.conn;

  if (!cached.promise) {
    cached.promise = mongose.connect(MONGODB_URI, { 
      bufferCommands: false });
  }
  try {
    
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Error connecting to MongoDB:', e);
    throw e;
  }

  console.info('Connected to MongoDB');
  return cached.conn;
}