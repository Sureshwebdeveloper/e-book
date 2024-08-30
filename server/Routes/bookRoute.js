import express from "express";
import {
  uplodBook,
  fetchBooks,
  removeBook,
  singleBook,
  updateBook,
} from "../Controllers/bookController.js";
import multer from "multer";

const bookRouter = express.Router();

// Image Store Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, "uploads"); // Destination for images
    } else if (file.fieldname === "pdf") {
      cb(null, "uploadedpdf"); // Destination for PDFs
    } else {
      cb(new Error("Invalid field name"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

let upload = multer({ storage });


bookRouter.post("/upload-book", upload.fields([{ name: "image" }, { name: "pdf"  }]), uplodBook);
bookRouter.get("/get-book/:id", singleBook);
bookRouter.get("/get-books", fetchBooks);
bookRouter.post("/remove-book", removeBook);
bookRouter.post("/update-book/:id", upload.fields([{name:"image"}, {name:"pdf"}]), updateBook);

export default bookRouter;
