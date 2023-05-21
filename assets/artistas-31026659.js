import"./carousel-f9d3c64f.js";import{R as c,_ as s,f as d,m as r,g as f,w as u,d as o}from"./firebase-5b2ff95b.js";const m=c(s(o,"artistas")),n=await d(m);let l=document.getElementById("artistas");n.forEach(t=>{let e=t.data(),a=t.id;l.innerHTML+=`
    <li class="">
        <img src="${e.foto}" alt="${e.nombre}" class="">
    
        <div class="flex-1 flex flex-col">
          <span>${e.nombres}</span>  
          <span class="text-sm text-pink-600">${e.pais} | ${e.genero}</span>  

        </div>

        <div id="tareas">
          <a href="editar-artista.html?id=${a}" >Editar</a>
          <a data-doc="${a}" id="eliminar" href="#">Eliminar</a>
        </div> 
    </li>`});n.size==0&&(l.innerHTML=`
    <li class="">
        <div class="flex-1 text-center flex flex-col">
          <span>No hay artistas</span>
        </div>
    </li>`);const p=document.querySelectorAll("#eliminar");p.forEach(t=>{t.addEventListener("click",h)});function h(t){t.preventDefault(),Swal.fire({title:"¿Estas seguro?",text:"Una vez eliminado, no podras recuperar este artista",icon:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Si, borrar!",cancelButtonText:"No, cancelar!",closeOnConfirm:!1,closeOnCancel:!1}).then(e=>{if(e.isConfirmed){const a=t.target.dataset.doc,i=r(o,"artistas",a);f(i).then(()=>{Swal.fire({title:"Eliminado!",text:"El artista ha sido eliminado.",icon:"success"}).then(()=>{window.location.href="artistas.html"})})}})}const w=document.getElementById("crear");w.addEventListener("click",g);function g(){Swal.fire({title:"Crear artista",html:`
      <input id="nombre" class="swal2-input" placeholder="Nombre">
      <input id="pais" class="swal2-input" placeholder="Pais">
      <input id="genero" class="swal2-input" placeholder="Genero">
      <input id="foto" class="swal2-input" placeholder="Foto">
    `,confirmButtonText:"Crear",focusConfirm:!1,preConfirm:()=>{const t=Swal.getPopup().querySelector("#nombre").value,e=Swal.getPopup().querySelector("#pais").value,a=Swal.getPopup().querySelector("#genero").value,i=Swal.getPopup().querySelector("#foto").value;return(!t||!e||!a||!i)&&Swal.showValidationMessage("Por favor, llena todos los campos"),{nombre:t,pais:e,genero:a,foto:i}}}).then(t=>{t.isConfirmed&&v(t.value)})}function v(t){const e=r(s(o,"artistas"));u(e,t).then(()=>{Swal.fire({title:"Creado!",text:"El artista ha sido creado.",icon:"success"}).then(()=>{window.location.href="artistas.html"})})}
