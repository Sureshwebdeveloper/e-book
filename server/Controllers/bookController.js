import bookModel from "../Models/bookModel.js";
import fs from "fs";
import { ErrorHandler } from "../utils/error.js";

const uplodBook = async (req, res, next) => {
  try {
    const {
      authorName,
      category,
      bookDescription,
      bookTitle,
      price,
      img,
      pdf,
    } = req.body;
    const image_filename = req.files.image[0].filename;
    const pdf_filename = req.files.pdf[0].filename ;

    const result = await new bookModel({
      authorName,
      image: image_filename,
      category,
      bookDescription,
      bookTitle,
      price,
      pdf: pdf_filename,
    });

    await result.save();
    // console.log(authorName,image,category,bookDescription,bookTitle,bookpdf);
    res
      .status(201)
      .json({ success: true, data: result, message: "Book Added" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchBooks = async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
    console.log(error);
  }
};

const singleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    if (book) {
      res.status(200).json({ success: true, data: book });
    } else {
      res.status(204).json({ success: false, message: "No Book Matched" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
    console.log(error);
  }
};

const removeBook = async (req, res, next) => {
  try {
    const book = await bookModel.findById(req.body.id);
    if (!book) {
      res.status(400).json({ success: false, message: "No Id Matached" });
    }
    fs.unlink(`uploads/${book.image}`, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      }
    });
    fs.unlink(`uploadedpdf/${book.pdf}`, (err) => {
      if (err) {
        console.error("Error deleting PDF:", err);
      }
    });

    await bookModel.findByIdAndDelete(req.body.id);
    // Delete Image From Data Base
    res.status(200).json({ success: true, message: "Book Deleted" });
  } catch (error) {
    console.log(error);
    // next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Update the book details
    const updatedBook = await bookModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatedBook) {
      res.status(204).json({ success: false, message: "Id Not Matched" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Book Updated", updatedBook });
  } catch (error) {
    next();
    console.log(error);
  }
};

export { uplodBook, fetchBooks, singleBook, removeBook, updateBook };
