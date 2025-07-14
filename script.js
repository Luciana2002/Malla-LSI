async function cargarMalla() {
  const mallaContainer = document.getElementById("malla");

  const [materias, colores] = await Promise.all([
    fetch('data.json').then(r => r.json()),
    fetch('colores.json').then(r => r.json())
  ]);

  for (let semestre in materias) {
    const columna = document.createElement("div");
    columna.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = semestre.toUpperCase();
    columna.appendChild(titulo);

    materias[semestre].forEach(([nombre, codigo, creditos, horas, area, correlativas]) => {
      const materia = document.createElement("div");
      materia.className = "materia";
      materia.style.backgroundColor = colores[area]?.[0] || "#ccc";
      materia.innerHTML = `<strong>${codigo}</strong><br>${nombre}<br><small>${creditos} créditos</small>`;
      columna.appendChild(materia);
    });

    mallaContainer.appendChild(columna);
  }
}

window.onload = cargarMalla;

