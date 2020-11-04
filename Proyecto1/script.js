// ============================================================
//  Los datos del formulario son validados pero no son enviados
//  a ningun servidor (de ahí que el elemento form no incluya atributo action)
//
//  El evento submit de un formulario realiza de forma automática
//  el envío de los datos al servidor. Para detener ese comportamiento
//  debemos aplicar al evento el método preventDefault()
//    https://developer.mozilla.org/es/docs/Web/API/Event/preventDefault

//  En la validación de la clave se usa una expresión regula:
//  https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions

///////////////////////////////////////////////////////////////////////////////
//       Variables de acceso al DOM

const form = document.getElementById("form");
const usuario = document.getElementById("usuario");
const contraseña = document.getElementById("contraseña");

///////////////////////////////////////////////////////////////////////////////
//  Funciones auxiliares (Helpers)

function gestionaEnvio(e) {
  // Es una aplicación cliente (no se envían datos a nigún servidor)
  // Indica al evento que no detenga el envie de los datos
  e.preventDefault();

  console.log(e.target);

  // La accion a realizar depende del botón pulsado (Cancelar o Enviar)
  // NOTA:   e.target vd e.submitter
  //        El evento submit actúa sobre el formulario, por lo que
  //        e.target no te permite identificar el elemento dentro del formulario
  //        que originó el proceso de envio. Para identificarlo se requiere .submitter
  if (e.submitter.id == "cancelacion") {
    reiniciaFormulario();
  } else {
    // Se validan los datos introducidos en los campos
    validaEntradasNoVacias([usuario, contraseña]);
    validaClave(contraseña);
  }
}
/***************************************/

function reiniciaFormulario() {
  // Desactiva los estilos aplicados al validar las entradas
  document.querySelectorAll(".form__control").forEach((element) => {
    element.classList.remove("form__control--exito");
    element.classList.remove("form__control--error");
  });

  // Suprime los mensajes de error
  const errors = document.querySelectorAll("small");
  errors.forEach((e) => {
    e.innerHTML = "";
  });

  // Vacia los valores que hubiera en las entradas (input)
  form.reset();
}

/***************************************/

function validaEntradasNoVacias(entradasDOM) {
  entradasDOM.forEach((e) => {
    // Obtiene el valor de la entrada
    // Mediante .trim() se suprimen potenciales espacios circundantes
    const value = e.value.trim();

    if (value === "") {
      // Obtiene el nombre del elemento (que es el valor de su atributo id)
      // y lo convierte a mayúsculas para
      const idElement = e.id.toUpperCase();
      muestraEntradaIncorrecta(e, `${idElement} no puede estar vacío`);
    } else {
      muestraEntradaCorrecta(e);
    }
  });
}

function validaClave(claveDOM) {
  // Obtiene el valor de la entrada
  // Mediante .trim() se suprimen potenciales espacios circundantes

  const claveIntroducida = claveDOM.value.trim();

  if (claveIntroducida.length == 0) return;

  // Utiliza una expresión regular para establecer que patron
  // debe cumplir una entrada para que sea acepte como clave

  // La clave debe ser alfanumérica y de longitud mayor que 2
  const patronClave = /^[0-9A-Za-z]{3,}$/;

  // Se comprueba si la clave introducida se ajusta al patrón exigido

  if (patronClave.test(claveIntroducida)) {
    muestraEntradaCorrecta(claveDOM);
  } else {
    muestraEntradaIncorrecta(
      claveDOM,
      "La clave debe ser alfanumérica y de longitud mayor que 2"
    );
  }
}

/***************************************/

// Si la entrada es correcta se aplican estilos
// para indicar que lo es
// Se elimina tambien un potencial contenido mensaje de error
function muestraEntradaCorrecta(elementoDOM) {
  const elementoPadre = elementoDOM.parentNode;
  elementoPadre.classList.remove("form__control--error");
  elementoPadre.classList.add("form__control--exito");

  const mensajeDOM = elementoPadre.querySelector(".form__error-msg");
  mensajeDOM.innerHTML = "";
}

// Si la entrada es incorrecta se aplican estilos
// para indicar que lo es y se completa el mensaje
// con un texto msg aclaratorio del tipo de error.

function muestraEntradaIncorrecta(elementoDOM, msg) {
  const elementoPadre = elementoDOM.parentNode;

  elementoPadre.classList.remove("form__control--exito");
  elementoPadre.classList.add("form__control--error");

  const mensajeDOM = elementoPadre.querySelector(".form__error-msg");
  mensajeDOM.innerHTML = msg;
}

///////////////////////////////////////////////////////////////////////////////
//  Gestores de Eventos (Event Listeners)

form.addEventListener("submit", (e) => gestionaEnvio(e));
