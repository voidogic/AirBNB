require("dotenv").config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mapToken = process.env.MAP_TOKEN;

const mongoUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoUrl);
}

async function geocodeLocation(location) {
  try {
    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${mapToken}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data && data.features && data.features.length > 0) {
        return data.features[0].geometry;
      }
    }
  } catch (err) {
    console.error("MapTiler Geocoding failed:", err);
  }
  return null;
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    const updatedData = await Promise.all(
      initData.data.map(async (obj) => {
        const geometry = await geocodeLocation(`${obj.location}, ${obj.country}`);
        return {
          ...obj,
          owner: "66567b03fda820235197b582",
          geometry: geometry || { type: "Point", coordinates: [77.209, 28.6139] },
        };
      })
    );

    await Listing.insertMany(updatedData);
    console.log("DB is initialized");
  } catch (error) {
    console.error("Error initializing DB:", error);
  }
};

initDB();