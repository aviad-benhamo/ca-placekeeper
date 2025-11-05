'use strict'

function onInit() {
    const userPrefs = userService.load()

    if (userPrefs) {
        document.body.style.backgroundColor = userPrefs.bgColor
        document.body.style.color = userPrefs.txtColor
    }
}


function onSubmit(ev) {
    ev.preventDefault()
    const formData = new FormData(ev.target)
    const data = Object.fromEntries(formData.entries())
    userService.save(data)
}

function showAge(newVal) {
    document.getElementById("sAge").innerHTML = newVal

    document.getElementById("age").title = newVal
}