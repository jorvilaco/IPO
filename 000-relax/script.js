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
