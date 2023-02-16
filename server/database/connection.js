require('dotenv').config();
const mongoose = require('mongoose');
const mongoUrl = `${process.env.MONGO_DB_URL}/usersDB`;

const connectDB = async () => {
    try {
        // mongodb connection string
        mongoose.set("strictQuery", false);
        const con = await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB