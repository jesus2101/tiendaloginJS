let canasta={};

document.addEventListener("DOMContentLoaded",()=>{


    const usuario=localStorage.getItem('usuario');
    const imagen=localStorage.getItem('imagen');

    if(!localStorage.getItem('usuario')){
        location.href="./index.html";
    }

    
    pintarUsuario(usuario,imagen);
    obtenerArticulos();
    if(localStorage.getItem('canasta')){

        canasta=JSON.parse(localStorage.getItem('canasta'));

        
        pintarCanasta();
    }
    
    });

document.getElementById('salir').addEventListener("click",()=>{

  localStorage.removeItem('usuario');
  localStorage.removeItem('imagen');
  localStorage.removeItem('canasta');

  location.href="./index.html";

})


    const pintarUsuario=(usu,img)=>{

        const imagen=document.querySelector(".usuario img");
        const nombre=document.querySelector(".usuario h3");

        imagen.setAttribute("src",img);
        nombre.textContent=usu;


    }
 
const obtenerArticulos= async ()=>{
    try {
        const res=await fetch("api.json");
        const data=await res.json();
        pintarProductos(data);
        detectarBotones(data);

    } catch (error) {
        console.log(error);
    }
};

const contenedorProductos=document.querySelector('#productos');


const pintarProductos=(data)=>{

    const template=document.querySelector('#templateProductos').content;
    const fragment=document.createDocumentFragment();

    data.forEach(producto=>{
       
        template.querySelector("img").setAttribute("src",producto.imagen);
        template.querySelector("h5").textContent=producto.articulo;
        template.querySelector("p span").textContent=producto.costo;
        template.querySelector("button").dataset.id=producto.id;
        const clone=template.cloneNode(true);
        fragment.appendChild(clone);


    });

    contenedorProductos.appendChild(fragment);


};


const detectarBotones=(data)=>{

    const botones=document.querySelectorAll(".card button");

    botones.forEach(boton=>{

        boton.addEventListener("click",()=>{

            //console.log(boton.dataset.id);

            const producto=data.find(item=> item.id===parseInt(boton.dataset.id));
            producto.cantidad=1;
            if(canasta.hasOwnProperty(producto.id)){
                  producto.cantidad=canasta[producto.id].cantidad+1;
            }
            canasta[producto.id]={...producto};
            //console.log(canasta);
            pintarCanasta();
        });
    });

}
const items=document.querySelector("#items");
const pintarCanasta=()=>{
    items.innerHTML="";
    const fragment=document.createDocumentFragment();
    const template=document.querySelector("#template-canasta").content;
    Object.values(canasta).forEach(producto=>{

        template.querySelector('th').textContent=producto.id;
        template.querySelectorAll('td')[0].textContent=producto.articulo;
        template.querySelectorAll('td')[1].textContent=producto.cantidad;
        template.querySelector('span').textContent=producto.costo*producto.cantidad;
        template.querySelector('.btn-info').dataset.id=producto.id;
        template.querySelector('.btn-danger').dataset.id=producto.id;

        const clone=template.cloneNode(true);
        fragment.appendChild(clone);
       
    })
    items.appendChild(fragment);

    pintarFooter();
    accionesBotones();
    localStorage.setItem('canasta',JSON.stringify(canasta));
};

const footer=document.querySelector("#footer-canasta");
const pintarFooter=()=>{
    footer.innerHTML="";
    if(Object.keys(canasta).length===0){
        footer.innerHTML=`
        <th scope="row" colspan="5">Canasta vacía!</th>
        `;

        return;
    }
    

    const fragment=document.createDocumentFragment();
    const template=document.querySelector("#template-footer").content;
    
    const nCantidad =Object.values(canasta).reduce((acc,{cantidad})=>acc+cantidad,0)
    const ncosto=Object.values(canasta).reduce((acc,{cantidad,costo})=>acc+cantidad*costo,0);

    template.querySelectorAll('td')[0].textContent=nCantidad;
    template.querySelector('span').textContent=ncosto;
    
    const clone=template.cloneNode(true);
    fragment.appendChild(clone);

    footer.appendChild(fragment);

    const boton=document.querySelector("#vaciar-canasta");
    boton.addEventListener("click",()=>{
           canasta={};
           pintarCanasta();
    });

}

const accionesBotones=()=>{

    const botonesagregar=document.querySelectorAll('#items .btn-info');

    const botoneseliminar=document.querySelectorAll('#items .btn-danger');

    botonesagregar.forEach(btn=>{
        
        btn.addEventListener('click',()=>{
            const producto=canasta[btn.dataset.id];
            producto.cantidad++;
            canasta[btn.dataset.id]={...producto};
            pintarCanasta();     
        });
    });

    botoneseliminar.forEach(btn=>{

        btn.addEventListener('click',()=>{
            const producto=canasta[btn.dataset.id];
       producto.cantidad--;
       if(producto.cantidad===0){
         delete canasta[btn.dataset.id];
         pintarCanasta();
       }else{
        canasta[btn.dataset.id]={...producto};
       pintarCanasta();

       }    
        });
        
       
    });

}



