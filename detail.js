// category-detail.js
document.addEventListener('DOMContentLoaded', function() {
    const mealList = document.getElementById('mealList');
    const categoryNameElement = document.getElementById('categoryName');
  
    // Get the category name from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('category');
  
    // Set the category name in the header
    categoryNameElement.textContent = categoryName;
  
    // Fetch meals for the selected category
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then(response => {
        const meals = response.data.meals;
        if (meals) {
          meals.forEach(meal => {
            const mealCard = `
              <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-cover">
                <div class="p-4 text-center">
                  <h2 class="text-lg font-bold">${meal.strMeal}</h2>
                  <button onclick="viewMealDetail('${meal.idMeal}')" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">View Details</button>
                </div>
              </div>
            `;
            mealList.innerHTML += mealCard;
          });
        } else {
          mealList.innerHTML = `<p class="text-center">No meals found in this category.</p>`;
        }
      })
      .catch(error => console.error('Error fetching meals:', error));
  });
  
  // Redirect to Meal Detail page
  function viewMealDetail(mealId) {
    window.location.href = `meal.html?mealId=${mealId}`;
  }
  
  function goHome() {
    window.location.href = 'mealApp.html'; // Change to your main page's name if different
  }