const mongoose = require('mongoose');

const mongooseConnect = () => {
  mongoose.connect('mongodb+srv://EcofitBot:Honorandpower2020@ecofitcluster.hljk8.mongodb.net/ECOFIT', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('MongoDB CONNECTED'))
    .catch((err) => console.log('ERROR CONNECTED: ', err))
}

module.exports = { mongooseConnect }