const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category name must be unique"],
      trim: true,
      minlength: [3, "Category name must be at least 3 characters long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      default: 0,
    },
    colors: [String],
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    priceAfterDiscount: {
      type: Number,
      required: [true, "Price after discount is required"],
    },
    imageCover: {
      type: String,
    },
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Category  is required"],
      ref: "category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "SubCategory  is required"],
      ref: "subCategory",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Brand  is required"],
      ref: "brands",
    },
    averageRating: {
      type: Number,
      min: [1.0, "Rating must be above 1.0"],
      max: [5.0, "Rating must be below 5.0"],
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      required: [true, "Sold count is required"],
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);

Schema.virtual("reviews", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});

Schema.pre("findOne", function () {
  this.populate("category","name -_id");
  this.populate("subCategory","name -_id");
  this.populate("brand","name -_id");
  this.populate("reviews", "user -_id");
});

Schema.pre("find", function () {
  this.populate("category","name -_id");
  this.populate("subCategory","name -_id");
  this.populate("brand","name -_id");
});
 // دي عشان لو مش هنزلها علي كللاد نيري 
 
Schema.post('init', (doc)=>{
  if(doc.imageCover&&doc.images){
        doc.imageCover = 'http://localhost:3000/product/'+doc.imageCover
    let img =[];
    doc.images.forEach((element) => {
        img.push('http://localhost:3000/product/'+element)
        doc.images=img
    })
  }

})

module.exports = mongoose.model("product", Schema);
