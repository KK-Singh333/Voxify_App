const { Schema, model } = require("mongoose");
const blogSchema = new Schema(
  {
    id: {
      type:String,
    },
    Title: {
      type: String,
      required: true,
      unique: true,
    },
    Content: {
      type: String,
      required: true,
    },
    Author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Blogs = model('blog', blogSchema);
module.exports = Blogs;

