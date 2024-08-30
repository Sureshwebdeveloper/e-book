import { useContext } from "react";
import { useState } from "react";
import { StoreContext } from "../context/DataContext";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateBook = () => {
  const [input, setInput] = useState({
    authorName: "",
    category: "",
    bookDescription: "",
    bookTitle: "",
    price: "",
    trending: "",
  });

  const { data, update, url, fetchData,setLoading,loading } = useContext(StoreContext);


  const hanldeChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      input.authorName == "" &&
      input.category == "" &&
      input.bookDescription == "" &&
      input.bookTitle == "" &&
      input.price == "" &&
      input.trending == ""
    ) {
      toast.error("Please Write Some Data To Update Book");
    } else {
      const formData = new FormData();
      {
        input.authorName && formData.append("authorName", input.authorName);
      }
      {
        input.category && formData.append("category", input.category);
      }
      {
        input.bookDescription &&
          formData.append("bookDescription", input.bookDescription);
      }
      {
        input.bookTitle && formData.append("bookTitle", input.bookTitle);
      }
      {
        input.price && formData.append("price", Number(input.price));
      }
      {
        input.trending && formData.append("trending", input.trending);
      }


      setLoading(true);

      const response = await axios.post(
        `${url}/update-book/${update}`,
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setLoading(false)
        setInput({
          authorName: "",
          category: "",
          bookDescription: "",
          bookTitle: "",
          price: "",
          trending: "",
        });
        fetchData();
      } else {
        setLoading(false)
        toast.error("Error");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-1 mx-auto w-full  justify-center md:justify-around pt-20">
        <div className="md:divide-x-2 md:divide-black h-screen md:flex md:flex-1">
          <div className="flex justify-center md:flex-[0.5] w-full mx-auto">
            <div className="hidden md:block">
              <h1 className="text-center pt-5 text-xl font-serif font-bold">
                Old Book data
              </h1>
              {data.map((book, index) => {
                return (
                  <div className="pt-8" key={(book && book._id) || index}>
                    {book._id === update && (
                      <div className="flex items-center flex-col">
                        <h1 className="text-xl font-semibold text-center">
                          {book.bookTitle}
                        </h1>
                        <div>
                          <div className="max-w-[200px] ">
                            <img
                              src={`${url}/images/${book.image}`}
                              className=""
                            />
                          </div>
                        </div>
                        <div className="flex lg:text-xl space-y-3 flex-col w-full items-center justify-center">
                          <p>
                            Author Name : <b>{book.authorName}</b>
                          </p>
                          <p className="max-w-[300px] lg:max-w-[500px] overflow-ellipsis">
                            Description : <b>{book.bookDescription}</b>
                          </p>
                          <p>
                            Price : <b>{book.price}</b>
                          </p>
                          <p>
                            Category : <b>{book.category}</b>
                          </p>
                          <p>
                            Trending :{" "}
                            <b>{book.trending === true ? "true" : "false"}</b>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center  md:flex-[0.5] w-full mx-auto">
            <h1 className="text-center pt-7 md:pb-[20px]  text-xl font-serif font-bold w-full">
              Update Book data
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="pt-10 md:pb-10 md:pl-7">
                <div className="flex flex-col ">
                  <div className="flex flex-col">
                    <label htmlFor="title" className="form-label-update-book">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Book Name"
                      id="bookTitle"
                      name="bookTitle"
                      className="update-book-input"
                      value={input.bookTitle}
                      onChange={hanldeChange}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="author" className="form-label-update-book">
                      Author
                    </label>
                    <input
                      type="text"
                      placeholder="Author Name"
                      id="authorName"
                      name="authorName"
                      className="update-book-input"
                      value={input.authorName}
                      onChange={hanldeChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col my-3">
                  <div className="flex flex-col ">
                    <label htmlFor="catgory" className="form-label-update-book">
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      className="update-book-input"
                      value={input.category}
                      onChange={hanldeChange}
                    >
                      <>
                        <option value="selectCategory">Select Category</option>
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
                        <option value="Professional Development">
                          Professional Development
                        </option>
                        <option value="Art and Design">Art and Design</option>
                      </>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="descrption"
                      className="form-label-update-book"
                    >
                      Description
                    </label>
                    <textarea
                      className="update-book-input"
                      name="bookDescription"
                      id="bookDescription"
                      placeholder="Book Description"
                      onChange={hanldeChange}
                      value={input.bookDescription}
                    ></textarea>
                  </div>
                </div>

                <div className="flex flex-col w-full justify-center lg:flex-row ">
                  <div className="flex flex-col  lg:w-[45%]">
                    <label htmlFor="price" className="form-label-update-book">
                      Enter Book Price
                    </label>
                    <input
                      type="number"
                      value={input.price}
                      name="price"
                      id="price"
                      placeholder="Rs 100"
                      className="update-book-input"
                      onChange={hanldeChange}
                    />
                  </div>
                  <div className="flex flex-col lg:w-[45%]">
                    <label
                      htmlFor="trending"
                      className="form-label-update-book"
                    >
                      Trending Book
                    </label>
                    <select
                      name="trending"
                      className="ml-4 w-full border rounded pl-4 border-[#ff2a00] outline-none py-2"
                      id="trending"
                      onChange={hanldeChange}
                      value={input.trending}
                    >
                      <option value="">Select Status</option>
                      <option value={false}>Not Trending</option>
                      <option value={true}>Trending</option>
                    </select>
                  </div>
                </div>

                <div className="md:px-8 text-center w-full justify-center mt-3  mx-auto flex">
                  <button className="font-bold my-5 w-[90%] text-white py-2 rounded-lg bg-[#00b44b] cursor-pointer">
 {loading ? "Loading..." : "Update Book"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
