//variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');

//listeners
cargarEventListener();

function cargarEventListener() {
    //dispara el evento cuando se presiona "Agregar Carrito"
    cursos.addEventListener('click', comprarCurso);
}

//funciones
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
    console.log(curso);
}