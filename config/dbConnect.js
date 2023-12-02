
const mongoose=require('mongoose')

const keys=require('./keys')
const dbConnect = () => {
    try {
      const conn = mongoose.connect(process.env.MONGODB_URL);
      console.log("Database Connected Successfully");
    } catch (error) {
      console.log("DAtabase error");
    }
  };
  module.exports=dbConnect;