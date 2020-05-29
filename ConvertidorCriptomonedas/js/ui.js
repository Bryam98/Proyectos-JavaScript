class Interfaz {

    constructor() {
        this.init();
    }

    init() {
        this.construirSelect();
    }

    construirSelect() {
        cotizador.obtenerMonedasAPI()
            .then(monedas => {
                //crear un select de opciones
                const select = document.querySelector('#criptomoneda');
                //iterar con los resultados de la API
                for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                    //añadir symbol y nombre como opciones del select
                    const option = document.createElement('option');
                    option.value = value.Symbol;
                    option.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(option);
                }
            });
    }

    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        //seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);
        //mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    //imprime el resultado de la cotización
    mostrarResultado(resultado, moneda, crypto) {
        //en caso de un resultado anterior ocultarlo
        const resultadoAnterior = document.querySelector('#resultado > div');
        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }

        const datosMoneda = resultado[crypto][moneda];

        //recortar digitos de precio
        let precio = datosMoneda.PRICE.toFixed(2),
            porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX');


        //construir template
        let templateHTML = `
			<div class="card bg-warning">
				<div class="card-body text-light">
					<h2 class="card-title">Resultado:</h2>
					<p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $${precio}</p>
					<p>Variación del último día: %${porcentaje}</p>
					<p>Última actualización: ${actualizado}</p>
				</div>
			</div>
		`;

        this.mostrarOcultarSpinner('block');
        //insertar el resultado
        setTimeout(() => {
            document.querySelector('#resultado').innerHTML = templateHTML;
            //ocultar el spinner
            this.mostrarOcultarSpinner('none');
        }, 3000);
    }

    //mostrar un spinner de carga al enviar la cotización
    mostrarOcultarSpinner(estado) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = estado;
    }
}