const tituloInput = document.getElementById('titulo');
const subtituloInput = document.getElementById('subtitulo');
const descripcionInput = document.getElementById('descripcion');
const boton = document.getElementById('agregar-tarea');
const lista = document.getElementById('lista-tareas');

let tareas = [];

function render() {
  lista.innerHTML = "";

  tareas.forEach((tarea, index) => {
    const li = document.createElement('li');
    if (tarea.hecha) li.classList.add('hecha');

    // Botones de acción
    const botones = document.createElement('div');
    botones.classList.add('botones');

    const btnHecho = document.createElement('button');
    btnHecho.textContent = "✔";
    btnHecho.classList.add('hecho');
    btnHecho.title = "Marcar como hecha";
    btnHecho.addEventListener('click', () => {
      tarea.hecha = !tarea.hecha;
      render();
    });

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = "🗑️";
    btnEliminar.classList.add('eliminar');
    btnEliminar.title = "Eliminar tarea";
    btnEliminar.addEventListener('click', () => {
      tareas.splice(index, 1);
      render();
    });

    botones.appendChild(btnHecho);
    botones.appendChild(btnEliminar);

    // Contenido textual
    const titulo = document.createElement('h3');
    titulo.textContent = tarea.titulo;

    const subtitulo = document.createElement('h4');
    subtitulo.textContent = tarea.subtitulo;

    const detalle = document.createElement('details');
    const resumen = document.createElement('summary');
    resumen.textContent = "Ver descripción";
    const descripcion = document.createElement('p');
    descripcion.textContent = tarea.descripcion;

    detalle.appendChild(resumen);
    detalle.appendChild(descripcion);

    li.appendChild(botones);
    li.appendChild(titulo);
    if (tarea.subtitulo) li.appendChild(subtitulo);
    if (tarea.descripcion) li.appendChild(detalle);

    lista.appendChild(li);
  });
}

boton.addEventListener('click', () => {
  const titulo = tituloInput.value.trim();
  const subtitulo = subtituloInput.value.trim();
  const descripcion = descripcionInput.value.trim();

  if (titulo !== "") {
    tareas.push({ titulo, subtitulo, descripcion, hecha: false });
    tituloInput.value = "";
    subtituloInput.value = "";
    descripcionInput.value = "";
    render();
  }
});
