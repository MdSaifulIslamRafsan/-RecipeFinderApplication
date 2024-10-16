const searchForm = document.getElementById("searchForm"); 
const searchInput = document.getElementById("searchInput");
const dishContainer = document.getElementById("dish-container");
const MealType = document.getElementById("MealType");
const recipeContainer = document.getElementById("recipe-container");
const searchContainer = document.querySelector(".search-container");
let allDishes = [];
const performSearch = () => {
    const query = searchInput.value.toLowerCase();
        const filteredDishes  = allDishes.filter(dish => dish?.dishName.toLowerCase().includes(query)) 
        showDishCard(filteredDishes)
}
MealType.addEventListener('click', ()=>{
    const selectedMealType = MealType.value;
    if (selectedMealType) {
        const filteredDishes  = allDishes.filter(dish => dish?.mealType.toLowerCase() === selectedMealType) 
        showDishCard(filteredDishes)
    }else{
        showDishCard(allDishes);
    }
    
   
})
searchForm.addEventListener('submit', (e) => {
        e.preventDefault();  
        performSearch();
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            performSearch(allDishes); 
        }
    });

    async function getDishData(){
        const res = await fetch('./dish.json')
        const data = await res.json();
        allDishes = data;
        showDishCard(allDishes)
    }
    getDishData()

function showDishCard(dishData){
     dishContainer.innerHTML = ""
    if(dishData.length === 0){
        const h3 = document.createElement('h3');
        h3.innerText =  "No recipes found. Try another search."
        dishContainer.style.display = "block"
        dishContainer.appendChild(h3)
    }else{
        dishContainer.style.display = "grid"
        dishData.forEach(data => {
            const div = document.createElement('div');
            div.classList.add('card')
            div.innerHTML = `
            <img src="${data?.recipeImage}" alt=${data?.dishName}/>
            <h3>${data?.dishName}</h3>
            <p>${data?.shortDescription}</p>
            <p>Cooking Time : ${data?.cookingTime}</p>
            <p>Preparation Time : ${data?.preparationTime}</p>
            <button onclick="showRecipeDetails('${data?.id}')">Details</button>
            `
            dishContainer.appendChild(div)
            
        });
    }
}


function showRecipeDetails(recipeId) {
    searchContainer.classList.add("hidden")
        const recipe = allDishes.find(r => r.id === parseInt(recipeId));
        dishContainer.innerHTML = ""
        if (recipe) {
            recipeContainer.innerHTML = `
                <div class="recipe-card">
                    <h2>${recipe.dishName}</h2>
                    <img src="${recipe.recipeImage}" alt="${recipe.dishName}" />
                    <p><strong>Description:</strong> ${recipe.shortDescription}</p>
                    <p><strong>Preparation Time:</strong> ${recipe.preparationTime}</p>
                    <p><strong>Cooking Time:</strong> ${recipe.cookingTime}</p>
                    <p><strong>Dietary Info:</strong> ${recipe.dietaryInfo}</p>
                     <p><strong>Meal Type:</strong> ${recipe.mealType}</p> 
                    <h3>Ingredients:</h3>
                    <ul>
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>

                    <h3>Instructions:</h3>
                    <ol>
                        ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
                    </ol>

                    <h3>Nutritional Information:</h3>
                    <p>Calories: ${recipe.nutrition.calories}</p>
                    <p>Fat: ${recipe.nutrition.fat}</p>
                    <p>Protein: ${recipe.nutrition.protein}</p>
                    <p>Carbohydrates: ${recipe.nutrition.carbohydrates}</p>
                    <p>Rating: ${recipe.rating} ⭐</p>
                    <button id="back-btn">Back to Recipes</button>
                </div>
            `;

           
            document.getElementById('back-btn').addEventListener('click', () => {
                searchContainer.classList.remove("hidden")
                recipeContainer.innerHTML = ""
                showDishCard(allDishes)
            });
        }
    }


