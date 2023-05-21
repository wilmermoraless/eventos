import"./carousel-f9d3c64f.js";import{R as c,_ as i,f as d,m as l,g as f,w as m,d as o}from"./firebase-5b2ff95b.js";const u=c(i(o,"eventos")),r=await d(u);let s=document.getElementById("eventos");r.forEach(e=>{let t=e.data(),a=e.id;s.innerHTML+=`
    <li class="">
        <img src="${t.imagen}" alt="${t.nombre}" class="">
    
        <div class="flex-1 flex flex-col">
          <span>${t.nombre}</span>  
          <span class="text-sm text-pink-600">${t.descripcion} | ${t.fecha} </span>  

        </div>

        <div id="tareas">
          <a href="editar-evento.html?id=${a}" >Editar</a>
          <a data-doc="${a}" id="eliminar" href="#">Eliminar</a>
        </div> 
    </li>`});r.size==0&&(s.innerHTML=`
    <li class="">
        <div class="flex-1 text-center flex flex-col">
          <span>No hay eventos</span>
        </div>
    </li>`);const h=document.querySelectorAll("#eliminar");h.forEach(e=>{e.addEventListener("click",p)});function p(e){e.preventDefault(),Swal.fire({title:"¿Estas seguro?",text:"Una vez eliminado, no podras recuperar este artista",icon:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Si, borrar!",cancelButtonText:"No, cancelar!",closeOnConfirm:!1,closeOnCancel:!1}).then(t=>{if(t.isConfirmed){const a=e.target.dataset.doc,n=l(o,"eventos",a);f(n).then(()=>{Swal.fire({title:"Eliminado!",text:"El evento ha sido eliminado.",icon:"success"}).then(()=>{window.location.href="eventos.html"})})}})}const v=document.getElementById("crear");v.addEventListener("click",w);function w(){Swal.fire({title:"Crear evento",html:`
      <input id="nombre" class="swal2-input" placeholder="Nombre">
      <input id="imagen" class="swal2-input" placeholder="imagen">
      <input id="fecha" class="swal2-input" placeholder="fecha">
      <input id="hora" class="swal2-input" placeholder="hora">
    `,confirmButtonText:"Crear",focusConfirm:!1,preConfirm:()=>{const e=Swal.getPopup().querySelector("#nombre").value,t=Swal.getPopup().querySelector("#imagen").value,a=Swal.getPopup().querySelector("#fecha").value,n=Swal.getPopup().querySelector("#hora").value;return(!e||!t||!a||!n)&&Swal.showValidationMessage("Por favor, llena todos los campos"),{nombre:e,imagen:t,fecha:a,hora:n}}}).then(e=>{e.isConfirmed&&g(e.value)})}function g(e){const t=l(i(o,"eventos"));m(t,e).then(()=>{Swal.fire({title:"Creado!",text:"El evento ha sido creado.",icon:"success"}).then(()=>{window.location.href="eventos.html"})})}
