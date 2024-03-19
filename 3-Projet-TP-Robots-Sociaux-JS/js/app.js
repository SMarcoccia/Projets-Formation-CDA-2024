const API_KEY = "?apiKey=566ec7fa-471e-11ee-be56-0242ac120002";
const URL="https://prfauraproject.up.railway.app/api/users";
const URLRobots="https://robohash.org/RN";
const URLRobotsCat="https://robohash.org/4.png?set=set4"
const extension=".png"

const boxTagsCities=document.getElementById("box-tags__cities");
const boxCards=document.getElementById("box-cards");
const inputSearchFriends=document.getElementById("search-friends__form-search");
const personaImage=document.getElementById("navbar__persona-image");
const btnMenuBurger=document.getElementById("navbar__menuburger");
const navbarLateral=document.getElementById("navbar-lateral");
const navbarLateralView=document.getElementsByClassName("navbar-lateral-view");
const searchTagsCards=document.getElementById("search-tags-cards");
const iconBars=document.getElementById("navbar__menuburger-bars");
const iconCrux=document.getElementById("navbar__menuburger-crux");
const headerMenuBurgerOpen=document.getElementById("header");

let lastTag="";
//let currentTag="";
//const boxCardsSave=boxCards;

//console.log("boxCards : ", boxCards);
//console.log("boxCardsSave : ", boxCardsSave);
//console.log("boxCards === boxCardsSave : ", boxCards === boxCardsSave);


btnMenuBurger.addEventListener("click", ()=>{
    if(navbarLateral.getAttribute("class")==="nav-lateral"){
        navbarLateral.classList.replace("nav-lateral", "nav-lateral-view");
        searchTagsCards.classList.replace("search-tags-cards", "search-tags-cards-hidden");
        iconBars.classList.toggle("navbar__menuburger-bars-hidden");
        iconCrux.classList.replace("navbar__menuburger-crux-hidden", "navbar__menuburger-crux-view");
        headerMenuBurgerOpen.classList.toggle("header__menuburger-open");
    }else{
        navbarLateral.classList.replace("nav-lateral-view", "nav-lateral");
        searchTagsCards.classList.replace("search-tags-cards-hidden", "search-tags-cards");
        iconBars.classList.toggle("navbar__menuburger-bars-hidden");
        iconCrux.classList.replace("navbar__menuburger-crux-view", "navbar__menuburger-crux-hidden");
        headerMenuBurgerOpen.classList.toggle("header__menuburger-open");
    }
});

// Listes des cités (ne doit pas contenir de doublon dans la liste) pour éviter les doublons lors de l'affichage des tags.
const cities=[];

axios
.get(`${URL}${API_KEY}`)
.then(res=>{
    const data=res.data;
    console.log("data : ", data);

    // Création des tags et des cards
    boxTagsCities.innerHTML+=`<button class="btn-tag btn reset">Reset</button>`
    for (const user of data) {
        let city=user.address.city
        if(cities.includes(city) === false){
            cities.push(city);
            boxTagsCities.innerHTML+=`<button class="btn-tag btn">${city}</button>`
        }
        boxCards.innerHTML+=createCards(user);
    }

    // Création de l'écouteur sur les tags et affichage des cards en fonctions du tag choisie.
    const btnsTagsCities=document.querySelectorAll("#box-tags__cities .btn-tag");
    const cards=document.querySelectorAll("#box-cards .card");

    for (const btnTagCity of btnsTagsCities) {
        btnTagCity.addEventListener("click", () => {

            // Supprime le bkg si un autre tag à été sélectionné.
            if(lastTag !== "" && lastTag !== btnTagCity){
                lastTag.classList.remove("btn-tag-color");
            }
            
            // Si on appuie sur reset on affiche toutes les cards.
            if(btnTagCity.innerText.toLowerCase() === "reset"){
                for (const user of data) {
                    //cards[user.id-1].style.display="block"; 
                    cards[user.id-1].classList.replace("card-hidden", "card");
                }
            }else{
                // Affiche les cards des utilisateurs du tag choisie.
                for (const user of data) {
                    // Si l'utilisateur n'a pas cette adresse.
                    if(user.address.city!==btnTagCity.innerText){
                        cards[user.id-1].classList.replace("card", "card-hidden");
                    }else{
                        cards[user.id-1].classList.replace("card-hidden", "card");
                    }
                }
                // Permet de figer le background sur le bouton après le click.           
                btnTagCity.classList.add("btn-tag-color");
            }
            lastTag=btnTagCity;
        });
    }

    // Création de l'image du persona dans la navbar (header).
    personaImage.innerHTML=`<img src="${URLRobotsCat}" alt="Joseph Joe"/>`

    // Récupération de tout les bouttons favories.
    const btnFavourites = document.querySelectorAll(".card__button-heart");

    // Affichage des coeurs en jaune des utilisateur si ils sont favories, lorsque l'on arrive sur la page.
    for (const user of data) {
        if(user.isFavorite){
            btnFavourites[user.id-1].style.color="yellow";
        }
    }

    // Création de l'écouteur pour les boutons favoris.
    for (let i = 0; i < btnFavourites.length; i++) {
        btnFavourites[i].addEventListener("click", ()=>{
            axios
            .patch(`${URL}/toggle-favorite/${i+1}${API_KEY}`)
            .then(res=>{
                let user=res.data;
                if(user.isFavorite) btnFavourites[i].style.color="yellow";
                else btnFavourites[i].style.color="black";
            });
        });        
    }

    // Création de la barre de recherche et affichage des cards.
    inputSearchFriends.addEventListener("keyup", ()=>{
        let word=inputSearchFriends.value.toLowerCase();
        for (const user of data) {
            let firstname=user.name.substring(0, word.length).toLowerCase();
            let lastname=user.name.substring(user.name.indexOf(' ')+1, user.name.indexOf(' ')+1+word.length).toLowerCase();
            let tmpWord=word.toLowerCase();
            if(firstname===tmpWord || lastname===tmpWord){
                cards[user.id-1].classList.replace("card-hidden", "card");
            }else{
                cards[user.id-1].classList.replace("card", "card-hidden");
            }
        }
    })
});

/* FONCTIONS */

// Création de l'écouteur pour les boutons favoris.
function createListenerBtnsFavourites(btnFavourites, data) {
    for (const user of data) {
        if(user.isFavorite){
            btnFavourites[user.id-1].style.color="yellow";
        }
    }

    for (let i = 0; i < btnFavourites.length; i++) {
        btnFavourites[i].addEventListener("click", ()=>{
            console.log("into btnFavourites addevent");
            axios
            .patch(`${URL}/toggle-favorite/${i+1}${API_KEY}`)
            .then(res=>{
                let user=res.data;
                if(user.isFavorite) btnFavourites[i].style.color="yellow";
                else btnFavourites[i].style.color="black";
            });
        });        
    }
}

function createCards(user) {
    return `
    <div class="card">
        <div class="card__id" hidden="hidden">${user.id}</div>
        <a href="./details.html?id=${user.id}">
            <div class="card__imgInfo">
                <div class="card__box-image"><img src="${URLRobots}${user.id}${extension}" class="card__image" alt="RobotFriend : ${user.name}"/></div>
                <div class="card__info">
                    <h3 class="card__info-name">${user.name}</h3>
                    <p class="card__info-email"><span>Email : </span>${user.email}</p>
                    <p class="card__info-phone"><span>Phone : </span>${user.phone}</p>
                </div>
            </div>
        </a>
        <div class="card__button">
            <button class="card__button-heart"><i class="fa-solid fa-heart"></i></button>
        </div>
    </div>
`;
}