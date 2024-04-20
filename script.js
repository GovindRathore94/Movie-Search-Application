const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");

// Function to find movie details Using OMDB API

const getMovieInfo = async (movie) => {
  try {
    const myApiKey = "1d2d3802";
    const url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

    const response = await fetch(url);

    console.log(response.status);

    //to check response from network

    if (!response.ok) {
      throw new error("Unable to fetch movie data");
    }

    // console.log(response.status);

    const data = await response.json();

    showMovieData(data);
  } catch (error) {
    showErrorMessage("No Movie found !!");
  }
};

// Function to show movie data on screen

const showMovieData = (data) => {
  movieContainer.innerHTML = ""; // Clear Prevoius search data from screen

  movieContainer.classList.remove("noBackgroung");

  // Use Destructuring assignment to extract property from data Object

  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;

  // Add Div for Titel And Rating.
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-info");
  movieElement.innerHTML = `<h2>${Title}</h2> <p> <strong> Rating: &#11088; </strong>${imdbRating}</p>`;

  // Add Div for Genre.

  const movieGenreElement = document.createElement("div");
  movieGenreElement.classList.add("movie-genre");

  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerText = element;
    movieGenreElement.appendChild(p);
  });

  movieElement.appendChild(movieGenreElement);

  movieElement.innerHTML += `<p><strong>Released Date:</strong> ${Released}</p> <p><strong> Duration:</strong> ${Runtime}</p><strong>
    <p>Cast:</strong>  ${Actors}</p> <p><strong>Plot:</strong> ${Plot}</p>`;

  // Creating A div for movie Poster
  const moviePosterElement = document.createElement("div");
  moviePosterElement.classList.add("movie-poster");
  moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

  movieContainer.appendChild(moviePosterElement);

  movieContainer.appendChild(movieElement);
};

// Function to display error Message

const showErrorMessage = (message) => {
  movieContainer.innerHTML = `<h2> ${message} </h2`;
  movieContainer.classList.add("noBackgroung");
};

// Function to habndle form submission

const handleformSubmission = (e) => {
  e.preventDefault();
  // console.log(inputBox.value);

  const movieName = inputBox.value.trim();

  if (movieName !== "") {
    showErrorMessage(`<img src="./img/loading.gif" alt="" >`);

    getMovieInfo(movieName);
  } else {
    showErrorMessage("Enter movie name to get movie Information");
  }
};

// Adding Event Listener to Search Form
searchForm.addEventListener("submit", handleformSubmission);
