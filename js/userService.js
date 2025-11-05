'use strict'

'use strict'

const USER_PREFS_KEY = 'userPrefsDB'

const userService = {

    save(userData) {
        saveToStorage(USER_PREFS_KEY, userData)
    },

    load() {
        return loadFromStorage(USER_PREFS_KEY)
    }
}