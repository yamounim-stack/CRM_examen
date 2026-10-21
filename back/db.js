
import mongoose from "mongoose";

export async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI est manquante");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connecté");
}
