'use strict'

var gMap
var gMarkers = []

function onInit() {
    const userPrefs = userService.load()
    if (userPrefs) {
        document.body.style.backgroundColor = userPrefs.bgColor
        document.body.style.color = userPrefs.txtColor
    }

}

function initMap() {
    const elatCoords = { lat: 29.5581, lng: 34.9482 }
    const mapOptions = {
        center: elatCoords,
        zoom: 12,
        mapId: 'DEMO_MAP_ID'
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
    renderPlaces()
}

function renderPlaces() {
    const places = placeService.getPlaces()

    const strHtmls = places.map(place => {
        return `
        <li>
            <span class="place-name">${place.name}</span>
            <div class="place-buttons">
                <button class="btn-delete" onclick="onRemovePlace('${place.id}')">x</button>
                <button class="btn-go" onclick="onPanToPlace('${place.id}')">Go</button>
            </div>
        </li>
        `
    })

    document.querySelector('.places-list').innerHTML = strHtmls.join('')

    if (!gMap) return

    _clearMarkers()

    gMarkers = places.map(place => {
        return new google.maps.marker.AdvancedMarkerElement({
            position: { lat: place.lat, lng: place.lng },
            map: gMap,
            title: place.name
        })
    })

}

function onRemovePlace(placeId) {
    placeService.removePlace(placeId)

    renderPlaces()

}

function onGetUserLocation() {
    console.log('Requesting user location...')
    if (!gMap) {
        alert('Map is not ready yet, please wait a moment.')
        return
    }

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            (position) => {
                console.log('User approved location', position)
                const { latitude, longitude } = position.coords

                gMap.setCenter({ lat: latitude, lng: longitude })
                gMap.setZoom(15)
            },

            (err) => {
                console.error('Error getting user location', err)
                alert('Could not get your location')
            }
        )
    } else {
        console.error('Geolocation is not supported by this browser')
        alert('Your browser does not support Geolocation')
    }
}


function onPanToPlace(placeId) {
    const place = placeService.getPlaceById(placeId)
    gMap.setCenter({ lat: place.lat, lng: place.lng })
    gMap.setZoom(place.zoom)
}

function _clearMarkers() {
    gMarkers.forEach(marker => marker.setMap(null))
    gMarkers = []
}


function onDownloadCSV(elLink) {
    const places = placeService.getPlaces()
    if (!places || !places.length) {
        alert('No places to download')
        return
    }

    const headers = 'Name,Latitude,Longitude,Zoom\n'

    const csvRows = places.map(place =>
        `${place.name},${place.lat},${place.lng},${place.zoom}`
    ).join('\n')

    const csvContent = headers + csvRows

    elLink.href = 'data:text/csv;charset=utf-8,' + csvContent
}