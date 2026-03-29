const API_KEY = "LoZnZJGk0Nn0tHuzyHZbD6Ex7A32BCo7xIoW4frPS98xTrKJ";
const BASE_URL = "https://api.nytimes.com/svc/books/v3";

// ======================
// MOSTRAR LIBROS
// ======================
function showBooks(books){

const container = document.getElementById("results");
container.innerHTML = "";

if(!books || books.length === 0){
container.innerHTML = "<p>No books available</p>";
return;
}

books.forEach(book => {

const div = document.createElement("div");
div.classList.add("book");

div.innerHTML = `
<img src="${book.book_image}">
<h3>${book.title}</h3>
<p><b>Author:</b> ${book.author}</p>
<p><b>Rank:</b> ${book.rank}</p>
`;

container.appendChild(div);

});

}

// ======================
// 1. OVERVIEW GENERAL
// ======================
async function getOverview(){

const url = `${BASE_URL}/lists/full-overview.json?api-key=${API_KEY}`;

try{

const response = await fetch(url);
const data = await response.json();

const container = document.getElementById("results");
container.innerHTML = "";

data.results.lists.forEach(list => {

const div = document.createElement("div");
div.classList.add("book");

div.innerHTML = `
<h3>${list.list_name}</h3>
<p>Updated: ${list.updated}</p>
`;

container.appendChild(div);

});

}catch(error){
console.error(error);
alert("Error loading overview");
}

}

// ======================
// 2. BEST SELLERS
// ======================
async function getBestSellers(){

const url = `${BASE_URL}/lists/current/hardcover-fiction.json?api-key=${API_KEY}`;

try{

const response = await fetch(url);
const data = await response.json();

showBooks(data.results.books);

}catch(error){
console.error(error);
alert("Error loading best sellers");
}

}

// ======================
// 3. LIBROS INFANTILES
// ======================
async function getChildrenBooks(){

const url = `${BASE_URL}/lists/current/childrens-middle-grade-hardcover.json?api-key=${API_KEY}`;

try{

const response = await fetch(url);
const data = await response.json();

showBooks(data.results.books);

}catch(error){
console.error(error);
alert("Error loading children books");
}

}

// ======================
// 4. PAPERBACK NONFICTION
// ======================
async function getNonFiction(){

const url = `${BASE_URL}/lists/current/paperback-nonfiction.json?api-key=${API_KEY}`;

try{

const response = await fetch(url);
const data = await response.json();

showBooks(data.results.books);

}catch(error){
console.error(error);
alert("Error loading nonfiction");
}

}

// ======================
// 5. YOUNG ADULT
// ======================
async function getYoungAdult(){

const url = `${BASE_URL}/lists/current/young-adult-hardcover.json?api-key=${API_KEY}`;

try{

const response = await fetch(url);
const data = await response.json();

showBooks(data.results.books);

}catch(error){
console.error(error);
alert("Error loading young adult books");
}

}

// ======================
// 6. BUSINESS BOOKS
// ======================
async function getAdvice(){

const url = `${BASE_URL}/lists/current/business-books.json?api-key=${API_KEY}`;

try{

const response = await fetch(url);
const data = await response.json();

if(!data.results || !data.results.books){
document.getElementById("results").innerHTML = "<p>No books available</p>";
return;
}

showBooks(data.results.books);

}catch(error){
console.error(error);
alert("Error loading business books");
}

}

// ======================
// BUSCAR POR CATEGORÍA
// ======================
async function loadCategory(){

const category = document.getElementById("categorySelect").value;

const container = document.getElementById("results");
container.innerHTML = "<p>Loading...</p>";

try{

const response = await fetch(`${BASE_URL}/lists/current/${category}.json?api-key=${API_KEY}`);

const data = await response.json();

if(data.status !== "OK"){
container.innerHTML = "<p>Error: invalid category</p>";
return;
}

if(!data.results || !data.results.books || data.results.books.length === 0){
container.innerHTML = "<p>No books found</p>";
return;
}

container.innerHTML = "";

data.results.books.forEach(book => {

const div = document.createElement("div");

div.innerHTML = `
<img src="${book.book_image}" width="100">
<h3>${book.title}</h3>
<p>${book.author}</p>
`;

container.appendChild(div);

});

}catch(error){

container.innerHTML = "<p>Error loading data</p>";
console.error(error);

}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Error:", err));
}

}