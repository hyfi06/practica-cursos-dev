// Variables y operaciones

const yo = {
  nombre: "Hector",
  apellido: "Olvera",
  nickname: "hyfi06",
  edad: "31",
  email: "hector@hyfi.com",
  adulto: true,
  ahorro: 10000,
  deudas: 3300,
};

console.log(`${yo.nombre} ${yo.apellido}`);
console.log(yo.ahorro - yo.deudas);

// funciones

function presentacion(nombre, lastname, nickname) {
  const completeName = `${nombre} ${lastname}`;
  return `Mi nombre es ${completeName}, pero prefiero que me digas ${nickname}.`;
}

console.log(presentacion("Juan David", "Castro Gallego", "juandc"));

//condicionales

const tipoDeSuscripcion = "Basic";

if (tipoDeSuscripcion == "Free") {
  console.log("Solo puedes tomar los cursos gratis");
} else if (tipoDeSuscripcion == "Basic") {
  console.log("Puedes tomar casi todos los cursos de Platzi durante un mes");
} else if (tipoDeSuscripcion == "Expert") {
  console.log("Puedes tomar casi todos los cursos de Platzi durante un año");
} else if (tipoDeSuscripcion == "ExpertPlus") {
  console.log(
    "Tú y alguien más pueden tomar TODOS los cursos de Platzi durante un año"
  );
}
const tipoDeSuscripcion = "Basic";

const mensajePorSuscripcion = {
  Free: "Solo puedes tomar los cursos gratis",
  Basic: "Puedes tomar casi todos los cursos de Platzi durante un mes",
  Expert: "Puedes tomar casi todos los cursos de Platzi durante un año",
  ExpertPlus:
    "Tú y alguien más pueden tomar TODOS los cursos de Platzi durante un año",
};

if (Object.keys(mensajePorSuscripcion).includes(tipoDeSuscripcion)) {
  console.log(mensajePorSuscripcion[mensajePorSuscripcion]);
}

// bonus
const tipoDeSuscripcion = "Basic";

const mensajePorSuscripcion = [
  {
    tipo: "Free",
    mensaje: "Solo puedes tomar los cursos gratis",
  },
  {
    tipo: "Basic",
    mensaje: "Puedes tomar casi todos los cursos de Platzi durante un mes",
  },
  {
    tipo: "Expert",
    mensaje: "Puedes tomar casi todos los cursos de Platzi durante un año",
  },
  {
    tipo: "ExpertPlus",
    mensaje:
      "Tú y alguien más pueden tomar TODOS los cursos de Platzi durante un año",
  },
];

const plan = mensajePorSuscripcion.find(
  (plan) => plan.tipo == tipoDeSuscripcion
);

if (plan) {
  console.log(plan.mensaje);
}
