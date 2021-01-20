// PREAMBULO

// El premabulo tiene como cometido la identificación de la autoría del trabajo
// El nombre será mostrada en el elemento HTML #equipo de la página web
// Cada equipo debe actualizar la constante con su nombre de equipo

const nombreDelEquipoDeLaboratorio = "XXXXX";
document.getElementById("equipo").textContent = nombreDelEquipoDeLaboratorio;

// ACTIVIDAD RELAX

// La aplicación es un apoyo visual para realizar ejercicios de relajación
// basadas en ciclos de respiración: inspiración-mantenimiento-expiración
// La aplicación
// Con idea de guiar el ejercicio la aplicación muestra
//  - Un círculo cuyo diametro:
//       crece durante la etapa de inspiración
//       se mantiene igual durante la etapa de mantenimiento
//       decrece durante la etapa de expiración
//  - Un punto recorre el circulo para idicar cada instante de tiemp
//  - Un mensaje dentro del circulo indica la etapa actual

// Variables de acceso los elementos de la pantalla
const circulo = document.getElementById("circulo");
const mensaje = document.getElementById("mensaje");

// Clases para dar estilo (crecimiento/decrecimiento)
const claseCirculoCreciendo = "circulo circulo--crece";
const claseCirculoDecreciendo = "circulo circulo--decrece";

// La expansión del circulo se efectua mediante dos animaciones que
// se activan según un ciclo temporal predeterminado.
// Tiempo total del ciclo: Se corresponde con el tiempo que
//     tarda el punto en recorrer el circulo
// Este tiempo se divide en 5 partes:
//   2 primeras partes para la inspiración
//   1 parte para el mantenimiento del aire en los pulmones
//   2 últimas partes para la inspiración

// El tiempo total del ciclo se establece en la hoja de estilo CSS
const bodyStyle = getComputedStyle(document.body);
const tiempoTotalDelCiclo = bodyStyle.getPropertyValue("--tiempo-rotacion");
const tiempoRespiración = (tiempoTotalDelCiclo / 5) * 2;
const tiempoMantenimiento = tiempoTotalDelCiclo / 5;

// Funciones
function comienzo() {
  // El ciclo completo (inspiración-mantenimiento-inspiracion)
  // debe realizarse de forma continua cada tiempoTotalDelCiclo milisegundos
  setInterval(cicloDeRespiracion, tiempoTotalDelCiclo);
  cicloDeRespiracion();
}

function inspiracion() {
  mensaje.innerText = "Inspira";
  circulo.className = claseCirculoCreciendo;
}

function mantenimiento() {
  mensaje.innerText = "Mantén";
}

function expiracion() {
  mensaje.innerText = "Expira";
  circulo.className = claseCirculoDecreciendo;
}

function cicloDeRespiracion() {
  // setTimeout(funcion, retardo) ejecuta funciones con un cierto tiempo de retardo

  // inspiración() empieza el ciclo
  inspiracion();

  // pasados tiempoDeRespiracion milisegundos
  // se ejecuta el cuerpo del setTimeout() externo

  setTimeout(() => {
    // mantenimiento() continua el ciclo tras inspiración()
    mantenimiento();

    // pasados tiempoDeMantenimiento milisegundos
    // se ejecuta el cueropo de setTimeout() interno

    setTimeout(() => {
      // expiración() continua el ciclo tras mantenimiento()
      expiracion();
    }, tiempoMantenimiento);
  }, tiempoRespiración);

  // En este punto de la función han transcurrido el tiempo para
  // la inspiración y mantenimiento. Queda que transcurra el tiempo
  // de expiración para alcanzar tiempoTotalDelCiclo y que acabe el ciclo
}

comienzo();
