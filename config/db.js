const mongoose = require('mongoose');

const connectDatabase = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser : true,
        useUnifiedTopology: true
    });
    console.log('MongoDB Atlas server connected', connection.connection.host);
}
module.exports = connectDatabase;