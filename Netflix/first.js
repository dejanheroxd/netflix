"use strict";

window.onload = () => {
  getOriginals();
  getTrendingNow();
  getTopRated();
};

function fetchMovies(url, dom_element, path_of) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("somtheing went wrong");
      }
    })
    .then((data) => {
      showMovies(data, dom_element, path_of);
    })
    .catch((error) => {
      console.log(error);
    });
}

const showMovies = (movies, dom_element, path_of) => {
  let element = document.querySelector(dom_element);

  for (let movie of movies.results) {
    let imgElement = document.createElement("img");
    imgElement.setAttribute("data-id", movie.id);
    imgElement.src = `https://image.tmdb.org/t/p/original${movie[path_of]}`;
    element.appendChild(imgElement);
  }
};

// ** Function that fetches Netflix Originals **
function getOriginals() {
  let url =
    "https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213";
  fetchMovies(url, ".original__movies", "poster_path");
}
// ** Function that fetches Trending Movies **
function getTrendingNow() {
  let url =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045";
  fetchMovies(url, "#trending", "backdrop_path");
}
// ** Function that fetches Top Rated Movies **
function getTopRated() {
  let url =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1";
  fetchMovies(url, "#top_rated", "backdrop_path");
}
