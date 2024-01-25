const apiKey = "09e7abdc71fee8d1706582eaac3f72aa";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?unit=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const card = document.getElementById("cards");
const icon = document.querySelector(".weatherimage");

//to clear the serach bar 
const clearSearch = function(){
  searchBox.value =''
}
async function checkweather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    if (response.status == "404") {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      document.querySelector(".container").style.display = "none";
    
    }
    else{
      
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) - 273 + " °C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
  document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";


  let videoSrc;
  if (data.weather[0].main === "Clouds") {
    videoSrc = "./images/images/cloud_video.mp4";
    icon.src = "images/images/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    videoSrc = "images/images/clearweather.mp4";
    icon.src = "images/images/clear.png";
  } else if (data.weather[0].main === "Rain") {
    videoSrc = "images/images/rainyvideo.mp4";
    icon.src = "images/images/raining.png"
  }else if (data.weather[0].main === "ThunderStorm") {
    videoSrc = "images/images/thunderstorm.mp4";
    icon.src = "images/images/clear.png"}
  
  
  
  else {
    videoSrc = "default.mp4";
  }
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".container").style.display = "block";
  document.querySelector(".error").style.display = "none";

  // Update the video source
  // Get Element tag
  const changeVideo = document.getElementById("vido");
  // Up[date element tag to new input
  changeVideo.src = videoSrc;
  console.log(data)
}
    } catch (error) {
      console.log(error);
    }
  }

searchBtn.addEventListener("click", () => {
  checkweather(searchBox.value);
  clearSearch()
});


document.addEventListener('keydown', (e)=>{
  if (e.key === 'Enter') {
    checkweather(searchBox.value);
    clearSearch()
  }
})