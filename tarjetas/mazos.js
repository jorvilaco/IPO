// APLICACIÓN TARJETAS

//  Contiene la información de cada mazo de tarjetas
//  La variable es un objeto donde:
//      - cada propiedad es un mazo
//      - cada mazo es un array de tarjetas
//      - cada tarjeta es un objeto con dos propiedades: anverso y reverso

var datosDeLosMazos = {
  sustantivos: [
    { anverso: "学 生", reverso: "estudiante" },
    { anverso: "学 校", reverso: "escuela" },
    { anverso: "朋 友", reverso: "amigo" },
    { anverso: "爸 爸", reverso: "padre" },
    { anverso: "妈 妈", reverso: "madre" },
    { anverso: "咖 啡", reverso: "café" },
    { anverso: "餐 厅", reverso: "restaurante" },
  ],
  verbos: [
    { anverso: "是", reverso: "ser" },
    { anverso: "要", reverso: "querer" },
    { anverso: "去", reverso: "ir" },
    { anverso: "在", reverso: "estar" },
    { anverso: "有", reverso: "haber" },
    { anverso: "吃", reverso: "comer" },
    { anverso: "喝", reverso: "beber" },
    { anverso: "住", reverso: "vivir" },
  ],
  pronombres: [
    { anverso: "我", reverso: "yo" },
    { anverso: "你", reverso: "tu" },
    { anverso: "他", reverso: "el" },
    { anverso: "她", reverso: "ella" },
    { anverso: "我 们", reverso: "nosotros" },
    { anverso: "你 们", reverso: "vosotros" },
    { anverso: "他 们", reverso: "ellos" },
    { anverso: "她 们", reverso: "ellas" },
  ],
  adjetivos: [
    { anverso: "好", reverso: "bueno" },
    { anverso: "上", reverso: "arriba" },
    { anverso: "下", reverso: "abajo" },
    { anverso: "明", reverso: "brillante" },
    { anverso: "小", reverso: "pequeño" },
    { anverso: "老", reverso: "viejo" },
    { anverso: "忙", reverso: "ocupado" },
    { anverso: "大", reverso: "grande" },
    { anverso: "累", reverso: "cansado" },
  ],
  numeros: [
    { anverso: "一", reverso: "uno" },
    { anverso: "二", reverso: "dos" },
    { anverso: "三", reverso: "tres" },
    { anverso: "四", reverso: "cuatro" },
    { anverso: "五", reverso: "cinco" },
    { anverso: "六", reverso: "seis" },
    { anverso: "七", reverso: "siete" },
    { anverso: "八", reverso: "ocho" },
    { anverso: "九", reverso: "nueve" },
    { anverso: "十", reverso: "diez" },
  ],
};
