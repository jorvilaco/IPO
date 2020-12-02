// PREAMBULO

// El premabulo tiene como cometido la identificación de la autoría del trabajo
// El nombre será mostrada en el elemento HTML #equipo de la página web
// Cada equipo debe actualizar la constante con el nombre del equipo
const nombreDelEquipoDeLaboratorio = "XXXXX";
document.getElementById("equipo").innerHTML = nombreDelEquipoDeLaboratorio;

// PROYECTO RESERVAS

// Variables

// Las variables asientos y espectaculo son las que determinan la reserva
//    a) El array asientos es un array de numeros que codifican su disponibilidad
//       (0= LIBRE, 1= OCUPADO o 2=SELLECCIONADO)
//    b) La cadena espectaculo almacena el nombre del espectaculo seleccionado
//  Ambas variables estan relacionadas con elementos en el DOM:
//     a) El elemento i-esmio del array asientos está relacionado con el elemento
//        .asiento en el DOM cuya atributo data-index es i.
//                 asiento[i]  <--->   <div class="asiento" data-index="i">
//    b) Los elementos DOM que representan espectaculos incluyen dos atributos data-*:
//         data-espectaculo (con el mombre del espectaculo)
//         data-precio (con el precio del especatáculo).
//                espectaculo="A"  <---> <input type="radio" name="espectaculos"
//                                        data-espectaculo="A" data-precio="10">
//
// Ambas variables están almacenados en localStorage con objeto de que la reserva
// pueda ser efectuada en varias sesiones.

let asientos = [];
let espectaculo = "";

// Variables de acceso a elementos en el DOM
const aforo = document.getElementById("aforo");
const contador = document.getElementById("contador");
const precioTotal = document.getElementById("precio");
const cancelar = document.getElementById("cancelar");
const pagar = document.getElementById("pagar");

const espectaculos = document.getElementsByName("espectaculos");

// Establece el tamaño del aforo (número de asientos en la sala)
const numeroTotalDeAsientos = 30;

// Constantes para identificar la disponibilidad de los asientos
const LIBRE = 0;
const OCUPADO = 1;
const SELECCIONADO = 2;

// Valores para el atributo class de los elementos (.asientos)
// Identifica los elementos en el DOM que representan un asiento.
// Adicionalmente, permite caracterizar la la disponibilidad del asiento

const valorClassDeAsientoLIBRE = "asiento";
const valorClassDeAsientoOCUPADO = "asiento asiento--ocupado";
const valorClassDeAsientoSELECCIONADO = "asiento asiento--seleccionado";

// Funciones auxiliares (helpers)

function comienzo() {
  function preparacion() {
    // Su comentido es garantizar que el almacen localStorage
    // incluye las variables asientos y espectaculo.

    const storageAsientos = JSON.parse(localStorage.getItem("asientos"));

    // Si en el almacen local lS (localStorage) no existe asientos
    // (o su longitud es cero), entonces se crea un array de
    // asiento con una distribución aleatoria y se almacena en LS

    if (storageAsientos == null || storageAsientos.length == 0) {
      // Funcion anónima que genera un valor libre u ocupado
      // de forma aleatoria según un umbral de decisión
      const disponibilidadALeatoria = (umbral) => (Math.random() <= umbral ? OCUPADO : LIBRE);
      // Mediante el operador de propagación (spread)
      //    https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Sintaxis_Spread
      // se genera un array [0,1,2, ...., numeroTotalDeAsientos]
      const arrayAux = [...Array(numeroTotalDeAsientos).keys()];
      // Obtiene un array de asientos con disponibilidad aleatoria
      asientos = arrayAux.map((e) => disponibilidadALeatoria(0.33));

      localStorage.setItem("asientos", JSON.stringify(asientos));
    }

    const storageEspectaculo = JSON.parse(localStorage.getItem("espectaculo"));

    // Si en el almacen local lS (localStorage) no existe espectaculo
    // entonces se escoge el primer espectaculo de la lista y se almacena en LS

    if (storageEspectaculo == null) {
      const primerEspectaculo = espectaculos[0];

      // El nombre del espectaculo se obtiene del valor del atributo data-espectaculo
      espectaculo = primerEspectaculo.dataset.espectaculo;

      localStorage.setItem("espectaculo", JSON.stringify(espectaculo));
    }
  }

  function generaAforoDOMSegunArrayAsientos() {
    // Añade los asientos al DOM a partir de la variable asientos
    let contenidoHTML = "";
    let clase = "";

    asientos.forEach((asiento, indice) => {
      switch (asiento) {
        case LIBRE:
          clase = valorClassDeAsientoLIBRE;
          break;
        case OCUPADO:
          clase = valorClassDeAsientoOCUPADO;
          break;
        case SELECCIONADO:
          clase = valorClassDeAsientoSELECCIONADO;
          break;
      }
      contenidoHTML += `<div class="${clase}" data-index="${indice}"></div>`;
    });
    aforo.innerHTML = contenidoHTML;
  }

  function marcaEspectaculoSeleccionado() {
    // Marca el especatulo seleccionado en la lista de espectaculos
    // (en HTML no hay ningún elemento marcado por defecto)
    // ATENCIÓN: Mozila Firefox tiene un comportamiento particular a la hora
    // de gestionar los botones radio entre sesiones. Es preferible marcar explíctamente
    // la selección
    const selector = `input[data-espectaculo=${espectaculo}]`;
    const espectaculoDOM = document.querySelector(selector);
    espectaculoDOM.checked = true;
  }

  preparacion();

  asientos = recuperaAsientosDelAlmacenLocal();
  espectaculo = recuperaEspectaculoDelAlmacenLocal();
  generaAforoDOMSegunArrayAsientos();
  marcaEspectaculoSeleccionado();
  actualizaPanelDeInformacion();
}

