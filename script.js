const searchForm = document.getElementById("searchForm"); 
const searchInput = document.getElementById("searchInput");
const dishContainer = document.getElementById("dish-container");
let allDishes = [];
const performSearch = () => {
    const query = searchInput.value.toLowerCase();
        const filteredDishes  = allDishes.filter(dish => dish?.dishName.toLowerCase().includes(query))
        console.log(filteredDishes)
        showDishCard(filteredDishes)
}
searchForm.addEventListener('submit', (e) => {
        e.preventDefault();  
        performSearch();
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            performSearch(); 
        }
    });

    async function getDishData(){
        const res = await fetch('./dish.json')
        const data = await res.json();
        allDishes = data;
        showDishCard(data)
    }
    getDishData()

function showDishCard(dishData){
       dishContainer.innerHTML = ""
    dishData.forEach(data => {
        const div = document.createElement('div');
        div.classList.add('card')
        div.innerHTML = `
        <img src=${data?.recipeImage} alt=${data?.dishName}/>
        <h2>${data?.dishName}</h2>
        <p>${data?.shortDescription}</p>
        <p>Cooking Time : ${data?.cookingTime}</p>
        <p>Preparation Time : ${data?.preparationTime}</p>
        `
        dishContainer.appendChild(div)
        
    });
}


