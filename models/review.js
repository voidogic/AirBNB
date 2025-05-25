const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    cretedAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

// Add a pre-save middleware to validate the review
reviewSchema.pre('save', function(next) {
    console.log("Saving review:", this);
    next();
});

module.exports = mongoose.model("Review", reviewSchema);
