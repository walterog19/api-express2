

const loadTweets = () => {


    const url = '/api/tweets';
    fetch(url)
        .then(response => response.json())
        .then(json => {

            const tweets = json.items[0].tweets;
            let texto = [];
            tweets.map(t => texto.push(t.user.name + "<br/>" + t.text + "<br>" + t.createdAt));
            document.getElementById('tweets').innerHTML = texto;



        })
        .catch(error => alert('No se pudo cargar los datos error:' + error));

}


const loadWeather = () => {


    const url = 'https://twitter-walrog.herokuapp.com/api/weather/Pereira';
    fetch(url)
        .then(response => response.json())
        .then(json => {

            const weather = json.items[0].weather;
            
            document.getElementById('weather').innerHTML = 'El clima actual es:'+weather+' grados';



        })
        .catch(error => alert('No se pudo cargar los datos del clima error:' + error));

}


async function postData(url = '', data = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}



const createUser = () => {
    const url = 'https://twitter-walrog.herokuapp.com/api/users/';

    var dataUser = {
        name: document.getElementById('name').value,
        username: document.getElementById('uname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('psw').value,
        passwordConfirmation: document.getElementById('pswr').value
    };


    postData(url, dataUser)
        .then(data => {
            if (data.success){
                alert("El usuario "+data.username+" se guardo correctamente!"); // JSON data parsed by `data.json()` call
            }else{
                alert(data.message);
            }
        })
        .catch(error => alert('No se pudo guardar el usuario:' + error));


}

