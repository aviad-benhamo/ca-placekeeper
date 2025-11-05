'use strict'

function onInit() {
    const userPrefs = userService.load() //

    if (userPrefs) {
        document.body.style.backgroundColor = userPrefs.bgColor
        document.body.style.color = userPrefs.txtColor
    }
}

