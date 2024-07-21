document.addEventListener("DOMContentLoaded", () => {
  function fetchFilms(){
        fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(data => {
                console.log(data);
                fetchFilms(data);
  })
})
   
 .catch(error => console.error('Error fetching films:',error));