const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lucas:iUgQI6ekkeKTUWts@cluster0-hcdpy.mongodb.net/konecta2', { useNewUrlParser: true,  useUnifiedTopology: true },(err)=>{
    if(!err){console.log('MongoDB connection succed...');}
    else{console.log('Error in DB connection' + err);}
});