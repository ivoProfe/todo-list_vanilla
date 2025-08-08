let tareas = [
  { titulo: "Preparar presentación", subtitulo: "Seminario React", descripcion: "Diapositivas y ejemplos", hecha: false, color: "#ccc" },
  { titulo: "Revisar HTML", subtitulo: "Repaso semántica", descripcion: "Etiquetas y estructura", hecha: false, color: "#ddeeff" }
];

const lista = document.querySelector("#lista-tareas");
const form = document.querySelector("#form-tarea");

form.addEventListener("submit", e => {
  e.preventDefault();
  const titulo = e.target.titulo.value;
  const subtitulo = e.target.subtitulo.value;
  const descripcion = e.target.descripcion.value;
  const color = e.target.color.value;
  tareas.push({ titulo, subtitulo, descripcion, hecha: false, color });
  form.reset();
  renderTareas();
});

function renderTareas() {
  lista.innerHTML = "";
  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.className = "tarjeta";
    li.dataset.hecha = tarea.hecha;
    li.style.backgroundColor = tarea.color;
    li.innerHTML = `
      <h3>${tarea.titulo}</h3>
      <h4>${tarea.subtitulo}</h4>
      <details><summary>Ver descripción</summary><p>${tarea.descripcion}</p></details>
      <div class="acciones">
        <button data-accion="hecha" data-index="${index}">✔</button>
        <button data-accion="editar" data-index="${index}">🖊</button>
        <button data-accion="eliminar" data-index="${index}">✖</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

lista.addEventListener("click", e => {
  const accion = e.target.dataset.accion;
  const index = e.target.dataset.index;
  if (!accion) return;

  if (accion === "hecha") {
    tareas[index].hecha = !tareas[index].hecha;
    renderTareas();
  }
  if (accion === "eliminar") {
    tareas.splice(index, 1);
    renderTareas();
  }
  if (accion === "editar") {
    activarEdicion(index);
  }
  if (accion === "guardar") {
    const li = lista.children[index];
    const titulo = li.querySelector("#edit-titulo").value;
    const subtitulo = li.querySelector("#edit-subtitulo").value;
    const descripcion = li.querySelector("#edit-descripcion").value;
    const color = li.querySelector("#edit-color").value;
    tareas[index] = { ...tareas[index], titulo, subtitulo, descripcion, color };
    renderTareas();
  }
  if (accion === "cancelar") {
    renderTareas();
  }
});

function activarEdicion(index) {
  const tarea = tareas[index];
  const li = lista.children[index];
  li.classList.add("editando");
  li.innerHTML = `
    <input type="text" id="edit-titulo" value="${tarea.titulo}">
    <input type="text" id="edit-subtitulo" value="${tarea.subtitulo}">
    <textarea id="edit-descripcion">${tarea.descripcion}</textarea>
    <select id="edit-color">
      <option value="#ffffff" ${tarea.color === "#ffffff" ? "selected" : ""}>Blanco</option>
      <option value="#ffdddd" ${tarea.color === "#ffdddd" ? "selected" : ""}>Rojo suave</option>
      <option value="#ddffdd" ${tarea.color === "#ddffdd" ? "selected" : ""}>Verde suave</option>
      <option value="#ddeeff" ${tarea.color === "#ddeeff" ? "selected" : ""}>Azul suave</option>
      <option value="#fff7cc" ${tarea.color === "#fff7cc" ? "selected" : ""}>Amarillo suave</option>
    </select>
    <div class="acciones">
      <button data-accion="guardar" data-index="${index}">💾</button>
      <button data-accion="cancelar" data-index="${index}">❌</button>
    </div>
  `;
}

renderTareas();
