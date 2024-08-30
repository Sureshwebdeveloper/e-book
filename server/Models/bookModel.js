import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  authorName: {
    type: "String",
    required: [true, "Author Name Required"],
  },
  image: {
    type: "String",
    required: [true, "Please Upload Image"],
  },
  category: {
    type: "String",
    required: [true, "Please Add Category"],
  },
  bookDescription: {
    type: "String",
    required: [true, "Please Add Description"],
  },
  trending: {
    type: Boolean,
    default: false,
  },
  bookTitle: {
    type: "String",
    required: [true, "Book Title Required"],
  },
  price: {
    type: "Number",
    required: [true, "Price Required"],
  },
  pdf: {
    type: "String",
    required: [false],
  },
});

const bookModel = mongoose.model.books || mongoose.model("book", bookSchema);

export default bookModel;
