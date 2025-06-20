const products = [
  { id: 1, name: "Tomatoes", price: 20, category: "vegetable", img: "file:///C:/Users/ASUS/OneDrive/Desktop/tamotos.jpg" },
  { id: 2, name: "Basmati Rice", price: 60, category: "grain", img: "file:///C:/Users/ASUS/OneDrive/Desktop/basmati rice.jpeg" },
  { id: 3, name: "Turmeric Powder", price: 30, category: "spice", img: "file:///C:/Users/ASUS/OneDrive/Desktop/turmeric.jpg" },
  { id: 4, name: "Green Chilies", price: 15, category: "vegetable", img:"file:///C:/Users/ASUS/OneDrive/Desktop/green chillies.avif" },
  { id: 5, name: "Wheat Flour", price: 50, category: "grain", img:"file:///C:/Users/ASUS/OneDrive/Desktop/whaet flour.jpg"},
  { id: 6, name: "Onions", price: 25, category: "vegetable", img: "file:///C:/Users/ASUS/OneDrive/Desktop/onions.jpeg" },
  { id: 7, name: "Red Chilies", price: 35, category: "spice", img: "file:///C:/Users/ASUS/OneDrive/Desktop/red chillies.jpg" },
  { id: 8, name: "Lentils", price: 40, category: "grain", img: "file:///C:/Users/ASUS/OneDrive/Desktop/lenties.jpg" }
];

const recipes = [
  { title: "Spicy Lentil Curry", img:"file:///C:/Users/ASUS/OneDrive/Desktop/spicy lentin curry.jpeg" , desc: "A hearty curry made with lentils, tomatoes, and spices. Perfect for a cozy dinner." },
  { title: "Tomato Rice", img: "file:///C:/Users/ASUS/OneDrive/Desktop/tamato rice.jpg", desc: "Delicious basmati rice cooked with ripe tomatoes and a blend of spices." },
  { title: "Chili-Onion Roti", img: "file:///C:/Users/ASUS/OneDrive/Desktop/roti.jpg", desc: "A spicy Indian flatbread made using wheat flour, chilies, and onions." }
];

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const cartPanel = document.getElementById("cartPanel");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("closeCart");
const cartCount = document.getElementById("cart-count");
const totalAmount = document.getElementById("totalAmount");
const searchInput = document.createElement("input");
searchInput.placeholder = "Search ingredients...";
searchInput.id = "searchBox";
document.querySelector(".controls").prepend(searchInput);

const recipeSection = document.createElement("div");
recipeSection.className = "product-grid";
recipeSection.innerHTML = `<h2 style='grid-column: 1/-1;'>Featured Recipes</h2>`;
document.body.appendChild(recipeSection);

recipes.forEach(recipe => {
  const card = document.createElement("div");
  card.className = "product";
  card.innerHTML = `
    <img src="${recipe.img}" alt="${recipe.title}" />
    <h4>${recipe.title}</h4>
    <p>${recipe.desc}</p>
  `;
  recipeSection.appendChild(card);
});

let cart = [];

function renderProducts() {
  const filter = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortPrice").value;
  const search = document.getElementById("searchBox").value.toLowerCase();

  let filtered = [...products];

  if (filter !== "all") {
    filtered = filtered.filter(p => p.category === filter);
  }

  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
  }

  filtered.sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price);

  productList.innerHTML = "";
  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    total += item.price;
    cartItems.appendChild(li);
  });
  cartCount.textContent = cart.length;
  totalAmount.textContent = `Total: ₹${total}`;
}

cartBtn.onclick = () => cartPanel.classList.add("open");
closeCart.onclick = () => cartPanel.classList.remove("open");

document.getElementById("categoryFilter").onchange = renderProducts;
document.getElementById("sortPrice").onchange = renderProducts;
document.getElementById("searchBox").oninput = renderProducts;

renderProducts();

// To-Do List
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };
    taskList.appendChild(li);
  });
}

taskForm.onsubmit = (e) => {
  e.preventDefault();
  tasks.push(taskInput.value.trim());
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
};

renderTasks();
