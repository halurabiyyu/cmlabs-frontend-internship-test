// app.js
document.addEventListener("DOMContentLoaded", function () {
  const categoryList = document.getElementById("categoryList");

  axios
    .get("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => {
      const categories = response.data.categories;
      categories.forEach((category) => {
        const categoryCard = `
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-full h-48 object-cover">
              <div class="p-4 text-center">
                <h2 class="text-lg font-bold">${category.strCategory}</h2>
                <button onclick="viewCategoryDetail('${category.strCategory}')" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:outline hover:bg-blue-700">View Meals</button>
              </div>
            </div>
          `;
        categoryList.innerHTML += categoryCard;
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));
});

function viewCategoryDetail(categoryName) {
  window.location.href = `list-meals.html?category=${categoryName}`;
}
