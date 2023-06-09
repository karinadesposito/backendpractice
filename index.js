const form = document.getElementById("form");
  form.addEventListener("submit", handleSubmit);
  function handleSubmit() {    
    const user = new FormData(form);

    console.log(user.get("name"));
  }
  const openModal = document.getElementById("open-modal");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("close-modal");
  closeModal.addEventListener("click", () => {
    modal.close();
  });
  openModal.addEventListener("click", () => {
    modal.showModal();
  })
  
const tabla = document.getElementById("miTabla");
const baseUrl = "https://647a6fb6d2e5b6101db05b10.mockapi.io/listado"
const getMockapi = () => {
  fetch(baseUrl)
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const fila = document.createElement("tr");
      const nombre = document.createElement("td");
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
      btnModificar.dataset.empresaId =
      acciones.appendChild(btnModificar);

      function abrirFormConValores(data) { 
        modal.showModal();   
// traer los datos de la fila
        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const phoneField = document.getElementById("phone");

      // Traer los valores de esos datos
         nameField.value = data.name;
         emailField.value = data.email;
         phoneField.value = data.phone;
      }
      btnModificar.addEventListener("click", () => {
      abrirFormConValores(item);      
      editarEmpresa.name;
      editarEmpresa.email;
      editarEmpresa.phone;
      
      });    
                           
      
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.classList.add("btnEliminar");
      acciones.appendChild(btnEliminar);

      btnEliminar.addEventListener("click", () => {        
        deleteOne();
      });
      fila.appendChild(acciones);
      tabla.appendChild(fila);
    });
  });

  function getAll(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }
  //get resource by id
  function getOne(id) {
    fetch(baseUrl + `/${id}`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }
  //delete one
  function deleteOne(id) {
    fetch(baseUrl + `/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }
  
  function addOne(user) {
    fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  function editarEmpresa(id,item) {
    fetch(baseUrl + `/${id}`, {  
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // Actualizar los valores en el formulario
      const nameField = document.getElementById("name");
      const emailField = document.getElementById("email");
      const phoneField = document.getElementById("phone");

      nameField.value = data.name;
      emailField.value = data.email;
      phoneField.value = data.phone;
    }) 
    .catch(err => console.error(err));
  }}
     
      
  getMockapi();

deleteOne(baseUrl, 20); 
