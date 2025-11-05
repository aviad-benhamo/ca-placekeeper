'use strict'

const STORAGE_KEY = 'placeDB'

var gPlaces

const placeService = {
    getPlaces,
    removePlace,
    addPlace,
    getPlaceById
}

_createPlaces()

function getPlaces() {
    return gPlaces
}

function removePlace(placeId) {
    const placeIdx = gPlaces.findIndex(place => place.id === placeId)
    gPlaces.splice(placeIdx, 1)

    _savePlacesToStorage()
}

function addPlace(name, lat, lng, zoom) {
    const newPlace = _createPlace(name, lat, lng, zoom)
    gPlaces.unshift(newPlace)

    _savePlacesToStorage()
}

function getPlaceById(placeId) {
    return gPlaces.find(place => place.id === placeId)
}


function _createPlaces() {
    gPlaces = loadFromStorage(STORAGE_KEY)

    if (!gPlaces || !gPlaces.length) {
        gPlaces = [
            _createPlace('Sydney', -33.8688, 151.2093, 10),
            _createPlace('Florentin', 32.0558, 34.7709, 15)
        ]
        _savePlacesToStorage()
    }
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

function _savePlacesToStorage() {
    saveToStorage(STORAGE_KEY, gPlaces)
}

function _makeId(length = 4) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}