//FILENAME : db.js
const mongoose = require("mongoose");

//Test Again
mongoose.set('strictQuery', false);
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect('mongodb+srv://jewelgold:m8itgold@cluster0.tfhve47.mongodb.net/M8IT_JEWEL_GOLD', {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;