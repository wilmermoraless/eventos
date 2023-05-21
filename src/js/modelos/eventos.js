/* //Importar firebase y su configuracion
import {db} from '../firebase';

//Importar getFirestore para leer la base de datos
import { collection, query, getDocs} from 'firebase/firestore';

//Leer la coleccion de eventos
const eventos = query(collection(db, "eventos"));

//Leer los documentos de la coleccion de forma asincrona
const querySnapshot = await getDocs(eventos);

let eventos_contenedor = document.getElementById('eventos');

querySnapshot.forEach((doc) => {
  let evento = doc.data()
    eventos_contenedor.innerHTML += `<li>
    <div class="w-80 h-full mx-auto   bg-white  mb-10 pb-2 rounded-md">
    <div class="">
        <img src="${evento.imagen}" alt="${evento.nombre}" class="h-50 rounded-md mx-auto pt-4 pl-4 pr-4 ">
       
        </div>
        <div class="mt-4">
        <div class="text-center pb-2"> ${evento.nombre} </div> 
        <div class="text-center mb-2"> ${evento.descripcion} </div>
        <div class="text-left absolute ml-4 mb-8"> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
</svg>
</div>
        <div class="text-left absolute ml-12 ">  ${evento.tipoDeEvento} </div>
        <div class="text-right mr-4 pb-2">${evento.fecha} - ${evento.hora} </div>
        
        </div>
        </div>
        <div class="pb-6"></div>
    </li>`;
});  */     
//Importar firebase y su configuracion
import {db} from '../firebase';

//Importar getFirestore para leer la base de datos
import { doc,collection, setDoc, query, deleteDoc, getDocs} from 'firebase/firestore';

//Leer la coleccion de eventos
const eventos = query(collection(db, "eventos"));

//Leer los documentos de la coleccion de forma asincrona
const querySnapshot = await getDocs(eventos);

let eventos_contenedor = document.getElementById('eventos');

querySnapshot.forEach((doc) => {
  let evento = doc.data()
  let id = doc.id;
  
  eventos_contenedor.innerHTML += `
    <li class="">
        <img src="${evento.imagen}" alt="${evento.nombre}" class="">
    
        <div class="flex-1 flex flex-col">
          <span>${evento.nombre}</span>  
          <span class="text-sm text-pink-600">${evento.descripcion} | ${evento.fecha} </span>  

        </div>

        <div id="tareas">
          <a href="editar-evento.html?id=${id}" >Editar</a>
          <a data-doc="${id}" id="eliminar" href="#">Eliminar</a>
        </div> 
    </li>`;
});

if(querySnapshot.size == 0){
  eventos_contenedor.innerHTML = `
    <li class="">
        <div class="flex-1 text-center flex flex-col">
          <span>No hay eventos</span>
        </div>
    </li>`;
}



//Agregar el evento click a todos los botones de eliminar
const eliminar = document.querySelectorAll('#eliminar');

eliminar.forEach((item) => {
  item.addEventListener('click', eliminarEvento);
});

//Function to delete artist
function eliminarEvento(e){
  //Prevent the default action
  e.preventDefault();

  //Usar sweetalert para confirmar la accion
  Swal.fire({
    title: "¿Estas seguro?",
    text: "Una vez eliminado, no podras recuperar este artista",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Si, borrar!',
    cancelButtonText: "No, cancelar!",
    closeOnConfirm: false,
    closeOnCancel: false
  })
  .then((result) => {
    //Si el usuario confirma
    if (result.isConfirmed) {
      //Buscar el id del eventos a eliminar
      const id = e.target.dataset.doc;  
      
      //Buscar el documento en la coleccion
      const docRef = doc(db, "eventos", id);

      //Eliminar el documento
      deleteDoc(docRef)
      .then(() => {
        //Mostar un mensaje de confirmacion
        Swal.fire({
          title: "Eliminado!",
          text: "El evento ha sido eliminado.",
          icon: "success",
        })
        .then(() => {
          //Redireccionar a eventos.html
          window.location.href = "eventos.html";
        })
      })
    }
  })
}

//Agregar el evento click al boton de crear un evento
const btnCrear = document.getElementById('crear');

btnCrear.addEventListener('click', crearEvento);

function crearEvento(){
  Swal.fire({
    title: 'Crear evento',
    html: `
      <input id="nombre" class="swal2-input" placeholder="Nombre">
      <input id="imagen" class="swal2-input" placeholder="imagen">
      <input id="fecha" class="swal2-input" placeholder="fecha">
      <input id="hora" class="swal2-input" placeholder="hora">
    `,
    confirmButtonText: 'Crear',
    focusConfirm: false,
    preConfirm: () => {
      const nombre = Swal.getPopup().querySelector('#nombre').value;
      const imagen = Swal.getPopup().querySelector('#imagen').value;
      const fecha = Swal.getPopup().querySelector('#fecha').value;
      const hora = Swal.getPopup().querySelector('#hora').value;
      if (!nombre || !imagen || !fecha || !hora) {
        Swal.showValidationMessage(`Por favor, llena todos los campos`)
      }
      return { nombre: nombre, imagen: imagen, fecha: fecha, hora: hora }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      //Agregar el evento a la base de datos
      addEvent(result.value);
    }
  })
}

//Funcion para agregar un evento en la base de datos
function addEvent(evento){
  //Agregar un nuevo documento con un ID aleatorio en la coleccion de evento
  const docRef = doc(collection(db, "eventos"));

  //Definit el objeto que se va a guardar en la base de datos
  setDoc(docRef, evento)
  .then(() => {
    //Mostrar un mensaje de exito
    Swal.fire({
      title: "Creado!",
      text: "El evento ha sido creado.",
      icon: "success",
    })
    .then(() => {
      //Redireccionar a artistas.html
      window.location.href = "eventos.html";
    })
  })
}                                           