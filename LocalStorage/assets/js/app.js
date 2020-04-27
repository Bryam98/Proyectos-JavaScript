//--variables
const listaTweets = document.getElementById('lista-tweets');

//--event listeners
eventListeners();

function eventListeners() {
    //cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    //borrar tweets
    listaTweets.addEventListener('click', borrarTweet);
    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

//--funciones
//añadir tweet del formulario
function agregarTweet(e) {
    e.preventDefault();
    //leer el valor del textarea
    const tweet = document.getElementById('tweet').value;

    // crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //crear elemento y añadir el contenido a la lista
    const li = document.createElement('li');
    li.innerHTML = tweet;
    //añade el botón de borrar tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista
    listaTweets.appendChild(li);

    //Añadir a localStorage
    agregarTweetLocalStorage(tweet);
}

//eliminar el tweet del dom
function borrarTweet(e) {
    e.preventDefault();

    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

//mostrar datos de localstorage en la lista
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(tweet => {
        // crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //crear elemento y añadir el contenido a la lista
        const li = document.createElement('li');
        li.innerHTML = tweet;
        //añade el botón de borrar tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}

//agregar tweet a localStorage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //añadir el nuevo tweet
    tweets.push(tweet);
    //convertir de string a arreglo para localStorage
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//comprobar si hay o no elementos en localstorage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    //revisamos los valores del localStorage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//eliminar tweet del localstorage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;
    //elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();
    tweets.forEach((tweet, index) => {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}