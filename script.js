const materias = {
  "1": [
    { codigo: "101", nombre: "Algoritmos y Estructuras de Datos I", requisitos: [] },
    { codigo: "102", nombre: "Álgebra", requisitos: [] },
    { codigo: "103", nombre: "Algoritmos y Estructuras de Datos II", requisitos: ["101"] },
    { codigo: "104", nombre: "Lógica y Matemática Computacional", requisitos: [] },
    { codigo: "105", nombre: "Sistemas y Organizaciones", requisitos: [] },
  ],
  "2": [
    { codigo: "201", nombre: "Paradigmas y Lenguajes", requisitos: ["103"] },
    { codigo: "202", nombre: "Arquitectura y Organización de Computadoras", requisitos: ["103"] },
    { codigo: "203", nombre: "Cálculo Diferencial e Integral", requisitos: ["102", "104"] },
    { codigo: "204", nombre: "Programación Orientada a Objetos", requisitos: ["103"] },
    { codigo: "205", nombre: "Sistemas Operativos", requisitos: ["103"] },
    { codigo: "206", nombre: "Administración y Gestión de Organizaciones", requisitos: ["105"] },
  ],
  "3": [
    { codigo: "301", nombre: "Taller de Programación I", requisitos: ["204", "205"] },
    { codigo: "302", nombre: "Comunicaciones de Datos", requisitos: ["205"] },
    { codigo: "303", nombre: "Ingeniería de Software I", requisitos: ["204", "206"] },
    { codigo: "304", nombre: "Taller de Programación II", requisitos: ["301", "303"] },
    { codigo: "305", nombre: "Probabilidad y Estadística", requisitos: ["203"] },
    { codigo: "306", nombre: "Bases de Datos I", requisitos: ["204"] },
    { codigo: "307", nombre: "Inglés Técnico Informático", requisitos: [] },
  ],
  "4": [
    { codigo: "401", nombre: "Ingeniería de Software II", requisitos: ["303"] },
    { codigo: "402", nombre: "Economía Aplicada", requisitos: ["206"] },
    { codigo: "403", nombre: "Teoría de la Computación", requisitos: ["202", "305"] },
    { codigo: "404", nombre: "Redes de Datos", requisitos: ["302"] },
    { codigo: "405", nombre: "Bases de Datos II", requisitos: ["306"] },
    { codigo: "406", nombre: "Métodos Computacionales", requisitos: ["305"] },
  ],
  "5": [
    { codigo: "501", nombre: "Proyecto Final de Carrera", requisitos: ["404", "405", "401"] },
    { codigo: "502", nombre: "Auditoría y Seguridad Informática", requisitos: ["404", "405"] },
    { codigo: "503", nombre: "Optativa I", requisitos: ["403"] },
    { codigo: "504", nombre: "Optativa II", requisitos: ["406"] },
    { codigo: "505", nombre: "Optativa III", requisitos: ["503", "504"] },
  ]
};

let aprobadas = new Set();

function renderMalla() {
  for (const anio in materias) {
    const contenedor = document.getElementById(`anio-${anio}`);
    contenedor.innerHTML = `<h2>${anio}° Año</h2>`;

    materias[anio].forEach(materia => {
      const div = document.createElement("div");
      div.className = "materia";
      div.innerText = `${materia.codigo} - ${materia.nombre}`;

      const puedeCursar = !materia.requisitos.length || materia.requisitos.every(r => aprobadas.has(r));

      if (aprobadas.has(materia.codigo)) {
        div.classList.add("aprobada");
      } else if (puedeCursar) {
        div.classList.add("habilitada");
      } else {
        div.classList.add("bloqueada");
      }

      div.onclick = () => {
        if (aprobadas.has(materia.codigo)) {
          aprobadas.delete(materia.codigo);
        } else if (puedeCursar) {
          aprobadas.add(materia.codigo);
        }
        renderMalla();
      };

      contenedor.appendChild(div);
    });
  }
}

document.addEventListener("DOMContentLoaded", renderMalla);
