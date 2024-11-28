import React, { useEffect, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Spinner from "../components/Spinner";
import { AppContext } from "../store/StoreContext";
import { useNavigate } from "react-router-dom";

const CoursesCarousel = () => {
  const navigate = useNavigate()
  const swiperRef = useRef(null);
  const { fetchAllCourses, courses, loading, error } = useContext(AppContext);

  // Fetch courses when component mounts
  useEffect(() => {
    if (courses.length === 0) {
      fetchAllCourses();
    }
  }, [courses, fetchAllCourses]);

  // Split the courses into two parts
  const firstHalf = courses.slice(0, Math.ceil(courses.length / 2));
  const secondHalf = courses.slice(Math.ceil(courses.length / 2));

  const handleSelectedCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };
  return (
    <div className="p-6 font-inter bg-gray-50 rounded-md min-h-screen flex flex-col items-center">
      <h1 className=" text-lg md:text:3xl lg:text-5xl font-bold text-main mb-4">Explore Our Courses</h1>
      <p className="text-gray-600 mb-8 text-center max-w-3xl">
        Find the course that suits your interests and skills!
      </p>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Spinner />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">Error: {error}</p>
      ) : (
        <>
          {/* First Row with First Half of Courses */}
          <div className="relative w-full max-w-7xl mb-10">
            <Swiper
              ref={swiperRef}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={2000}
              modules={[Autoplay]}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1440: { slidesPerView: 4 },
              }}
            >
              {firstHalf.length > 0 ? (
                firstHalf.map((course, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl p-6 max-w-md w-full">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <img
                          src={course.courseThumbnail}
                          alt={course.courseName}
                          className="w-48 h-48 object-cover rounded-md shadow-md transition-transform transform hover:scale-105"
                        />
                        <p className="text-lg font-semibold text-black mt-4 text-center">{course.courseName}</p>
                        <p className="text-gray-600 text-center mt-2">{course.description}</p>
                        <button style={gradientStyle} onClick={()=> handleSelectedCourse(course.id)} className=" px-6 py-2  rounded-md hover:bg-main-dark transition">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <div className="text-center text-gray-600">No courses available.</div>
              )}
            </Swiper>
          </div>

          {/* Second Row with Second Half of Courses */}
          <div className="relative w-full max-w-7xl mb-10">
            <Swiper
              ref={swiperRef}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={2000}
              modules={[Autoplay]}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1440: { slidesPerView: 4 },
              }}
            >
              {secondHalf.length > 0 ? (
                secondHalf.map((course, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl p-6 max-w-md w-full">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <img
                          src={course.courseThumbnail}
                          alt={course.courseName}
                          className="w-48 h-48 object-cover rounded-md shadow-md transition-transform transform hover:scale-105"
                        />
                        <p className="text-xl font-semibold text-main mt-4 text-center">{course.courseName}</p>
                        <p className="text-gray-600 text-center mt-2">{course.description}</p>
                        <button style={gradientStyle} onClick={()=> handleSelectedCourse(course.id)} className=" px-6 py-2  rounded-md hover:bg-main-dark transition">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <div className="text-center text-gray-600">No courses available.</div>
              )}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesCarousel;
