// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});
//   const transformedData = initData.data.map((listing) => ({
//     ...listing,
//     image: listing.image.url, // Fix image format
//     owner: new mongoose.Types.ObjectId('6808b7bfa6e5cdd47637d733') // Ensure ObjectId type
//   }))
 
//   // console.log("Transformed Data:", transformedData); // Debugging
//   await Listing.insertMany(transformedData);
//   console.log("Data was initialized");
// };
 

// // const initDB = async () => {
// //   await Listing.deleteMany({});
// //   initData.data = initData.data.map((obj) => ({ ...obj, owner: "6805c323ab38224488f75b68"}));
// //   await Listing.insertMany(initData.data);
// //   console.log("data was initialized");
// // };

// initDB();



const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js"); // Make sure this exists

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await User.deleteMany({});

  // Create a user to assign as owner
  const user = await User.create({
    username: "seeduser",
    email: "seeduser@example.com"
  });

  // Assign this user as owner
  const transformedData = initData.data.map((listing) => ({
    ...listing,
    // image: listing.image.url,
    owner: user._id
  }));

  await Listing.insertMany(transformedData);
  console.log(" Data was initialized with a valid owner");
};

initDB();
