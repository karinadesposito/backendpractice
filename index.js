const form = document.getElementById("form");
let idSelect = null;
let accion = "";
function handleSubmit(event) {
  event.preventDefault(); // Evita el envío del formulario
  const user = new FormData(form);
  const newUser = {
    name: user.get("name"),
    email: user.get("email"),
    phone: user.get("phone"),
  };
  if (accion!= "" && accion =="add" )
  addOne(newUser);
  if (accion!= "" && accion =="modified")
  editarEmpresa(idSelect, newUser);
 modal.close();
 accion = "";
  form.reset();
}
form.addEventListener("submit", handleSubmit);
const agregarEmpresa = document.getElementById("agregarEmpresa");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
closeModal && closeModal.addEventListener("click", () => {
  modal.close();
});
agregarEmpresa.addEventListener("click", () => {
  accion = "add";
  modal.showModal();
});

const modal1 = document.getElementById("modalEliminar");
const modal2Content
const tabla = document.getElementById("miTabla");
const baseUrl = "https://647a6fb6d2e5b6101db05b10.mockapi.io/listado";
function getMockapi() {
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const fila = document.createElement("tr");
        const nombre = document.createElement("td");
        fila.dataset.empresaId = item.id;
        nombre.textContent = item.name;
        fila.appendChild(nombre);
        const email = document.createElement("td");
        email.textContent = item.email;
        fila.appendChild(email);
        const phone = document.createElement("td");
        phone.textContent = item.phone;
        fila.appendChild(phone);
        const id = document.createElement("td");
        id.textContent = item.id;
        fila.appendChild(id);
        const acciones = document.createElement("td");
        const btnModificar = document.createElement("button");
        btnModificar.textContent = "Modificar";
        btnModificar.classList.add("btnModificar");
        btnModificar.dataset.empresaId = item.id;
        acciones.appendChild(btnModificar);
        btnModificar.addEventListener("click", () => {          
          idSelect = item.id;
          accion = "modified";
          abrirFormConValores(item);
        });
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btnEliminar");
        btnEliminar.dataset.empresaId = item.id;
        acciones.appendChild(btnEliminar);
        btnEliminar.addEventListener("click", () => {
          const id = btnEliminar.dataset.empresaId; 
     
          deleteOne(id);
        });
        fila.appendChild(acciones);
        tabla.appendChild(fila);
      });
    });
}
function abrirFormConValores(data) {

  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const phoneField = document.getElementById("phone");

  nameField.value = data.name;
  emailField.value = data.email;
  phoneField.value = data.phone;
  modal.showModal();
}

function deleteOne(id) {
  fetch(baseUrl + `/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
      .then((data) => console.log(data))
    .catch((err) => console.error(err));
}
function addOne(user) {
  fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}
function editarEmpresa(id, item) {
  fetch(baseUrl + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then((data) => {
      const tr = document.querySelector(`tr[data-empresa-id = '${id}']`)
      console.log("responseEditar", data);
     
    })
    .catch((err) => console.error(err));
}
getMockapi();