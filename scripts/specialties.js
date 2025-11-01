document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "http://localhost:3000/api/specialties";
  const mainContainer = document.querySelector(".card.shadow-sm .card-body");
  const btnNuevo = document.getElementById("btnNuevo");

  const modalElement = document.getElementById("modalMedico");
  const modal = new bootstrap.Modal(modalElement);

  let specialties = [];
  let specialtyEditando = null;

  // ================== API ==================
  async function fetchSpecialties() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener especialidades");
      specialties = await res.json();
      renderCards();
    } catch (err) {
      console.error(err);
      mainContainer.innerHTML = `<div class="text-center text-danger py-4">Error al cargar las especialidades</div>`;
    }
  }

  async function crearSpecialty(specialty) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(specialty),
      });
      if (!res.ok) throw new Error("Error al crear la especialidad");
      await fetchSpecialties();
    } catch (err) {
      alert(err.message);
    }
  }

  async function actualizarSpecialty(specialty) {
    try {
      const res = await fetch(API_URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(specialty),
      });
      if (!res.ok) throw new Error("Error al actualizar la especialidad");
      await fetchSpecialties();
    } catch (err) {
      alert(err.message);
    }
  }

  async function eliminarSpecialty(id) {
    if (!confirm("¿Desea eliminar esta especialidad?")) return;
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Error al eliminar la especialidad");
      await fetchSpecialties();
    } catch (err) {
      alert(err.message);
    }
  }

  // ================== RENDER ==================
  function renderCards() {
    mainContainer.innerHTML = "";
    if (!specialties.length) {
      mainContainer.innerHTML = `<div class="text-center text-muted py-4">No hay especialidades</div>`;
      return;
    }

    const contenedor = document.createElement("div");
    contenedor.className = "row row-cols-1 row-cols-md-3 g-3";

    contenedor.innerHTML = specialties
      .map(
        (s) => `
      <div class="col">
        <div class="card shadow-sm h-100">
          <img src="${
            s.image
              ? `data:image/jpeg;base64,${s.image}`
              : "https://via.placeholder.com/400x200?text=Especialidad"
          }" class="card-img-top" alt="${s.name}">
          <div class="card-body">
            <h5 class="card-title">${s.name}</h5>
            <p class="card-text">${s.description || "Sin descripción"}</p>
            <div class="d-flex justify-content-end gap-2">
              <button class="btn btn-sm btn-outline-primary editar-btn" data-id="${
                s._id
              }"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger eliminar-btn" data-id="${
                s._id
              }"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    `,
      )
      .join("");

    mainContainer.appendChild(contenedor);
  }

  // ================== EVENTOS ==================
  mainContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = btn.dataset.id;
    const specialty = specialties.find((s) => s._id === id);

    if (btn.classList.contains("editar-btn")) abrirModalEditar(specialty);
    if (btn.classList.contains("eliminar-btn")) eliminarSpecialty(id);
  });

  btnNuevo.addEventListener("click", abrirModalNuevo);

  modalElement
    .querySelector("#guardarMedico")
    .addEventListener("click", async () => {
      const nombre = document.getElementById("nombres").value.trim();
      const descripcion = document.getElementById("especialidad").value.trim();
      const imagen = ""; // opcional: captura Base64 si quieres

      if (!nombre) {
        alert("El nombre es obligatorio");
        return;
      }

      const nuevo = { name: nombre, description: descripcion, image: imagen };

      if (specialtyEditando) {
        await actualizarSpecialty({ _id: specialtyEditando._id, ...nuevo });
      } else {
        await crearSpecialty(nuevo);
      }

      modal.hide();
    });

  function abrirModalNuevo() {
    specialtyEditando = null;
    document.getElementById("modalTitle").textContent = "Nueva Especialidad";
    document.getElementById("nombres").value = "";
    document.getElementById("especialidad").value = "";
    modal.show();
  }

  function abrirModalEditar(specialty) {
    specialtyEditando = specialty;
    document.getElementById("modalTitle").textContent = "Editar Especialidad";
    document.getElementById("nombres").value = specialty.name;
    document.getElementById("especialidad").value = specialty.description;
    modal.show();
  }

  // ================== INICIALIZAR ==================
  await fetchSpecialties();
});
