document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(data => {
          const films = data;
          displayFilmTitles(films);
          displayFilmDetails(films[0]);
      });

  function displayFilmTitles(films) {
      const movieTitles = document.getElementById('movieTitles');
      films.forEach(film => {
          const li = document.createElement('li');
          li.textContent = film.title;
          li.addEventListener('click', () => displayFilmDetails(film));
          movieTitles.appendChild(li);
      });
  }

  function displayFilmDetails(film) {
      const movieDetails = document.getElementById('movieDetails');
      movieDetails.innerHTML = `
          <h2>${film.title}</h2>
          <img src="${film.poster}" alt="${film.title} poster" class="movie-poster">
          <p><strong>Runtime:</strong> ${film.runtime} minutes</p>
          <p><strong>Capacity:</strong> ${film.capacity}</p>
          <p><strong>Showtime:</strong> ${film.showtime}</p>
          <p><strong>Tickets Sold:</strong> ${film.tickets_sold}</p>
          <p><strong>Description:</strong> ${film.description}</p>
          <button id="purchaseTicket">Purchase Ticket</button>
      `;

      const purchaseButton = document.getElementById('purchaseTicket');
      purchaseButton.addEventListener('click', (event) => {
          event.preventDefault();
          purchaseTicket(film)});
  }

  function purchaseTicket(film) {
      if (film.tickets_sold < film.capacity) {
          fetch(`http://localhost:3000/films/${film.id}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  tickets_sold: film.tickets_sold + 1
              })
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(updatedFilm => {
              film.tickets_sold = updatedFilm.tickets_sold;
              displayFilmDetails(film);
          })
          .catch(error => console.error('Error:', error));
      } else {
          alert('No more tickets available for this film.');
      }
  }
});