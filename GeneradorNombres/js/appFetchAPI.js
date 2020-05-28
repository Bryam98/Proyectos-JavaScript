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

    //crear fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const nombres = data.results;
            let htmlNombres = '<h2>Nombres Generados</h2>';
            htmlNombres += '<ul class="lista">';

            nombres.forEach(nombre => {
                htmlNombres += `
                    <li> ${nombre.name.first} </li>
                `;
            });

            htmlNombres += '</ul>'
            document.getElementById('resultado').innerHTML = htmlNombres;
        })
        .catch(error => console.log(error));
}