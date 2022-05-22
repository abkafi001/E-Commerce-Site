const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      seller: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "Seller",
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        data: Buffer,
        contentType: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

// const productSchema = new mongoose.Schema(

//     {
//         name: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         seller : {
//             type: mongoose.Schema.Types.ObjectID,
//             required: true,
//             ref: 'Seller'
//         },
//         description: {
//             type: String,
//             required: true
//         },
//         category: {
//             type: String
//         },
//         price: {
//             type: Number,
//             required: true
//         },
//         image: {
//             data: Buffer,
//             contentType: String
//         }
//     },
//     {
//         timestamps: true
//     }
// )

// const Product = mongoose.model('Product', productSchema);
