const API_KEY = "566ec7fa-471e-11ee-be56-0242ac120002";
const URL="https://prfauraproject.up.railway.app/api/users?apiKey=";
const URLRobotsCat="https://robohash.org/4.png?set=set4"
const URLRobots="https://robohash.org/RN";
const extension=".png"

const personaImage=document.getElementById("navbar__persona-image");
const inputSearchFriends=document.getElementById("search-friends__form-search");
const boxCards=document.getElementById("box-cards");

axios
.get(`${URL}${API_KEY}`)
.then(res=>{
    const data=res.data;
    console.log("data : ", data);

    // Création des cards
    for (const user of data) {
        if(user.isFavorite){
            boxCards.innerHTML+=createCards(user);
        }
    }

    // Création de l'écouteur sur une card.
    console.log("boxCards : ", boxCards);
    for (const card of boxCards.children) {
        card.addEventListener("click", ()=>{
            
        });
    }

    personaImage.innerHTML=`<img src="${URLRobotsCat}" alt="Joseph Joe"/>`
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