//  Funciones para la cancelación y pago de reservas

function cancelarReservas() {
  asientos.forEach((elemento, indice) => {
    if (elemento == SELECCIONADO) {
      asientos[indice] = LIBRE;

      const selector = `div[data-index="${indice}"]`;
      const asientoDOM = aforo.querySelector(selector);
      asientoDOM.classList = valorClassDeAsientoLIBRE;
    }
  });

  contador.innerText = "0";
  precioTotal.innerHTML = "0";
  actualizaAsientosEnAlmacenLocal();
  actualizaEspectaculoEnAlmacenLoca();
}

function pagarReservas() {
  asientos.forEach((elemento, indice) => {
    if (elemento == SELECCIONADO) {
      asientos[indice] = OCUPADO;
      const selector = `div[data-index="${indice}"]`;
      const asientoDOM = aforo.querySelector(selector);
      asientoDOM.classList = valorClassDeAsientoOCUPADO;
    }
  });

  contador.innerText = "0";
  precioTotal.innerHTML = "0";
  actualizaAsientosEnAlmacenLocal();
  actualizaEspectaculoEnAlmacenLoca();
}

//  Funciones para efectuar la reserva (seleccion de asientos y espectaculo)

function actualizaPanelDeInformacion() {
  // El panel indica el número de asientos seleccionados
  // y el precio total de la reserva

  // n es el numero de asientos seleccionados
  // (i.e. el número de elementos SELECCIONADO en el array asientos)
  const n = asientos.filter((a) => a == SELECCIONADO).length;

  // p es el precio del espectaculo seleccionado
  // Para obtener el precio del espectaculo seleccionado tenemos que
  // acceder al valor del atributo data-precio del elemento del DOM
  // cuyo data-espectaculo tiene por valor el contenido de la variable espectaculo

  const selector = `input[data-espectaculo=${espectaculo}]`;
  const espectaculoDOM = document.querySelector(selector);
  // El operador prefijo + convierte una cadena en un numero
  const p = +espectaculoDOM.dataset.precio;

  contador.innerText = n;

  precioTotal.innerHTML = p * n;
}

function tipoDeAsiento(elementoHTML) {
  // Identifica el asiento como LIBRE, OCUPADO o SELECCIONADO.
  // Devuelve -1 si el contenido del atributo class del
  // elementoHTML no se corresponde con ningun tipo de asiento.

  const valoresClass = elementoHTML.classList;
  let tipo = -1;

  if (valoresClass == valorClassDeAsientoLIBRE) {
    tipo = LIBRE;
  }
  if (valoresClass == valorClassDeAsientoOCUPADO) {
    tipo = OCUPADO;
  }
  if (valoresClass == valorClassDeAsientoSELECCIONADO) {
    tipo = SELECCIONADO;
  }
  return tipo;
}

function actualizaTipoDeAsiento(elementoHTML) {
  // Las actualizaciones factibles son si se ha actuado sobre asientos
  //   a) libres (que pasan a estar seleccionados)
  //   b) seleccionados (que pasan a estar libres)
  // La actualización debe incluir:
  //   - actualizar el array asientos en JS y LocalStorage
  //   - actualizar la página web (color del asiento y los datos panel informativo de la reserva)
}

function actualizaInformacionDelEspectaculo(nombre) {
  // Actualizar la variable espectaculo en JS y LocalStorage
  // Se actualiza el panel de información
}

//  Funciones para gestionar LocalStorage

function recuperaAsientosDelAlmacenLocal() {
  // Recupera y devuelve la variable asientos de localStorage
}

function recuperaEspectaculoDelAlmacenLocal() {
  // Recupera y devuelve la variable espectaculo de localStorage
}

function actualizaAsientosEnAlmacenLocal() {
  // Actualiza la varible asientos de localStorage con el valor de la variable asientos
}

function actualizaEspectaculoEnAlmacenLoca() {
  // Actualiza la varible especataculo de localStorage con el valor de la variable espectaculo
}

// Gestores de eventos:

aforo.addEventListener("click", (e) => actualizaTipoDeAsiento(e.target));
espectaculos.forEach((espectaculo) =>
  espectaculo.addEventListener("change", (e) => actualizaInformacionDelEspectaculo(e.target.dataset.espectaculo))
);
cancelar.addEventListener("click", cancelarReservas);
pagar.addEventListener("click", pagarReservas);

// Función de comienzo

comienzo();
