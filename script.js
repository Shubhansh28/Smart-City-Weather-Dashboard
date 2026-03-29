const apiKey = "0f19f4e2c17f45378a58baa024fb3369"
let btn = document.getElementById('btn')
let area = "pune"
let place = document.getElementById('input_place')
let dataDisplay = document.getElementById('root')
btn.addEventListener('click',()=>{
    area = place.value
    place.value = ""
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${area}&appid=${apiKey}`).then(
        (res)=>{
            if (!res.ok){
                throw new Error ("could't able to fetch data")
            }
            return res.json()
        }).then((res)=>{
            // dataDisplay.innerHTML = `<p>${res.main.temp}</p>
            // <p>${res.main.feels_like}</p><p>${res.main.temp_min}</p>
            // <p>${res.main.temp_max}</p><p>${res.main.pressure}</p>
            // <p>${res.main.humidity}</p><p>${res.main.sea_level}</p>
            // <p>${res.main.grnd_level}</p><p>${res.visibility}</p>
            // <p>${res.wind}</p>`
            let keys = Object.keys(res)
            keys.forEach((el)=>{
                if (el=="weather") {
                    for (items in res[el][0]){
                        console.log(`${items} ==> ${res[el][0][items]}`)
                        dataDisplay.innerHTML+=`<p>${items} ==> ${res[el][0][items]}</p>`
                    }
                }
                else if (typeof(res[el])==="object") {
                    for (val in res[el]) {
                        console.log(`${val} ==> ${res[el][val]}`)
                        dataDisplay.innerHTML+=`<p>${val} ==> ${res[el][val]}</p>`
                    }
                }
                else{
                    console.log(`${el} ==> ${res[el]}`)
                    dataDisplay.innerHTML+=`<p>${el} ==> ${res[el]}</p>`
                }
            })
            // console.log(keys)
        })
    // console.log(area)
})

place.addEventListener("keydown",(event)=>{
    if (event.key == "Enter") {
        btn.click()
    }
})



