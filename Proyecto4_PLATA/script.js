// PREAMBULO

// El premabulo tiene como cometido la identificación de la autoría del trabajo
// El nombre será mostrada en el elemento HTML #equipo de la página web
// Cada equipo debe actualizar la constante con su nombre de equipo

const nombreDelEquipoDeLaboratorio = "PLATA";
document.getElementById("equipo").innerHTML = nombreDelEquipoDeLaboratorio;

// PROYECTO PIANO
// Aplicacion web que simula un pequeño piano de una octava

//  -------------------------------------------------------
//  Variables de interacción y sus gestores de eventos

// Al pulsar las teclas se debe generar el sonido asociado
const teclas = document.querySelectorAll(".tecla");
teclas.forEach((tecla) => tecla.addEventListener("click", (e) => hazSonarLaTeclaPulsada(e.target)));

// Los osciladores son modelos de ondas con los que generar artificialmente sonido
// La aplicación permite seleccionar uno de los 4 siguientes: sine, triangle, square, sawtooth
const osciladores = document.querySelectorAll(".oscilador");
osciladores.forEach((oscilador) => oscilador.addEventListener("click", (e) => actualizaTipoDeOscilador(e.target.id)));

//  -------------------------------------------------------
//  Variables auxiliares

//  Variable para recordar el oscilador seleccionado (por defecto: sine)
let osciladorSeleccionado = "sine";

//  -------------------------------------------------------
//  Funciones

function comienzo() {
  // Destaca en pantalla el oscilador seleccionado
  const osciladorDePartida = document.getElementById(osciladorSeleccionado);
  osciladorDePartida.classList.add("oscilador--activo");
}

// Funciones para la selección del oscilador para generar sonido

function actualizaTipoDeOscilador(tipo) {
  const osciladorDesactivado = document.getElementById(osciladorSeleccionado);
  const osciladorActivado = document.getElementById(tipo);

  osciladorDesactivado.classList.remove("oscilador--activo");
  osciladorActivado.classList.add("oscilador--activo");

  osciladorSeleccionado = tipo;
}

// Funciones para la generación de sonido al pulsar las teclas

function hazSonarLaTeclaPulsada(tecla) {
  // Cada nota musical se correponden con una onda sonora de
  // una determinada frecuencia en Hz
  // El teclado se corresponde con las teclas en la octava do3 - si3 (C4-B4)
  // https://es.wikipedia.org/wiki/Frecuencias_de_afinaci%C3%B3n_del_piano

  const mapaDeFrecuencias = {
    do: 261.626,
    doSostenido: 277.183,
    re: 293.665,
    reSostenido: 311.127,
    mi: 329.628,
    fa: 349.228,
    faSostenido: 369.994,
    sol: 391.955,
    solSostenido: 415.305,
    la: 440.0,
    laSostenido: 466.164,
    si: 493.883,
  };

  // Obtiene la frecuencia que corresponde
  // a la nota asociada a la tecla pulsada
  const nota = tecla.id;
  const frecuencia = mapaDeFrecuencias[nota];

  // Convierte la frecuencia en sonido
  ___generaSonido(frecuencia);
}

function ___generaSonido(frecuencia) {
  
  // Esta función se apoya en la API Web Audio para generar el sonido
  // https://css-tricks.com/introduction-web-audio-api/
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
  // De forma general, los pasos a seguir son los siguientes
  // 1. Creacion de un contexto (audio context)
  // 2. Creacion de una fuente de sonido (Osciloscopio, Audio sample, Audio Stream)
  // 3. Diseño del sonido (gráfico de enrutamiento de audio formado por nodos modificadores de sonido)
  // 4. Conexión del grafo al destino (salida de audio)
  // Caso particular para la aplicación:
  //   - Paso 1: se creará un objeto (contexto) para

  var context = new (window.AudioContext || window.webkitAudioContext)();

  var oscillator = context.createOscillator();

  //   - Paso 2: la fuente será un osciloscopio (oscilador)
  //     Los parámetros del oscilador serán el
  //        - Tipo de oscilador (.type): podrán ser "sine", "triangle" "square" "sawtooth"
  //        - Frecuencia (.frecuency.value): frecuencia ("altura") del sonido

  oscillator.type = osciladorSeleccionado;
  oscillator.frequency.value = frecuencia;
  oscillator.connect(context.destination);

  //   - El paso 4: se enviará el sonido a la salida, pero limitando la duración de emisión del sonido
  //     a un segundo. Será necesario el apoyo de .currenTime .start() y stop()
  var now = context.currentTime;
  oscillator.start(now);
  oscillator.stop(now + 1);


  
  //   - El paso 3. no será aplicado. El sonido generadi por el osciloscopio será
  //     enviado directamente a la salida sin ningún tipo de procesamiento
  
}

// -----------------------------------------------
//

comienzo();
