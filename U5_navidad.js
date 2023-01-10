
const NOMBRE_MASCOTA= document.getElementById("nombreMascota");
const FECHA_NACIMIENTO= document.getElementById("fechaNacimiento");
const RAZA= document.getElementById("raza");
const DESCRIPCION= document.getElementById("descripcion");
const NOMBRE= document.getElementById("nombre");
const LOCALIDAD= document.getElementById("localidad");
const CP= document.getElementById("codigoPostal");
const TIPO_VIA= document.getElementById("tipoVia");
const NOMBRE_VIA= document.getElementById("nombreVia");
const NUMERO= document.getElementById("numero");
const botonOculto= document.getElementById("botonOculto");
const FORMULARIO= document.getElementById("formulario");

const regexNombre= /(?=^[A-Z][a-z]{2,}(\s[A-Z][a-z]{2,}){2}$)(?=^.{3,30}$)/;
const regexLocalidad= /^[A-Z\s]{1,20}$/;
const regexCP= /^30\d{3}$/;
const regexTipoVia= /^(Avenida|Calle|Carretera|Vía)$/;
const regexNombreVia= /(?=^\w+(\s\w*)*$)(?=^.{2,25}$)/;
const regexNumero= /^[1-9]\d?\d?$/;
const regexNombreMascota=/^[A-Z][a-z]{1,24}$/;
const regexFechaNacimiento=/^(([0]?[1-9]|[12]\d|3[01])-([0]?[1-9]|1[12])-(20[01]\d|202[0123]))$/;
const regexDescripcion=/^.{1,200}$/;
const regexRaza=/^[A-Z][a-z]*$/;

let arrayErrores=[];
let clientes=[];
let arrayElementos=[];

class Cliente{
    constructor(nombre, direccion, mascota){
        this.nombre=nombre;
        this.direccion=direccion;
        this.mascota=mascota;
    }
}

class Mascota{
    constructor(nombre,edad,raza,descripcion){
        this.nombre=nombre;
        this.edad=edad;
        this.raza=raza;
        this.descripcion=descripcion;
    }
}

class Direccion{
    constructor(tipoVia,nombreVia,numero,localidad,cp){
        this.tipoVia= tipoVia;
        this.nombreVia=nombreVia;
        this.numero=numero;
        this.localidad=localidad;
        this.cp=cp;
    }
}

function check(valor){
    return valor
}
function validarCampos(elemento,regex){
    
    elemento.addEventListener("input", ()=>{
        const isValid= regex.test(elemento.value);
        if(isValid){
            elemento.className= "valid";
            elemento.nextElementSibling.textContent="";
            elemento.nextElementSibling.className= "error";
        }else{
            elemento.className="invalid";
        }
    });
}

function validarFormulario(elemento,regex,mensaje){
    const isValid= regex.test(elemento.value);
    arrayElementos.push(elemento);
    if(!isValid){
        elemento.className= "invalid";
        elemento.nextElementSibling.textContent= mensaje;
        elemento.nextElementSibling.className= "error active"; 
        return false; 
    }else{
        elemento.className= "valid";
        elemento.nextElementSibling.textContent= "";
        elemento.nextElementSibling.className= "error";
        return true;
    }
}

validarCampos(NOMBRE_MASCOTA,regexNombreMascota);
validarCampos(FECHA_NACIMIENTO,regexFechaNacimiento);
validarCampos(RAZA,regexRaza);
validarCampos(DESCRIPCION,regexDescripcion);
validarCampos(NOMBRE,regexNombre);
validarCampos(LOCALIDAD,regexLocalidad);
validarCampos(CP,regexCP);
validarCampos(TIPO_VIA,regexTipoVia);
validarCampos(NOMBRE_VIA,regexNombreVia);
validarCampos(NUMERO,regexNumero);

document.getElementById("formulario").addEventListener("submit", (event) => {
    event.preventDefault();
    botonOculto.hidden=true;
    
    arrayErrores.push(validarFormulario(NOMBRE_MASCOTA,regexNombreMascota,"Longitud mínima 2 y máxima 25, comienzo por mayúscula"));
    arrayErrores.push(validarFormulario(FECHA_NACIMIENTO,regexFechaNacimiento,"dd-mm-aaaa"));
    arrayErrores.push(validarFormulario(RAZA,regexRaza,"Comienzo por mayúscula"));
    arrayErrores.push(validarFormulario(DESCRIPCION,regexDescripcion,"Máximo 200 carácteres"));
    arrayErrores.push(validarFormulario(NOMBRE,regexNombre,"<<Nombre Apellido1 Apellido2 >>"));
    arrayErrores.push(validarFormulario(LOCALIDAD,regexLocalidad,"Mayúsculas, longitud máxima 20"));
    arrayErrores.push(validarFormulario(CP,regexCP,"5 dígitos, 30xxx"));
    arrayErrores.push(validarFormulario(TIPO_VIA,regexTipoVia,"Avenida,Calle,Carretera,Vía"));
    arrayErrores.push(validarFormulario(NOMBRE_VIA,regexNombreVia,"Longitud mínima 1 y máxima 25"));
    arrayErrores.push(validarFormulario(NUMERO,regexNumero,"De 1 a 999"));
    
    if(arrayErrores.every(check)){
        arrayErrores.length=0;
        let direccion= new Direccion(TIPO_VIA.value,NOMBRE_VIA.value,NUMERO.value,LOCALIDAD.value,CP.value);
        let mascota= new Mascota(NOMBRE_MASCOTA.value,FECHA_NACIMIENTO.value,RAZA.value,DESCRIPCION.value);
        let cliente= new Cliente(NOMBRE.value,direccion,mascota);
        clientes.push(cliente);
        FORMULARIO.reset();
        arrayElementos.forEach(function(element){
            element.className="invalid";
        })
    }
    if(clientes.length!=0){
        const botones= document.getElementById("botones");
        botonOculto.hidden=false;
    }

    
});

botonOculto.addEventListener("click",()=>{
    let miVentana = window.open("","_blank", "width=400, height=250, resizable=no");
    
    clientes.forEach(function(element){
        
        miVentana.document.body.innerHTML+= `<div class="tabla"><table><tr><th>Nombre Cliente</th><th>Direccion</th><th>Mascota</th>
    </tr><tr><td>${element.nombre}</td><td><ul><li>${element.direccion.tipoVia}, ${element.direccion.nombreVia}, 
    ${element.direccion.numero}</li><li>${element.direccion.localidad}</li><li>${element.direccion.cp}</li></ul></td>
    <td><ul><li>Nombre: ${element.mascota.nombre}</li><li>F. Nacimiento: ${element.mascota.edad}</li>
    <li>Raza: ${element.mascota.raza}</li><li>Descripción: ${element.mascota.descripcion}</li></ul></td></tr></table></div>`;
    });
})





