///////////////////////////////////////////////////////////////
//  EQUIPO <<NOMBRE EQUIPO >>
///////////////////////////////////////////////////////////////

// ==========  Variables

const comienzo = document.getElementById("comienzo");
const detencion = document.getElementById("detencion");
const tiempo = document.getElementById("tiempo");
const palabrasCorrectas = document.getElementById("palabrasCorrectas");
const palabra = document.getElementById("palabra");
const entrada = document.getElementById("entrada");

// Las palabras de muestra que aparecerán en pantalla
// para el test de velocidad se ha obtenido de la página web
//       https://www.palabrasaleatorias.com/
const palabras = [
  "autopista",
  "chicle",
  "visitar",
  "amistoso",
  "puerta",
  "avellana",
  "despedida",
  "fantasma",
  "sirena",
  "monumento",
  "radioaficionado",
  "tímido",
  "arruga",
  "caro",
  "abuelo",
  "convento",
  "gafas",
  "rabino",
  "sufrir",
  "nuez",
  "sauce",
  "orejera",
  "apagar",
];

// Para calcular los segundos empleados en mecanografíar las
// palabras se hará uso de un temporizador. Los temporizadores
// permiten ejecutar una función cada cierto intervalo de tiempo
// Se basa en dos funciones: setInterval y clearInterval
//              temporizador = setInterval(unaFuncion,1000)
//              clearInterval(temporizador)
//
//  OJO: setInterval usa una funcion como parámetro por lo que se pasa
//       el nombre (sin paréntesis)
//  Para más detalles sobre las funciones:
//  https://developer.mozilla.org/es/docs/Web/API/WindowTimers/setInterval
//  https://developer.mozilla.org/es/docs/Web/API/WindowTimers/clearInterval

// Variable que almacenará el temporizador.
let temporizador;


// ==========  Funciones Auxiliares (Helpers)

function actualizaPalabraDeMuestra() {
  // Genera una nueva palabra de muestra aleatoria y la muestra
  // en la página. Para ellos se apoya en una funcion interna nuevaPalabraAleatoria
  // que gestiona el proceso de obtener la palabra de forma aleatoria

  function nuevaPalabraAleatoria() {
    // Dado que las palabras para el test de velocidad se almacenan en un array,
    // la selección de una palabra se realiza mediante la selección aleatoria
    // de una posición en el array de las palabras.
    //      Math.floor(Math.random() * palabras.length);

    // Numero de palabras en el array palabras
    const size = palabras.length;
    // Numero real aleatorio entre 0 y 1
    const randomNumber = Math.random();
    // Numero real aleatorio entre 0 y size (numero de palabras en el array)
    const indiceRealAleatorio = Math.random() * size;

    // Redondeo del número real obtenido al entero más próximo
    // para que se corresponda con una posición (indice) correcta.
    const indiceALeatorio = Math.floor(indiceRealAleatorio);

    // Devuelve la palabra del array ubicada en el indice aleatorio
    return palabras[indiceALeatorio];
  }

  const nuevaPalabra = nuevaPalabraAleatoria();
  palabra.innerText = nuevaPalabra;
}


function comprobarPalabraMecanografiada(palabraEscritaEnAreaDeTexto) {
  // Comprueba si la palabra escrita en el área de texto
  // coincide con la palabra de muestra generada aleatoriamente.
  // Si ambas coinciden se deberá:  
  
  if (palabra.innerHTML == palabraEscritaEnAreaDeTexto){
    //    -  actualizar el número de palabras correctas
    var contador = parseInt(palabrasCorrectas.innerHTML);
    contador = contador +1;
    palabrasCorrectas.innerHTML = contador;
    //    -  generar aleatoriamente una nueva palabra de muestra
    actualizaPalabraDeMuestra();
    //    -  vaciar el área de texto para permitir escribir una nueva palabra
    entrada.value = "";
  }
}

// Funciones para gestionar el temporizador

function actualizaTiempo() {
  
  //  Se incrementa en una unidad el contador de tiemp
  var contador = parseInt(tiempo.innerHTML);
  contador = contador +1;
  tiempo.innerHTML = contador;
}

function comenzarTestDeVelocidad() {
  // Realiza todos los preparativos para comenzar
  // un nuevo test de velocidad
  //   -  Se actualiza la palabra a escribir
  actualizaPalabraDeMuestra();
  //   -  Se inicializan los contadores de tiempo y de puntos
  palabrasCorrectas.innerHTML = 0;
  tiempo.innerHTML = 0;
  //   -  Se pone en foco el área de texto para que el usuario pueda
  //      comenzar a escribir inmediatamente
  //      https://developer.mozilla.org/es/docs/Web/API/HTMLElement/focus
  entrada.focus();
  // Soluciona el problema que puede darse si se pulsa dos veces el boton comenzar antes de darle a detener
  if(temporizador !=0)
    clearInterval(temporizador);
  //   -  Se inicializa el temporizador que se encargaraá de ejecutar
  //      con una cadencia de 1000 (1 segundo) la función actualizaTiempo
  temporizador = setInterval(actualizaTiempo, 1000);
  
}

function detenerTestDeVelocidad() {
  //  Detiene el temporizador
  //  OBSERVACIÓN: Al detener el tiempo, la página refleja en el marcador
  //  el resultado del test. Es decir, el número de segundos empleados y el numero
  //  de palabras correctamente mecanografiadas
  clearInterval(temporizador);
}

// ==========  Gestores de Eventos

comienzo.addEventListener("click", comenzarTestDeVelocidad);
detencion.addEventListener("click", detenerTestDeVelocidad);
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
entrada.addEventListener("input", (e) => comprobarPalabraMecanografiada(e.target.value));
