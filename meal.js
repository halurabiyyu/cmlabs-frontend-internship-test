// meal-detail.js
document.addEventListener('DOMContentLoaded', function() {
    const mealNameElement = document.getElementById('mealName');
    const mealImageElement = document.getElementById('mealImage');
    const mealDescriptionElement = document.getElementById('mealDescription');
    const mealRecipeElement = document.getElementById('mealRecipe');
    const youtubeEmbedElement = document.getElementById('youtubeEmbed');
  
    // Get the meal ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('mealId');
  
    // Fetch meal details using the meal ID
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => {
        const meal = response.data.meals[0];
        mealNameElement.textContent = meal.strMeal;
        mealImageElement.src = meal.strMealThumb;
        mealDescriptionElement.textContent = meal.strInstructions;
  
        // Display recipe ingredients
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient) {
            const listItem = document.createElement('li');
            listItem.textContent = `${measure} ${ingredient}`;
            mealRecipeElement.appendChild(listItem);
          }
        }
  
        // Embed YouTube video if available
        if (meal.strYoutube) {
          const videoId = meal.strYoutube.split('v=')[1];
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          youtubeEmbedElement.innerHTML = `<iframe width="100%" height="315" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
        }
      })
      .catch(error => console.error('Error fetching meal details:', error));
  });
  
  // Function to go back to the previous page
  function goBack() {
    window.history.back();
  }
  