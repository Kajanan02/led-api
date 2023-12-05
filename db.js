import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://Rio:RioAstal1234@rio.kh2t4sq.mongodb.net/?retryWrites=true&w=majority")
        console.log(`MongoDB is connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error ${error}`)
        process.exit(1);
    }
}

export default connectDB;