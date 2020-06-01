class Interfaz {

    constructor() {
        //inicializa la app al instanciar
        this.init();
        //leer el resultado
        this.listado = document.getElementById('resultado-eventos');
    }

    //metodo para cuando inicialice la app
    init() {

    }

    //imprimir categorias
    imprimirCategorias() {
        const listaCategorias = eventBrite.obtenerCategorias()
            .then(categorias => {
                const cats = categorias.categorias.categories;
                //seleccionar el select de categorias
                const selectCategoria = document.getElementById('listado-categorias');
                //recorremos el arreglo e imprimimos los <option>
                cats.forEach(cat => {
                    const option = document.createElement('option');
                    option.value = cat.id;
                    option.appendChild(document.createTextNode(cat.name_localized));
                    selectCategoria.appendChild(option);
                });
            });
    }

    //lee la respuesta de la API e imprime los resultados
    mostrarEventos(eventos) {
        //leer los eventos y agregarlos a una variable
        const listaEventos = eventos.events;
        //recorrer los eventos y crear su template
        listaEventos.forEach(evento => {
            this.listado.innerHTML += `
                <div class="col-md-4 mb-4> 
                    <div class="card">
                        <img class="img-fluid mb-2" src"${evento.logo !== null ? evento.logo.url : ''}">
                        <div class="card-body">
                            <div class="card-text">
                                <h2 class="text-center">${evento.name.text}</h2>
                                <p class="lead text-info">Información del evento</p>
                                <p>${evento.description.text.substring(0,280)}...</p>

                                <span class="badge badge-primary">Capacidad: ${evento.capacity}>
                                <span class="badge badge-secondary">Fecha y hora: ${evento.start.local}>
                                <a href="${evento.url}" target="_blank" class="btn btn-primary btn-block mt-4">Comprar Boletos</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    //limpia los resultados previos
    limpiarResultado() {
        this.listado.innerHTML = '';
    }

    //método para imprimir mensajes, 2 parámetros, mensaje y clases
    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.classList = clases;
        //agregar texto
        div.appendChild(document.createTextNode(mensaje));
        //buscar un padre
        const buscadorDiv = document.querySelector('#buscador');
        buscadorDiv.appendChild(div);
        //quitar el alert después de tres segundos
        setTimeout(() => {
            this.limpiarMensaje();
        }, 3000);
    }

    //desaparece el msj en caso de que exista
    limpiarMensaje() {
        const alert = document.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }
}