document.addEventListener("DOMContentLoaded",()=>{
      

    if(localStorage.getItem('usuario')){
        location.href="./comercio.html";
    }
})


const datosUsuario=[{
    usuario:'yizus',
    password:'micontra1',
    imagen:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWM7KoQ-vzyLyqY3tr099NAgD54K1vc_E9ZQ&usqp=CAU'
}];

const formRegex = [
    {
        reGex: /^[A-Za-z0-9]+$/,
        validacion: 'Unicamente se aceptan numeros y letras.'
    }    
];


const formulario=document.getElementById("formulario");
const mensaje=document.getElementById("msj");


formulario.addEventListener("submit",(e)=>{

    e.preventDefault();
    const usuario=document.getElementById("usuario").value;
    const password=document.getElementById("password").value;
    validacion(usuario,password);

});



const validacion=(usuario,password)=>{
        
    if(usuario=="" || password==""){
       
        mensaje.innerHTML="El usuario y la contraseña son obligatorios";
        return;
        
    }else if (formRegex[0].reGex.test(usuario)===false || formRegex[0].reGex.test(password)===false) {
        mensaje.innerHTML=formRegex[0].validacion;
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


