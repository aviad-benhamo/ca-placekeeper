'use strict'

var gMap

function onInit() {
    const userPrefs = userService.load()
    if (userPrefs) {
        document.body.style.backgroundColor = userPrefs.bgColor
        document.body.style.color = userPrefs.txtColor
    }

    renderPlaces()
}

function initMap() {
    const elatCoords = { lat: 29.5581, lng: 34.9482 }
    const mapOptions = {
        center: elatCoords,
        zoom: 12
    }
    const elMap = document.querySelector('.map-container')
    gMap = new google.maps.Map(elMap, mapOptions)

    gMap.addListener('click', (ev) => {
        const placeName = prompt('Enter place name:', 'New Place')
        if (!placeName) return

        const lat = ev.latLng.lat()
        const lng = ev.latLng.lng()

        placeService.addPlace(placeName, lat, lng, gMap.getZoom())

        renderPlaces()
        gMap.setCenter({ lat, lng })
    })
}

function renderPlaces() {
    const places = placeService.getPlaces()

    const strHtmls = places.map(place => {
        return `
        <li>
            ${place.name}
            <button class="btn-delete" onclick="onRemovePlace('${place.id}')">x</button>
            <button class="btn-go" onclick="onPanToPlace('${place.id}')">Go</button>
        </li>
        `
    })

    document.querySelector('.places-list').innerHTML = strHtmls.join('')
}

function onRemovePlace(placeId) {
    placeService.removePlace(placeId)

    renderPlaces()

}

function onPanToPlace(placeId) {
    const place = placeService.getPlaceById(placeId)
    gMap.setCenter({ lat: place.lat, lng: place.lng })
    gMap.setZoom(place.zoom)
}