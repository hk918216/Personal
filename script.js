let allMovies = [];
let genreChart;
let yearChart;
const colors = [
"#4e79a7",
"#f28e2b",
"#e15759",
"#76b7b2",
"#59a14f",
"#edc948"
];

fetch("data/movies.json")
.then(res => res.json())
.then(data => {
    allMovies = data;

    initCharts();
    updateDashboard();

});

document.getElementById("genreFilter").addEventListener("change", updateDashboard);
document.getElementById("searchInput").addEventListener("input", updateDashboard);
document.getElementById("ratingFilter").addEventListener("change", e=>{
    document.getElementById("ratingValue").textContent = e.target.value;
    updateDashboard();
});

function getFilteredMovies(){
    let genre = document.getElementById("genreFilter").value;
    let search = document.getElementById("searchInput").value.toLowerCase();
    let rating = parseFloat(document.getElementById("ratingFilter").value);

    return allMovies.filter(movie=>{
    return (genre==="ALL" || movie.genre===genre) &&
    movie.title.toLowerCase().includes(search) &&
    movie.rating >= rating;

    });
}

function updateDashboard(){

let movies = getFilteredMovies();

document.getElementById("movieCount").textContent =
`현재 영화 수: ${movies.length}`;


updateGenreChart(movies);
updateYearChart(movies);
updateTopMovies(movies);

}


function initCharts(){

genreChart = new Chart(document.getElementById("genreChart"), {
type: "bar",
data: {
labels: [],
datasets: [{
label: "영화 수",
data: [],
backgroundColor: "rgba(54,162,235,0.6)"
}]
},
options:{
responsive:true
}
});

yearChart = new Chart(document.getElementById("yearChart"), {
type: "line",
data: {
labels: [],
datasets: [{
label: "영화 수",
data: [],
borderColor: "orange",
backgroundColor: "rgba(255,165,0,0.2)",
fill: true
}]
},
options:{
responsive:true
}
});

}

function updateGenreChart(movies){

let genreCount = {};

movies.forEach(m=>{
genreCount[m.genre] = (genreCount[m.genre]||0)+1;
});

let labels = Object.keys(genreCount);
let values = Object.values(genreCount);

genreChart.data.labels = labels;
genreChart.data.datasets[0].data = values;

genreChart.data.datasets[0].backgroundColor =
labels.map((_,i)=>colors[i % colors.length]);

genreChart.update();

}


function updateYearChart(movies){

let yearCount = {};

movies.forEach(m=>{
yearCount[m.year] = (yearCount[m.year]||0)+1;
});

let years = Object.keys(yearCount).sort();

yearChart.data.labels = years;
yearChart.data.datasets[0].data = years.map(y=>yearCount[y]);
yearChart.update();

}


function updateTopMovies(movies){

let sorted = [...movies].sort((a,b)=>b.rating-a.rating).slice(0,10);

let list = document.getElementById("topMovies");
list.innerHTML="";

sorted.forEach(movie=>{

let li = document.createElement("li");
//li.textContent = `${movie.title} (${movie.rating})`;
li.textContent = `⭐ ${movie.rating} - ${movie.title}`;
list.appendChild(li);

});

}

document.getElementById("darkModeToggle").addEventListener("click",()=>{
document.body.classList.toggle("dark-mode");
});