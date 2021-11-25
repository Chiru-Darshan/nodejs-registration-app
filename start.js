require('dotenv').config();
require('./models/Registration');
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE, function(error, data) {
   if(error) {console.log(`Connection failure with error : ${error}`)}
   else{
       console.log(`Sucessfully connected !`)
   }
   
})
const app = require('./app');




const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});