document.getElementById('txtBtn').addEventListener('click', cargarTXT);
document.getElementById('jsonBtn').addEventListener('click', cargarJSON);
document.getElementById('apiBtn').addEventListener('click', cargarREST);

function cargarTXT() {
    fetch('datos.txt')
        .then((response) => { //se conecta y trae la información
            return response.text();
        })
        .then((data) => { //en este then ya se tienen los datos
            document.getElementById('resultado').innerHTML = data;
        })
        .catch(error => console.log(error));
}

function cargarJSON() {
    fetch('empleados.json')
        .then((response) => { //se conecta y trae la información
            return response.json();
        })
        .then((data) => { //en este then ya se tienen los datos
            let html = '';
            data.forEach(datas => {
                html += `
					<li>Nombre: ${datas.nombre} | Puesto: ${datas.puesto}</li>
				`;
            });
            document.getElementById('resultado').innerHTML = html;
        })
        .catch(error => console.log(error));
}

function cargarREST() {
    fetch('https://picsum.photos/list')
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(imagen => {
                html += `
					<li>
						<a target="_blank" href="${imagen.post_url}">Ver imagen..</a>
						${imagen.author}
					</li>
				`;
            });
            document.getElementById('resultado').innerHTML = html;
        })
}