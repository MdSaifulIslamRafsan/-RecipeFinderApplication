const searchForm = document.getElementById("searchForm"); 
const dishContainer = document.getElementById("dish-container")
searchForm.addEventListener('submit', (e) => {
        e.preventDefault();  
    });

    async function getDishData(){
        const res = await fetch('./dish.json')
        const data = await res.json();
        showDishCard(data)


    }
    getDishData()

function showDishCard(dishData){
    dishData.forEach(data => {
        const div = document.createElement('div');
        div.classList.add('card')
        console.log(data);
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