const API_KEY = "566ec7fa-471e-11ee-be56-0242ac120002";
const URL="https://prfauraproject.up.railway.app/api/users?apiKey=";
const URLRobots="https://robohash.org/RN";
const extension=".png"

const boxTagsCities=document.getElementById("box-tags__cities");
const boxCards=document.getElementById("box-cards");
const inputSearchFriends=document.getElementById("search-friends__form-search");
const personaImage=document.getElementById("navbar__persona-image");

// Listes des cités (ne doit pas contenir de doublon dans la liste) pour éviter les doublons lors de l'affichage des tags.
const cities=[];

axios
.get(`${URL}${API_KEY}`)
.then(res=>{
    const data=res.data;
    console.log("data : ", data);

    // Création des tags et des cards
    boxTagsCities.innerHTML+=`<button class="btn-tag reset">Reset</button>`
    for (const user of data) {
        let city=user.address.city
        if(cities.includes(city) === false){
            cities.push(city);
            boxTagsCities.innerHTML+=`<button class="btn-tag">${city}</button>`
        }
        boxCards.innerHTML+=createCards(user);

    }

    // Création de l'écouteur sur les tags et affichage des cards en fonctions du tag choisie.
    const btnsTagsCities=document.querySelectorAll("#box-tags__cities .btn-tag");
    for (const btnTagCity of btnsTagsCities) {
        btnTagCity.addEventListener("click", () => {
            boxCards.innerHTML="";
            if(btnTagCity.innerText.toLowerCase() === "reset"){
                for (const user of data) {
                    boxCards.innerHTML+=createCards(user);
                }
            }else{
                for (const user of data) {
                    if(user.address.city===btnTagCity.innerText){
                        boxCards.innerHTML+=createCards(user);
                    }
                }
            }
        });
    }
});


function createCards(user) {
    return `
    <div class="card">
        <a href="./details.html?id=${user.id}">
            <button class="card__heart"><i class="fa-regular fa-heart"></i></button>
            <div><img src="${URLRobots}${user.id}${extension}" class="card__image" alt="RobotFriend : ${user.name}"/></div>
            <div class="card__info">
                <h3 class="card__info-name">${user.name}</h3>
                <p class="card__info-email"><span>Email : </span>${user.email}</p>
                <p class="card__info-phone"><span>Phone : </span>${user.phone}</p>
            </div>
        </a>
    </div>
`;
}