//-- Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//-- Listeners
cargarEventListener();

function cargarEventListener() {
    //dispara el evento cuando se presiona "Agregar Carrito"
    cursos.addEventListener('click', comprarCurso);
    //cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    //vaciar todo el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    //al cargar el documento mostrar localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

//-- Funciones a utilizar
//función que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();

    //delegation para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        //enviamos el curso seleccionado para tomar sus datose
        leerDatosCurso(curso);
    }
}

//lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
}

//muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100px">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;

    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

//elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso, cursoID;
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoID = curso.querySelector('a').getAttribute('data-id');
    }

    eliminarCursoLocalStorage(cursoID);
}

//elimina los cursos del carrito en el DOM
function vaciarCarrito(e) {
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
    //vaciar localStorage
    vaciarLocalStorage();
    return false;
}

//almacena cursos en el carrito a localStorage
function guardarCursoLocalStorage(curso) {
    let cursos;
    //toma el valor de un arrego con datos del LS o vacio
    cursos = obtenerCursosLocalStorage();
    //el curso seleccionado se agrega al arreglo
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

//comprueba que haya elementos en el localStorage
function obtenerCursosLocalStorage() {
    let cursosLS;
    //comprobamos si hay algo en el localStorage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS;
}

//imprime los cursos del LS en el carrito
function leerLocalStorage() {
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(curso => {
        //construir el template 
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100px">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;

        listaCursos.appendChild(row);
    });
}

//elimina el curso por el ID en el local storage
function eliminarCursoLocalStorage(curso) {
    let cursosLS;
    //obtenemos el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    //iteramos comparando el ID del curso borrado con los del LS
    cursosLS.forEach((cursoLS, index) => {
        if (cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });

    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//elimina todos los cursos del LocalStorage
function vaciarLocalStorage() {
    localStorage.clear();
}