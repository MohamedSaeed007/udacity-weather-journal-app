/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = +d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
const APIKEY = "78eb78fae6d243ffedb0135f15aafa80";
const generate = document.getElementById('generate');
generate.addEventListener("click", async () => {
    const zip = document.getElementById("zip").value;
    const content = document.getElementById("feelings").value;
    getWeatherData(zip)
        .then(temp => {
            const obj = {
                date: newDate,
                temp,
                content
            }
            return sendToServer(obj);
        })
        .then(data => {
            updateUI(data);
        })
        .catch(err => console.log(err));
})

async function getWeatherData(zip) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${APIKEY}&units=metric`);
    const data = await res.json();
    const temp = data.main.temp;
    return temp;
}

async function sendToServer(obj) {
    await fetch("/saveData", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(obj)
    });

    const getData = await fetch("/getData", {
        credentials: "same-origin"
    });
    const data1 = getData.json();
    return data1;
}

function updateUI(data) {
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temp;
    document.getElementById('content').innerHTML = data.content;
}