//variables
const presupuestoUsuario = prompt('¿Cuál es tu presupuesto Semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

//clases
//clase de presupuesto
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    //método para ir restado del presupuesto actual
    presupuestoRestante(cantidad = 0) { //se pasa un valor default
        return this.restante -= Number(cantidad);
    }
}

//clase de interfaz, maneja todo lo relacionado al HTML
class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //insertar al HTML
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.appendChild(document.createTextNode(mensaje));
        //insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        //quitar la alerta después de 3 segundos
        setTimeout(() => {
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }

    //inserta los gastos a la lista
    agregarGastoListado(nombreGasto, cantidadGasto) {
        const gastosListado = document.querySelector('#gastos ul');
        //crear li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        //insertar el gasto
        li.innerHTML = `${nombreGasto} : <span class="badge-primary badge-pill"> $${cantidadGasto} </span>`;
        //insertar al HTML
        gastosListado.appendChild(li);
    }

    //comprueba el presupuesto restante
    presupuestoRestante(cantidadGasto) {
        const restante = document.querySelector('span#restante');
        //leemos el presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidadGasto);

        restante.innerHTML = `${presupuestoRestanteUsuario}`;
        this.comprobarPresupuesto();
    }

    //cambia de color el presupuesot restante
    comprobarPresupuesto() {
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        //comprobar el 25% del gasto
        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if ((presupuestoTotal / 2) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}

//eventListeners
document.addEventListener('DOMContentLoaded', () => {
    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        //instanciar presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //instancia la clase interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    //leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    //instanciar la interfaz
    const ui = new Interfaz();

    //comprobar que los campos no esten vacios
    if (nombreGasto === '' || cantidadGasto === '') {
        //dos parametros: mensaje y tipo
        ui.imprimirMensaje('Hubo un error', 'error');
    } else {
        //insertar en el HTML
        ui.imprimirMensaje('Gasto agregado', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});