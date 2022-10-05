//get user location
let pos = [];
async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
}

//build the initial map
async function buildMap(){
    await getCoords()
    var map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

    let userLocation = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
    userLocation.addTo(map).bindPopup('<p1><b>Current Location</b></p1>').openPopup()
} 
buildMap()

async function getFourSquare(category){
    
    await getCoords();
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3OZfGlN/uXraKjWqvC7o1j3P4FHhN5cQQiUJVgjngxGY='
        }
      };
      let businessArr = [];
      await fetch(`https://api.foursquare.com/v3/places/search?ll=32.715736%2C117.161087&categories=${category}&limit=5`, options)
        .then(response => response.json())
        .then(response => businessArr = response)
        .catch(err => console.error(err));
        
    
}





