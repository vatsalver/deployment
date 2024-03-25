const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://eatIt:eatit12@cluster0.mwgt1rq.mongodb.net/eatitmern?retryWrites=true&w=majority'

const mongoDB = async () => {
  await mongoose.connect(mongoURL, { useNewUrlParser: true, ssl: true })
    .then(async() => {
      console.log('Connected Successfully');
      const fetched_data = await mongoose.connection.db.collection("food_item");
      fetched_data.find({}).toArray().then(async(data) =>{
        const foodCategory = await mongoose.connection.db.collection("food_category");
        foodCategory.find({}).toArray().then((catdata)=>{
          global.food_items = data;
          global.food_Category = catdata;
        })
          .catch((err) => { console.error(err); });
        })
      } //{
      // console.log(global.food_items)}).catch((err) => { console.error(err); });
    )
    .catch ((err) => {
  console.error(err);
});
}

module.exports = mongoDB;
