const urlParams=new URLSearchParams(location.search);
const idUser=urlParams.get("id");

const API_KEY = "apiKey=566ec7fa-471e-11ee-be56-0242ac120002";
const URL="https://prfauraproject.up.railway.app/api/users/";
const URLRobots="https://robohash.org/RN";
const extension=".png"

const boxCard=document.getElementById("box-card");

console.log("`${URL}${API_KEY}&id=${idUser}` : ", `${URL}${API_KEY}&id=${idUser}`);

axios
.get(`${URL}${idUser}?${API_KEY}`)
.then(res=>{
    const user = res.data;
    console.log("user : ", user);
    console.log("user.id : ", user.id);
    boxCard.innerHTML=createCards(user);

});

function createCards(user) {
    return `
    <div class="card">
        <div class="card__persona>
            <div class="card__persona-img><img src="${URLRobots}${user.id}${extension}" class="card__image" alt="RobotFriend : ${user.name}"/></div>
            <div class="card__persona-details">
                <h1 class="card__persona-name">${user.name}</h1>
                <p class="card__persona-email"><span>Email : </span>${user.email}</p>
                <p class="card__persona-phone"><span>Phone : </span>${user.phone}</p>
                <button class="card__persona-heart"><i class="fa-regular fa-heart"></i><span>Make Favorite</span></button>
            </div>
        </div>
        <h3 class="card__title">More Details</h3>
        <div class="card__address">
            <h4 class="card__address-title">Address</h4>
            <div class="card__address-details">
                <p class="card__address-details-street"><span>Street : </span>${user.address.street}</p>
                <p class="card__address-details-suite"><span>Suite : </span>${user.address.suite}</p>
                <p class="card__address-details-city"><span>City : </span>${user.address.city}</p>
            </div>
        </div>
        <div class="card__company">
            <h4 class="card__company-title">Company</h4>
            <div class="card_company-details">
                <p class="card__company-details-name"><span>Name : </span>${user.company.name}</p>
            </div>
        </div>
    </div>
`;
}