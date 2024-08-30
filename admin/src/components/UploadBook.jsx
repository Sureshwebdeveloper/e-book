import React, { useContext, useState } from "react";
import axios from "axios";
import { FaRegImage } from "react-icons/fa6";
import { StoreContext } from "../context/DataContext";
import { toast } from "react-toastify";

const UploadBook = () => {
  const [input, setInput] = useState({
    authorName: "",
    category: "fiction",
    bookDescription: "",
    bookTitle: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(false);
  const [pdf, setPdf] = useState(false);
  const { url } = useContext(StoreContext);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("authorName", input.authorName);
    formData.append("category", input.category);
    formData.append("bookDescription", input.bookDescription);
    formData.append("bookTitle", input.bookTitle);
    formData.append("price", Number(input.price));
    formData.append("image", image);
    formData.append("pdf", pdf);

    const response = await axios.post(`${url}/upload-book`, formData);
    if (response.data.success) {
      setLoading(false);
      toast.success(response.data.message);
      setInput({
        authorName: "",
        category: "fiction",
        bookDescription: "",
        bookTitle: "",
        price: "",
      });
      setImage(false);
      setPdf(false);
    } else {
      setLoading(false);
      toast.error("Error");
    }
  };

  const hanldeChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center mx-auto h-screen py-28 bg-[#f2f2f2]">
          <div className=" size-[70px] rounded-full place-self-center border-[4px] border-[#000000] border-t-[#a9a9a9] duration-[1] animate-spin"></div>
        </div>
      ) : (
        <div className="w-full min-h-screen pt-14 text-base lg:z-20 ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full"
          >
            <h1 className="lg:ml-10 lg:my-4 py-3 font-bold font-sans text-3xl">
              UploadBook
            </h1>
            <div>
              <div className="">
                <p className="form-label">Upload Book Image</p>
                <label htmlFor="image">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      srcset=""
                      className="size-[125px] "
                    />
                  ) : (
                    <FaRegImage className="text-6xl cursor-pointer" />
                  )}
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  id="image"
                  className="hidden"
                  required
                  accept=".jpg, .png, .jpeg, .tiff|image/*"
                />
              </div>

              <div className="flex flex-col ">
                <div className="flex flex-col">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    placeholder="Book Name"
                    id="bookTitle"
                    name="bookTitle"
                    className="input"
                    value={input.bookTitle}
                    onChange={hanldeChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    placeholder="Author Name"
                    id="authorName"
                    name="authorName"
                    required
                    className="input"
                    value={input.authorName}
                    onChange={hanldeChange}
                  />
                </div>
              </div>

              <div className="flex flex-col my-3">
                <div className="flex flex-col ">
                  <label htmlFor="catgory">Category</label>
                  <select
                    name="category"
                    id="category"
                    className="input "
                    required
                    value={input.category}
                    onChange={hanldeChange}
                  >
                    <>
                      <option value="selectCategory" defaultValue>
                        Select Category
                      </option>
                      <option value="Fiction">Fiction</option>
                      <option value="Non-Fiction">Non-Fiction</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Programming">Programming</option>
                      <option value="Science Fiction">Science Fiction</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Horror">Horror</option>
                      <option value="Biography">Biography</option>
                      <option value="AutoBiography">AutoBiography</option>
                      <option value="History">History</option>
                      <option value="Self-help">Self-help</option>
                      <option value="Business">Business</option>
                      <option value="Memoir">Memoir</option>
                      <option value="Poetry">Poetry</option>
                      <option value="Children's Book">Children's Book</option>
                      <option value="Travel">Travel</option>
                      <option value="Religion and spirituality">
                        Religion and spirituality
                      </option>
                      <option value="Science">Science</option>
                      <option value="Professional Development">Professional Development</option>
                      <option value="Art and Design">Art and Design</option>
                    </>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="descrption">Description</label>
                  <textarea
                    className="input"
                    name="bookDescription"
                    id="bookDescription"
                    required
                    placeholder="Book Description"
                    onChange={hanldeChange}
                    value={input.bookDescription}
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-col w-full lg:flex-row ">
                <div className="flex flex-col  lg:w-[36%]">
                  <label htmlFor="price" className="form-label">
                    Enter Book Price
                  </label>
                  <input
                    type="number"
                    value={input.price}
                    name="price"
                    id="price"
                    required
                    className="input"
                    onChange={hanldeChange}
                  />
                </div>

                <div
                  className="w-full flex flex-col 
              lg:w-[60%]"
                >
                  <label htmlFor="pdf">Upload Your pdf</label>
                  <input
                    type="file"
                    className="input"
                    name="pdf"
                    id="pdf"
                    accept=".pdf"
                    required={true}
                    onChange={(e) => setPdf(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="text-center w-full  mx-auto flex ">
                <button className="font-bold my-5 w-[90%] text-white py-2 rounded-lg bg-[#00b44b] cursor-pointer">
                  Add Book
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UploadBook;
