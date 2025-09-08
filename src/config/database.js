const mongoose = require("mongoose");

const url = "mongodb+srv://shivamtej123456789:ESEjs48SxYDvV5sm@cluster0.aewhdgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const url2 = process.env.MONGODB_URL;

const connectDB = async () => {
    await mongoose.connect(url2);
}

module.exports = {connectDB};