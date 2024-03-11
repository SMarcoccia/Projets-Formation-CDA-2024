const API_KEY = "566ec7fa-471e-11ee-be56-0242ac120002";

axios.get(`https://prfauraproject.up.railway.app/api/users?apiKey=${API_KEY}`).then((res)=>console.log(res.data));

const $usersList = document.getElementById("users-list");
const $boxTags = document.getElementById("box-tags");
const $btnSearch = document.getElementById("btnSearch");
const $searchFriends=document.getElementById("search-friends__input");

axios
    .get(`https://prfauraproject.up.railway.app/api/users?apiKey=${API_KEY}`)
    .then((res) => {

        const users = res.data;

        for (let user of users) {
            $usersList.innerHTML += CreateUser(user);
        }

        $searchFriends.addEventListener("keyup", function(){
            $usersList.innerHTML="";
            for (let user of users) {
                if(user.name.toLowerCase().includes($searchFriends.value)){
                    $usersList.innerHTML += CreateUser(user);
                    console.log($usersList.innerHTML);
                }else if($searchFriends.value === ""){
                    $usersList.innerHTML += CreateUser(user);
                }
            }
        });
        
        const $idUsers=document.querySelectorAll(".idUserDetails");
        const $iconHearts=document.querySelectorAll(".heart");
        console.log("users : ", users);        
        let i=0;
        for (const $iconHeart of $iconHearts) {
            let id=$idUsers[i].search.substring(4, 5);
            $iconHeart.addEventListener("click", ()=>{
                axios
                    .patch(`https://prfauraproject.up.railway.app/api/users/toggle-favorite/${id}?apiKey=${API_KEY}`)
                    .then(res=>{

                        if(res.data.isFavorite){
                            $iconHeart.classList.replace("heart-not-favorite", "heart-favorite");
                        }else{
                            $iconHeart.classList.replace("heart-favorite", "heart-not-favorite");
                        }
                    })
                });
            i++;
        }

        //tags
        for (let user of users) {
            $boxTags.innerHTML += CreateTag(user);
        }
    
        const $tagBtns = document.querySelectorAll(".btnTag");

        for (let tagBtn of $tagBtns) {
            tagBtn.addEventListener("click", function () {

                for (const tagBtn of $tagBtns) {
                    tagBtn.classList.remove("btnTag-clicked");
                }
                const city = this.dataset.city;
                const filterUser = users.filter(function (user) {
                    return user.address.city === city;
                });
                $usersList.innerHTML ='';
                for (let user of filterUser) {
                    $usersList.innerHTML += CreateUser(user);
                }
                tagBtn.classList.toggle("btnTag-clicked");
            });
        }
    });

function CreateUser(user) {
    user.address.city = user.address.city.replace(` `, "-");
    return `
    <div>
        <button class="heart ${user.isFavorite ? "heart-favorite" : "heart-not-favorite"}" href=""><i class="fa-solid fa-heart"></i></button>
        <a class="idUserDetails ${user.address.city}" href="details.html?id=${user.id}">
            <div>
                <img src="https://robohash.org/${user.id}" alt="${user.name}"></img>
            </div>
            <h1>${user.name}</h1>
            <p>${user.email} </p>  
        </a>
    </div>
    `;
}


//  Create Tag
function CreateTag(user) {
    user.address.city = user.address.city.replace(` `, "-");
  
    return `
        <button  class="btnTag ${user.address.city}" data-city="${user.address.city}"  >
            ${user.address.city}   
        </button>
    `;
}












  
  