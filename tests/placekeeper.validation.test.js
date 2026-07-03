const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')

function createLocalStorage() {
  const store = new Map()
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null
    },
    setItem(key, value) {
      store.set(key, String(value))
    },
    removeItem(key) {
      store.delete(key)
    },
    clear() {
      store.clear()
    }
  }
}

function loadScript(context, relativePath) {
  const absolutePath = path.join(__dirname, '..', relativePath)
  const source = fs.readFileSync(absolutePath, 'utf8')
  vm.runInContext(source, context, { filename: relativePath })
}

function createBaseContext(overrides = {}) {
  const localStorage = createLocalStorage()
  const context = vm.createContext({
    console: {
      log() {},
      error() {},
      warn() {}
    },
    localStorage,
    window: {},
    document: {},
    navigator: {},
    alert() {},
    prompt() {},
    ...overrides
  })

  return { context, localStorage }
}

test('placeService seeds default places and persists add/remove operations', () => {
  const { context, localStorage } = createBaseContext()
  loadScript(context, 'js/utilService.js')
  loadScript(context, 'js/placeService.js')

  const initialPlaces = vm.runInContext('placeService.getPlaces()', context)
  assert.equal(initialPlaces.length, 2)
  assert.equal(initialPlaces[0].name, 'Sydney')
  assert.equal(initialPlaces[1].name, 'Florentin')

  vm.runInContext("placeService.addPlace('Test Place', 1.23, 4.56, 8)", context)
  let updatedPlaces = vm.runInContext('placeService.getPlaces()', context)
  assert.equal(updatedPlaces[0].name, 'Test Place')
  assert.equal(updatedPlaces.length, 3)

  const persistedAfterAdd = JSON.parse(localStorage.getItem('placeDB'))
  assert.equal(persistedAfterAdd[0].name, 'Test Place')

  const addedPlaceId = updatedPlaces[0].id
  vm.runInContext(`placeService.removePlace('${addedPlaceId}')`, context)
  updatedPlaces = vm.runInContext('placeService.getPlaces()', context)
  assert.equal(updatedPlaces.length, 2)
  assert.ok(updatedPlaces.every(place => place.name !== 'Test Place'))
})

test('userService saves and loads preferences through localStorage', () => {
  const { context, localStorage } = createBaseContext()
  loadScript(context, 'js/utilService.js')
  loadScript(context, 'js/userService.js')

  vm.runInContext(
    "userService.save({ email: 'demo@example.com', bgColor: '#ffffff', txtColor: '#000000' })",
    context
  )

  const savedPrefs = JSON.parse(localStorage.getItem('userPrefsDB'))
  assert.equal(savedPrefs.email, 'demo@example.com')

  const loadedPrefs = vm.runInContext('userService.load()', context)
  assert.equal(loadedPrefs.bgColor, '#ffffff')
  assert.equal(loadedPrefs.txtColor, '#000000')
})

test('map controller shows a clear message when the Google Maps key is missing', () => {
  const mapContainer = { innerText: '' }
  const consoleErrors = []
  const document = {
    querySelector(selector) {
      assert.equal(selector, '.map-container')
      return mapContainer
    },
    createElement() {
      throw new Error('createElement should not be called when the key is missing')
    },
    head: {
      appendChild() {
        throw new Error('appendChild should not be called when the key is missing')
      }
    },
    body: {
      style: {}
    }
  }

  const { context } = createBaseContext({
    document,
    console: {
      log() {},
      warn() {},
      error(message) {
        consoleErrors.push(message)
      }
    },
    window: {
      PLACEKEEPER_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY'
    },
    userService: {
      load() {
        return null
      }
    },
    placeService: {
      getPlaces() {
        return []
      }
    }
  })

  loadScript(context, 'js/map.controller.js')
  vm.runInContext('_loadGoogleMaps()', context)

  assert.equal(mapContainer.innerText, 'Google Maps API key is not configured.')
  assert.ok(consoleErrors.some(message => message.includes('Missing Google Maps API key')))
})

test('map controller alerts gracefully when location is requested before the map is ready', () => {
  const alerts = []
  const { context } = createBaseContext({
    alert(message) {
      alerts.push(message)
    }
  })

  loadScript(context, 'js/map.controller.js')
  vm.runInContext('onGetUserLocation()', context)

  assert.deepEqual(alerts, ['Map is not ready yet, please wait a moment.'])
})

test('map controller exports CSV data when places exist', () => {
  const link = {}
  const { context } = createBaseContext({
    placeService: {
      getPlaces() {
        return [
          { name: 'Sydney', lat: -33.8688, lng: 151.2093, zoom: 10 },
          { name: 'Florentin', lat: 32.0558, lng: 34.7709, zoom: 15 }
        ]
      }
    },
    alert() {
      throw new Error('alert should not be called when places exist')
    }
  })

  loadScript(context, 'js/map.controller.js')
  context.__link = link
  vm.runInContext('onDownloadCSV(__link)', context)

  assert.ok(
    link.href.startsWith('data:text/csv;charset=utf-8,Name,Latitude,Longitude,Zoom\nSydney')
  )
  assert.ok(link.href.includes('Florentin,32.0558,34.7709,15'))
})
