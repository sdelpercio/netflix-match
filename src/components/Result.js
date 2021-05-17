import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Result = ({ userMovies, rapidApiKey }) => {
  const [products, setProducts] = useState([]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  // Retrieving Matched Movie Details
  useEffect(() => {
    if (userMovies.length !== 0) {
      const promises = userMovies.map((id) => {
        return axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${rapidApiKey}&language=en-US`
        );
      });
      Promise.all(promises)
        .then((res) => setProducts(res))
        .catch((err) => console.log(err));
    }
  }, [rapidApiKey, userMovies]);

  if (userMovies.length === 1) {
    return (
      <div className="m-auto mt-20 w-80 md:w-1/2">
        <h1>No matches :(</h1>
      </div>
    );
  } else {
    return (
      <div className="m-auto mt-10 w-full">
        <h1>Here are your matches!</h1>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {products.map((item) => (
            <div
              className="flex flex-col w-full px-4 py-4 text-center"
              key={item.data.id}
            >
              <h1>{item.data.title}</h1>
              <img
                src={`https://image.tmdb.org/t/p/w200/${item.data.poster_path}`}
                alt="movie poster"
                draggable="false"
              />
              <p>{item.data.overview}</p>
              <div>
                <p>Released: {item.data.release_date}</p>
                <p>Language: {item.data.original_language}</p>
                <p>Rating: {item.data.vote_average}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
};

export default Result;
