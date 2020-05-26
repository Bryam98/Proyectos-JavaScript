document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

//llamado a AJAX e imprimir resultados
function cargarNombres(e) {
    e.preventDefault();

    //leer las variables
    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const cantidad = document.getElementById('numero').value;

    let url = '';
    url += 'https://randomuser.me/api/?';

    //si hay origen agregarlo a la URL
    if (origenSeleccionado != '') {
        url += `nat=${origenSeleccionado}&`;
    }
    //si hay un genero seleccionado
    if (generoSeleccionado != '') {
        url += `gender=${generoSeleccionado}&`;
    }
    //si hay una cantidad especificada
    if (cantidad != '') {
        url += `results=${cantidad}`;
    }

    //conectar con AJAX
    //iniciar XMLHTTPRequest
    const xhr = new XMLHttpRequest();
    //abrimos la conexión
    xhr.open('GET', url, true);
    //datos e impresión del template
    xhr.onload = function() {
        if (this.status === 200) {
            const respuesta = JSON.parse(this.responseText);
            const nombres = respuesta.results;

            //general el HTML
            let htmlNombres = '<h2>Nombres Generados</h2>';
            htmlNombres += '<ul class="lista">';

            //imprimir cada nombre
            nombres.forEach(nombre => {
                htmlNombres += `
            		<li>${nombre.name.first}</li>
            	`;
            });

            htmlNombres += '</ul>'
            document.getElementById('resultado').innerHTML = htmlNombres;
        }
    };
    //enviar el request
    xhr.send();

}