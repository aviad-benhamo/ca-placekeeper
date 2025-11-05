'use strict'

var gPlaces

const placeService = {
    getPlaces,
    removePlace,
}

_createPlaces()

function getPlaces() {
    return gPlaces
}

function removePlace(placeId) {
    const placeIdx = gPlaces.findIndex(place => place.id === placeId)

    gPlaces.splice(placeIdx, 1)
}


function _createPlaces() {
    gPlaces = [
        _createPlace('Sydney', -33.8688, 151.2093, 10),
        _createPlace('Florentin', 32.0558, 34.7709, 15)
    ]
}

function _createPlace(name, lat, lng, zoom) {

    return {
        id: _makeId(),
        name,
        lat,
        lng,
        zoom
    }
}

function _makeId(length = 4) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}