import BannerCard from "./BannerCard/BannerCard.jsx";
const Banner = () => {

  return (
    <div className="px-4 lg:px-24 bg-green-200 items-center pt-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 py-14">
        <div className="max-w-sm lg:max-w-[600px] md:w-1/2 space-y-8 h-full">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-popins leading-snug text-black">
            Buy Your
            <span className="text-blue-600 ml-3">Favourite </span>Books
            <span className="text-blue-600 ml-3"> Now</span>
          </h2>
          <p className="md:w-4/5 font-cabin text-xl font-medium">
            Step into our online bookstore and unlock a world of literary
            treasures! Dive into our extensive collection spanning all genres.
            Whether you crave a complimentary PDF or desire to hold a tangible
            book, we have you covered. With worldwide delivery, your next
            captivating read awaits!
          </p>
        </div>
        <div className="">
          <BannerCard />
        </div>
      </div>
    </div>
  );
};

export default Banner;
