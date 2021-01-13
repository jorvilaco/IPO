// PREAMBULO

// El premabulo tiene como cometido la identificación de la autoría del trabajo
// El nombre será mostrada en el elemento HTML #equipo de la página web
// Cada equipo debe actualizar la constante con su nombre de equipo

const nombreDelEquipoDeLaboratorio = "XXXXX";
document.getElementById("equipo").textContent = nombreDelEquipoDeLaboratorio;

// -------------  Variables de interacción

// Para cambiar las tarjetas que se mostrarán en el visor
const mazos = document.getElementById("mazos");
mazos.addEventListener("click", (e) => seleccionaMazo(e.target.id));

// Para avanzar a la siguinte tarjeta en el visor
const anteriorBtn = document.getElementById("anterior");
anteriorBtn.addEventListener("click", ___muestraTarjetaAnterior);

// Para retroceder a la siguinte tarjeta en el visor
const siguienteBtn = document.getElementById("siguiente");
siguienteBtn.addEventListener("click", ___muestraTarjetaSiguiente);

// Para darle la vuesta a la tarjeta activa
const visorDeTarjetas = document.getElementById("visorDeTarjetas");
visorDeTarjetas.addEventListener("click", (e) => ___volteaTarjeta(e.target));

//  -------------------  Variables y constantes

let numeroDeTarjetaActiva = 0;
let numeroDeTarjetasDelMazo = 0;

// Clases CSS para dar estilo a las tarjetas
const claseTarjetaActiva = "tarjeta tarjeta--activa";
const claseParaVoltearUnaTarjeta = "tarjeta--volteo";
const claseTarjetaEnLaDerecha = "tarjeta tarjeta--derecha";
const claseTarjetaEnLaIzquierda = "tarjeta tarjeta--izquierda";

//  --------    Funciones

function comienzo() {
  function generaSeleccionDeMazos() {
    arrayMazosHTML = [];
    for (let m in window.datosDeLosMazos) {
      const mazoHTML = `<button class="mazo" id="${m}">${m.toUpperCase()}</button>`;
      arrayMazosHTML.push(mazoHTML);
    }
    mazos.innerHTML = arrayMazosHTML.join("");
  }

  if (window.datosDeLosMazos !== null) {
    // Añade al DOM (y muestra en pantalla) los mazos disponibles
    generaSeleccionDeMazos();
    // Selecciona el primer mazo
    seleccionaMazo(Object.keys(window.datosDeLosMazos)[0]);
  }
}

// ------------  Funciones para gestion de eventos

function ___muestraTarjetaAnterior() {
  // Solo es coherente mover a la derecha una tarjeta que no
  // sea la primera del mazo
  // El efecto de desplazamiento se obtiene actualizando
  // los estilos de las tarjeta implicadas de forma
  // que la activa se desplace a la derecha
  // y la anterior a la activa sea la visible
  // También debe actualizarse el número de tarjeta
  // que se muestra en la referencia de navegación
}

function ___muestraTarjetaSiguiente() {
  // Solo es posible mover a la izquierda una tarjeta que no
  // sea la última del mazo
  // El efecto de desplazamiento se obtiene actualizando
  // los estilos de las tarjeta implicadas de forma
  // que la activa se desplace a la izquierda
  // y la siguiente a la activa sea la visible
  // También debe actualizarse el número de tarjeta
  // que se muestra en la referencia de navegación
}

function seleccionaMazo(nombre) {
  // Partiendo del mazo seleccionado se actualiza
  //  - las cartas mostradas en el visor
  //  - la información respecto a la navegación
  //  - las variables numeroDeTarjetaActiva y numeroDeTarjetasDelMazo

  function actualizaTarjetasEnDOM(tarjetas) {
    // Añade al visor los elementos HTML correspondientes
    // a todas las tarjetas del mazo seleccionado
    // Las tarjetas son previamente barajadas para que se muestren
    // en orden aleatoria cada vez que se seleccionan
    // Se apoya en otra función que genera sucesivammente
    // un elemento HTML para cada tarjeta

    function baraja(array) {
      // Devuelve un array con sus elementos ordenados aleatoriamente
      let aux = [];
      // Se crea un array auxiliar de pares donde:
      //   -  el primer componente (valor) conserva los valores del array
      //   -  el segundo componente (random) es un númeo generado aleatoriamente
      aux = array.map((v) => ({ valor: v, random: Math.random() }));
      // Se ordena el array de pares respecto al par aleatorio random
      aux = aux.sort((a, b) => a.random - b.random);
      // Se suprime el componente aleatorio del par, manteniendo los valores de partida del array
      aux = aux.map((par) => par.valor);
      return aux;
    }

    function generaTarjetaHTML(tarjeta, index) {
      const tarjetaAnversoHTML = `<div class="tarjeta--anverso">${tarjeta.anverso}</div>`;
      const tarjetaReversoHTML = `<div class="tarjeta--reverso">${tarjeta.reverso}</div>`;
      const contenidoTarjeta = tarjetaAnversoHTML + tarjetaReversoHTML;

      return (
        `<div class="${claseTarjetaEnLaDerecha}" data-index="${index}">` +
        contenidoTarjeta +
        "</div>"
      );
    }

    const tarjetasBarajadas = baraja(tarjetas);
    const tarjetasHTML = tarjetasBarajadas.map((tarjeta, index) =>
      generaTarjetaHTML(tarjeta, index)
    );
    visorDeTarjetas.innerHTML = tarjetasHTML.join("");
  }

  // Recupera las tarjetas del mazo seleccionado
  const tarjetas = window.datosDeLosMazos[nombre];
  // Añade las tarjetas al DOM
  actualizaTarjetasEnDOM(tarjetas);
  numeroDeTarjetasDelMazo = tarjetas.length;

  // Selecciona la primera tarjeta como activa
  numeroDeTarjetaActiva = 0;
  const selector = `div[data-index="0"]`;
  const primeraTarjeta = document.querySelector(selector);
  primeraTarjeta.classList = claseTarjetaActiva;

  // Se actualiza el número de tarjeta en la referencia de navegación
  actualizaNavegacion();
}

function ___volteaTarjeta(elemento) {
  // Cambia el estilo de la tarjeta activa para darle la vuelta
  // NOTA: El paramentro elemento que recibe la función
  // es un elemento contenido dentro del elemento tarjeta al que
  // se le debe aplicar el cambio de estilo
  // El método closest permite recorrer el DOM para seleccionar
  // el elemento tarjeta que lo contiene
  // https://developer.mozilla.org/es/docs/Web/API/Element/closest
}

//  Funciones auxiliares

function actualizaNavegacion() {
  // Muestra en la navegación el par de números que indica el número de tarjeta
  // activa junto con el total de tarjetas del mazo:
  //
  const referencia = document.getElementById("referencia");
  referencia.textContent = `${
    numeroDeTarjetaActiva + 1
  }/${numeroDeTarjetasDelMazo}`;
}

// Principio del programa

comienzo();
