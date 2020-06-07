let DB;

//selectores de la interfaz
const form = document.querySelector('form'),
    nombreMascota = document.querySelector('#mascota'),
    nombreCliente = document.querySelector('#cliente'),
    telefono = document.querySelector('#telefono'),
    fecha = document.querySelector('#fecha'),
    hora = document.querySelector('#hora'),
    sintomas = document.querySelector('#sintomas'),
    citas = document.querySelector('#citas'),
    headingAdministra = document.querySelector('#administra');

//esperar por el DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    //crear la base de datos
    let crearDB = window.indexedDB.open('citas', 1);
    //si hay un error enviarlo a la consola
    crearDB.onerror = function() {
        console.log('Hubo un error :c');
    };
    //si todo esta bien mostrar en consola, y asignar la base de datos
    crearDB.onsuccess = function() {
        //asignar a la base de datos
        DB = crearDB.result;

        mostrarCitas();
    };

    //este método sólo corre una vez y es ideal para crear el Schema de la BD
    crearDB.onupgradeneeded = function(e) {
        //El evento es la misma base de datos 
        let db = e.target.result;
        //definir el objetcstore, toma 2 parametro; el nombre de la base de datos y las opciones
        let objetcStore = db.createObjectStore('citas', {
            keyPath: 'key', //indice de la base de datos
            autoIncrement: true,
        });
        //crear los indices y campos de la base de datos, createIndex: 3 parametros, nombre, keypath y opciones
        objetcStore.createIndex('mascota', 'mascota', { unique: false });
        objetcStore.createIndex('cliente', 'cliente', { unique: false });
        objetcStore.createIndex('telefono', 'telefono', { unique: false });
        objetcStore.createIndex('fecha', 'fecha', { unique: false });
        objetcStore.createIndex('hora', 'hora', { unique: false });
        objetcStore.createIndex('sintomas', 'sintomas', { unique: false });
    };

    //cuando el formulario se envia
    form.addEventListener('submit', agregarDatos)

    function agregarDatos(e) {
        e.preventDefault();

        const nuevaCita = {
            mascota: nombreMascota.value,
            cliente: nombreCliente.value,
            telefono: telefono.value,
            fecha: fecha.value,
            hora: hora.value,
            sintomas: sintomas.value
        }

        //en IndexeddDB se utilizan las transacciones
        let transaction = DB.transaction(['citas'], 'readwrite');
        let objectStore = transaction.objectStore('citas');
        let peticion = objectStore.add(nuevaCita);

        console.log(peticion);
        peticion.onsuccess = () => {
            form.reset();
        }
        transaction.oncomplete = () => {
            console.log('Cita agregada');
            mostrarCitas();
        }
        transaction.onerror = () => {
            console.log('Hubo un error');
        }
    };

    function mostrarCitas() {
        //limpiar las citas anteriores
        while (citas.firstChild) {
            citas.removeChild(citas.firstChild);
        }

        //creamos un objectStore
        let objectStore = DB.transaction('citas').objectStore('citas');
        //esto retorna una petición
        objectStore.openCursor().onsuccess = function(e) {
            //cursos se va a ubicar en el registro indicado, para acceder a los datos
            let cursor = e.target.result;

            if (cursor) {
                let citaHTML = document.createElement('li');
                citaHTML.setAttribute('data-cita-id', cursor.value.key);
                citaHTML.classList.add('list-group-item');
                citaHTML.innerHTML = `
                    <p class="font-weight-bold">Mascota: 
                        <span class="font-weight-normal">${cursor.value.mascota}</span>
                    </p>
                    <p class="font-weight-bold">Cliente: 
                        <span class="font-weight-normal">${cursor.value.cliente}</span>
                    </p>
                    <p class="font-weight-bold">Teléfono: 
                        <span class="font-weight-normal">${cursor.value.telefono}</span>
                    </p>
                    <p class="font-weight-bold">Fecha: 
                        <span class="font-weight-normal">${cursor.value.fecha}</span>
                    </p>
                    <p class="font-weight-bold">Hora: 
                        <span class="font-weight-normal">${cursor.value.hora}</span>
                    </p>
                    <p class="font-weight-bold">Sintomas: 
                        <span class="font-weight-normal">${cursor.value.sintomas}</span>
                    </p>
                `;
                //boton de borrar
                const btnBorrar = document.createElement('button');
                btnBorrar.classList.add('borrar', 'btn', 'btn-danger');
                btnBorrar.innerHTML = '<span aria-hidden="true">x</span> Borrar';
                btnBorrar.onclick = borrarCita;
                citaHTML.appendChild(btnBorrar);

                //append en el padre
                citas.appendChild(citaHTML);
                //consultar los próximos registros
                cursor.continue();
            } else {
                if (!citas.firstChild) {
                    //cuando no hay registros
                    headingAdministra.textContent = 'Agrega citas para comenzar';
                    let listado = document.createElement('p');
                    listado.classList.add('text-center');
                    listado.textContent = 'No hay registros';
                    citas.appendChild(listado);
                } else {
                    headingAdministra.textContent = 'Administra tus citas';
                }
            }
        }
    }


    function borrarCita(e) {
        let citaID = Number(e.target.parentElement.getAttribute('data-cita-id'));

        //en IndexeddDB se utilizan las transacciones
        let transaction = DB.transaction(['citas'], 'readwrite');
        let objectStore = transaction.objectStore('citas');
        let peticion = objectStore.delete(citaID);

        transaction.oncomplete = () => {
            e.target.parentElement.parentElement.removeChild(e.target.parentElement);
            console.log(`Se elimino la cita con el ID: ${citaID}`);

            if (!citas.firstChild) {
                //cuando no hay registros
                headingAdministra.textContent = 'Agrega citas para comenzar';
                let listado = document.createElement('p');
                listado.classList.add('text-center');
                listado.textContent = 'No hay registros';
                citas.appendChild(listado);
            } else {
                headingAdministra.textContent = 'Administra tus citas';
            }
        }
    }

});