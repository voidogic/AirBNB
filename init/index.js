const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    const transformedData = initData.data.map((listing) => ({
        ...listing,
        image: listing.image.url, // Extract the `url` property as a string
    }));

    await Listing.deleteMany({});
    await Listing.insertMany(transformedData);
    console.log("Data was initialized");
};

initDB();