import './scss/style.scss'


const MAPBOX_ACCESS_TOKEN =
	"pk.eyJ1IjoiZXhlcXVpZWxhcnJveW8iLCJhIjoiY2tzcGhxaml1MDJyMjJ2cDdtYjdpdGliZCJ9.NnAoBmyFivc4F0fSUIgAHg";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
	enableHighAccuracy: true
});

function successLocation(position) {
	setupMap([position.coords.longitude, position.coords.latitude]);
}

function setupMap(centerPosition) {
	const map = new mapboxgl.Map({
		accessToken: MAPBOX_ACCESS_TOKEN,
		container: "map",
		style: "mapbox://styles/mapbox/streets-v11",
        center: centerPosition,
        zoom: 15
	});

    map.addControl(new mapboxgl.NavigationControl());

    map.addControl(
        new MapboxDirections({
        accessToken: MAPBOX_ACCESS_TOKEN
        }),
        'top-left'
        );
}

function errorLocation() {
	setupMap([-2.24, 53.48])
}


