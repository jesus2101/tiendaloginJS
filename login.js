document.addEventListener("DOMContentLoaded",()=>{
      

    if(localStorage.getItem('usuario')){
        location.href="./comercio.html";
    }
})


const datosUsuario=[{
    usuario:'jesus33',
    password:'micontra1',
    imagen:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWM7KoQ-vzyLyqY3tr099NAgD54K1vc_E9ZQ&usqp=CAU'
}];

const formRegex = [
    {
        reGex: /[0-9A-Za-z]/,
        validacion: 'Unicamente se aceptan numeros y letras.'
    }    
];


const formulario=document.getElementById("formulario");
const mensaje=document.getElementById("msj");


formulario.addEventListener("submit",(e)=>{

    e.preventDefault();
    let usuario=document.getElementById("usuario").value;
    let password=document.getElementById("password").value;
    validacion(usuario,password);

});



const validacion=()=>{

    let usuario=document.getElementById("usuario").value;
    let password=document.getElementById("password").value;
    
    if(usuario=="" || password==""){
       
        mensaje.innerHTML="El usuario y la contraseña son obligatorios";
        return;
        
    }else if (formRegex[0].reGex.test(usuario)===false || formRegex[0].reGex.test(password)===false) {
        mensaje.innerHTML="El usuario y la contraseña solo aceptan números y letras";
       return;

    }else if(usuario!=datosUsuario[0].usuario || password!=datosUsuario[0].password){
        mensaje.innerHTML="Usuario o contraseña incorrecto";
        return;
    }
    else{
        localStorage.setItem('usuario',datosUsuario[0].usuario);
        localStorage.setItem('imagen',datosUsuario[0].imagen);
        location.href="./comercio.html";
    }
}


