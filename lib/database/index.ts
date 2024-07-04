import mongoose from 'mongoose'

const MONGODB_URI = "mongodb+srv://akankshrakesh:Akanksh01@eventopia.3wpbhav.mongodb.net/?retryWrites=true&w=majority&appName=Eventopia"
let cached = (global as any).mongoose || {conn : null, promise : null};

export const connectToDatabase = async () => {
    if(cached.conn) return cached.conn;

    if(!MONGODB_URI) throw new Error('MongoDB URI is missing');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName : 'Eventopia',
        bufferCommands: false,
    })
    cached.conn = await cached.promise;

    return cached.conn;
}