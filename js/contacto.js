const formulario = document.querySelector('#enviar-mail');

// INPUT
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const asunto = document.querySelector('#asunto');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');

// Restricciones Email
const caracteresEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners(){
    // Input
    nombre.addEventListener('blur', validarFormulario);
    apellido.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    email.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    formulario.addEventListener('submit', enviarEmail);
}

// Funcion
function validarFormulario(e) {
    // Verificar campos vacios
    if(e.target.value.length>0) {
        // Input
        e.target.classList.remove('error');
        e.target.classList.add('validar');
    }else{
        // Input
        e.target.classList.add('error');
        e.target.classList.remove('validar');
        mostrarError("Todos los campos son obligatorios");
    }

    // Verificar email
    if(e.target.type === 'email') {
        if(caracteresEmail.test(e.target.value)){
            e.target.classList.remove('error');
            e.target.classList.add('validar');
        }else{
            e.target.classList.add('error');
            e.target.classList.remove('validar');
            mostrarError("Email no valido!");
        }
    }

    if(caracteresEmail.test(email.value) && asunto.value!=='' && mensaje.value!==''){
        Toastify({
            text: "Formulario completado exitosamente!",
            className: "info",
            newWindow: true,
            duration: 4000,
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #606c88, #3f4c6b)",
              color:"black",
            }
          }).showToast();
    }
}

// Errores
function mostrarError(mensaje){
    swal(`${mensaje}`, "", "error")
}

// Envio de email
function enviarEmail(e){
    e.preventDefault();

    setTimeout(() => {

        swal("Mensaje enviado!", "", "success");

        setTimeout(() => {
            resetearFormulario();
        }, 2500);

    }, 0);
}

// Reset Formulario
function resetearFormulario() {
    formulario.reset();
}