const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB Conectada');
    } catch (e) {
        console.log(e);
        throw new Error('Error a la hora de inicializar BD');
    }
}

module.exports = {
    dbConnection
}