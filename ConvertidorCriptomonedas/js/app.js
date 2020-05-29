//instancias de clase
const cotizador = new API('11109c6d60a8a33952de169816e241c1367a717c344c1d891ff74e8793d1eafd');
const ui = new Interfaz();

//leer el formulario
const formulario = document.querySelector('#formulario');
//eventListener
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    //leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    //leer la cryptomoneda seleccionada
    const criptoMonedaSelect = document.querySelector('#criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

    //comprbar que ambos campos tengan algo seleccionado
    if (monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
        //arrojar una alerta de error
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
    } else {
        //todo bien, consultar la API
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada);
            });
    }
});