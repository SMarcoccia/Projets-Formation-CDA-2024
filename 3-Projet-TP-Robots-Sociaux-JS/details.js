
const API_KEY = "566ec7fa-471e-11ee-be56-0242ac120002";
const urlParams = new URLSearchParams(location.search);
const id = parseInt(urlParams.get("id"));
const $singleUser = document.getElementById("singleUser");
console.log(id);
axios
  .get(`https://prfauraproject.up.railway.app/api/users/${id}?apiKey=${API_KEY}`)
  .then((res) => {
      const user = res.data;

  if (user) {
    const userP = `
<p>${user.id}</p>
<p>${user.name}</p>

`;
    $singleUser.innerHTML = userP;
  } 

  });



