//instanciar ambas clases
const eventBrite = new EventBrite();
const ui = new Interfaz();

//listener al buscador
document.getElementById('buscarBtn').addEventListener('click', (e) => {
    e.preventDefault();
    //leer el texto del input a buscar
    const textoBuscador = document.getElementById('evento').value;
    //leer el select
    const categorias = document.getElementById('listado-categorias');
    const categoriaSeleccionada = categorias.options[categorias.selectedIndex].value;
    //revisar que haya algo escrito en el buscador
    if (textoBuscador !== '') {
        //cuando si hay una busqueda
        eventBrite.obtenerEventos(textoBuscador, categoriaSeleccionada)
            .then(data => {
                if (data.eventos.events.length > 0) {
                    //limpiar resultados anteriores
                    limpiarResultado();
                    //si hay eventos, mostrar el resultado
                    ui.mostrarEventos(data.eventos);
                } else {
                    //no hay eventos, enviar una alerta
                    ui.mostrarMensaje('No hay resultados', 'alert alert-danger mt-4 text-center');
                }
            });
    } else {
        //mostrar mensaje para que imprima algo
        ui.mostrarMensaje('Escribe algo en el buscador', 'alert alert-danger mt-4 text-center');
    }
});