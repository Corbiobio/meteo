const token = import.meta.env.VITE_APIKEY
const form = document.getElementById("form")
const champ = document.getElementById("champ")
const main = document.getElementById("main")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${champ.value}&appid=${token}`).then((req) => {
        return req.json()
    }).then((res) => {
        if (champ.value === "") {
            alert("enter a valid city")
        } else {

            let container = document.createElement("div")
            let trash = document.createElement("img")
            let city = document.createElement("p")
            let temp = document.createElement("div")
            let imgmeteo = document.createElement("img")
            let desc = document.createElement("p")

            main.appendChild(container)

            container.appendChild(trash)
            trash.src = "img/trash-can-regular.svg"
            trash.id = "trash"

            container.appendChild(city)
            city.textContent = res.name
            city.appendChild(document.createElement("sup"))
            city.lastChild.textContent = res.sys.country

            container.appendChild(temp)
            temp.classList = "temperature"
            temp.innerHTML = `${res.wind.deg / 10}<sup>°C</sup>`

            container.appendChild(imgmeteo)
            imgmeteo.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`

            container.appendChild(desc)
            desc.classList = "description"
            desc.textContent = res.weather[0].description

            trash.addEventListener("click", () => {
                container.remove(container)
                champ.value = ""
            })
        }
    })
})




