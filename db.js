const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://saurabhmaurya1309:yEGDXhgdW9JCgDu8@cluster0.fhcniuy.mongodb.net/gofoodmern"
// const mongoURI = "mongodb+srv://saurabh:SahH26uM1iVZ5Ar1@cluster0.fhcniuy.mongodb.net/gofoodmern"



const mongoDb = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`DB Connection Success`);
        const fetch_data = await mongoose.connection.db.collection("food_items");
        const fetch_category = await mongoose.connection.db.collection("foodCategory");
       global.food_items = await fetch_data.find({}).toArray();
       global.food_category = await fetch_category.find({}).toArray();

       
        // console.log("data is printing", data);
    } catch (err) {
        console.log(`DB Connection Failed`);
        console.error(err);
        process.exit(1);
    }
};

module.exports = mongoDb;
