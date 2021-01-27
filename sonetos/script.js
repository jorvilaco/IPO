// PREAMBULO

// El premabulo tiene como cometido la identificación de la autoría del trabajo
// El nombre será mostrado en el elemento HTML #equipo de la página web
// Cada equipo debe actualizar la constante con su nombre de equipo

const nombreDelEquipoDeLaboratorio = "PLATA";
document.getElementById("equipo").textContent = nombreDelEquipoDeLaboratorio;

// PROYECTO SONETOS

// La aplicación consta de dos zonas:
//   una zona donde se relacionan una lista de sonetos
//   un soneto seleccionado de una lista de sonetos

// -------------  Variables global

// En sonetos.js se define la variable sonetos que es un array de objetos con las
// siguiente propiedade:  id, autor y una array soneto de 14 cadenas

// -------------  Variables de interacción

// Para seleccionar el soneto a mostrar en el lienzo
const listaDeSonetosDOM = document.getElementById("listaSonetos");
listaDeSonetosDOM.addEventListener("click", (e) =>
  muestraSonetoSeleccionado(e.target)
);

//  --------    Funciones

function comienzo() {
  function generaListaDeSonetos() {
    listaDeSonetosDOM.innerHTML = sonetos
      .map((soneto, index) => {
        const titulo = soneto["titulo"].toUpperCase();
        return `<button class="lista-sonetos__item" data-index="${index}">${titulo}</button>`;
      })
      .join("");
  }

  generaListaDeSonetos();
}

function muestraSonetoSeleccionado(e) {
  function generaSoneto(indice) {
    const soneto = sonetos[indice]["soneto"];
    const titulo = sonetos[indice]["titulo"];
    const autor = sonetos[indice]["autor"];
    const estiloSoneto = sonetos[indice]["estiloCSS"];

    const htmlTitulo = `<div class="titulo">` + titulo + `</div>`;
    const htmlAutor = `<div class="autor">` + autor + `</div>`;
    const htmlVersos = `<div class="versos">` + generaVersos(soneto) + `</div>`;

    const html = htmlTitulo + htmlAutor + htmlVersos;

    const lienzoDOM = document.getElementById("lienzo");
    lienzoDOM.classList =
      "lienzo lienzo-" + (++indice < 10 ? "0" + indice : indice);
    lienzoDOM.innerHTML = `<div class="${estiloSoneto}">` + html + "</div>";
  }

  function generaVersos(soneto) {
    const htmlSoneto = soneto
      .map((verso, index) => {
        const i = ++index < 10 ? "0" + index : index;
        return `<div class="verso v-${i}">` + verso + "</div>";
      })
      .join("");
    return htmlSoneto;
  }

  generaSoneto(e.dataset.index);
}

// Principio del programa

comienzo();
