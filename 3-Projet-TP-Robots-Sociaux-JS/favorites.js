const API_KEY = "566ec7fa-471e-11ee-be56-0242ac120002";
const $favoritesList = document.getElementById("favorites-list");

axios
  .get(
    `https://prfauraproject.up.railway.app/api/users/favorites?apiKey=${API_KEY}`
  )
  .then((res) => {
    const favorites = res.data;
    for (let favorite of favorites) {
      if(favorite.isFavorite){
        $favoritesList.innerHTML += CreateUser(favorite);
      }
    }
  })
  .catch(error=>console.log(error));

  function CreateUser(favorite) {
    return `
    <a href="details.html?id=${favorite.id}">
     <img src="https://robohash.org/${favorite.id}" alt="${favorite.name}"></img>
      <h1>${favorite.name}</h1>
       <p>${favorite.email} </p>  
       <btn>coeur<btn>
    </a>
  `;
  }