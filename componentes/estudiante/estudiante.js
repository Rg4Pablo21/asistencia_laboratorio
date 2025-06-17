export function cargarEstudiantes() {
    const root = document.querySelector("#root");
    root.innerHTML = "";
  
    const cont = document.createElement("div");
    cont.className = "asistencia-container";
  
    const h2 = document.createElement("h2");
    h2.textContent = "Lista de Asistencia";
    cont.appendChild(h2);
  
    // Botón para añadir nuevo alumno
    const btnAgregar = document.createElement("button");
    btnAgregar.className = "btn-agregar";
    btnAgregar.textContent = "➕ Añadir Alumno";
    btnAgregar.onclick = agregarAlumno;
    cont.appendChild(btnAgregar);
  
    const tabla = document.createElement("table");
    tabla.className = "tabla-estudiantes";
    tabla.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Asistencia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody></tbody>`;
    const tbody = tabla.querySelector("tbody");
  
    // Obtener estudiantes de localStorage o array inicial
    const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [
      { nombre: "Carlos Pérez" },
      { nombre: "Ana López" },
      { nombre: "Luis Gómez" },
      { nombre: "María Torres" },
      { nombre: "Pedro Martínez" },
      { nombre: "Sofía Ramírez" },
      { nombre: "Diego Hernández" },
      { nombre: "Valeria Ruiz" },
      { nombre: "Javier Castro" },
      { nombre: "Lucía Morales" }
    ];
  
    const motivos = JSON.parse(localStorage.getItem("motivos") || "{}");
    const uniformes = JSON.parse(localStorage.getItem("uniformes") || "{}");
  
    estudiantes.forEach((estudiante, i) => {
      const tr = document.createElement("tr");
  
      // Número
      const tdNum = document.createElement("td");
      tdNum.textContent = i + 1;
  
      // Nombre
      const tdNom = document.createElement("td");
      tdNom.textContent = estudiante.nombre;
  
      // Botones de asistencia
      const tdBtns = document.createElement("td");
      tdBtns.className = "asistencia-botones";
  
      const bOk = crearBtn("✔", "btn-check");
      const bNo = crearBtn("✘", "btn-x");
      const bUni = crearBtn("👕", "btn-uniforme");
      const bCorreo = crearBtn("📧", "btn-correo");
  
      if (motivos[estudiante.nombre]) {
        bCorreo.style.backgroundColor = "#ffcc00";
      }
  
      bOk.onclick = () => marcar(bOk, bNo);
      bNo.onclick = () => marcar(bNo, bOk);
      bUni.onclick = () => cargarUniforme(estudiante.nombre);
      bCorreo.onclick = () => abrirMotivo(estudiante.nombre);
  
      tdBtns.append(bOk, bNo, bUni, bCorreo);
  
      // Botón eliminar
      const tdAcciones = document.createElement("td");
      const btnEliminar = crearBtn("🗑️", "btn-eliminar");
      btnEliminar.onclick = () => eliminarAlumno(estudiante.nombre);
      tdAcciones.appendChild(btnEliminar);
  
      tr.append(tdNum, tdNom, tdBtns, tdAcciones);
      tbody.appendChild(tr);
    });
  
    cont.appendChild(tabla);
  
    // Barra de botones inferiores
    const barra = document.createElement("div");
    barra.className = "botones-container";
  
    const bTodosOk = crearBtnTexto("Marcar Todos Presentes");
    const bTodosNo = crearBtnTexto("Marcar Todos Ausentes");
    const bGuardar = crearBtnTexto("Guardar Asistencia", "btn-guardar");
  
    bTodosOk.onclick = () => document.querySelectorAll(".btn-check").forEach(b => b.click());
    bTodosNo.onclick = () => document.querySelectorAll(".btn-x").forEach(b => b.click());
    bGuardar.onclick = () => alert("Asistencia guardada (demo)");
  
    barra.append(bTodosOk, bTodosNo, bGuardar);
    cont.appendChild(barra);
    root.appendChild(cont);
  
    // Funciones auxiliares
    function crearBtn(txt, cls) {
      const b = document.createElement("button");
      b.textContent = txt;
      b.className = cls;
      return b;
    }
  
    function crearBtnTexto(txt, cls = "btn-todos") {
      const b = document.createElement("button");
      b.textContent = txt;
      b.className = cls;
      return b;
    }
  
    function marcar(act, inac) {
      act.classList.add("activo");
      inac.classList.remove("activo");
    }
  
    function agregarAlumno() {
      const nombre = prompt("Ingrese el nombre del nuevo alumno:");
      if (nombre && nombre.trim() !== "") {
        const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
        estudiantes.push({ nombre: nombre.trim() });
        localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
        cargarEstudiantes();
      }
    }
  
    function eliminarAlumno(nombre) {
      if (confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
        // Eliminar de estudiantes
        let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
        estudiantes = estudiantes.filter(est => est.nombre !== nombre);
        localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
        
        // Eliminar datos relacionados
        const motivos = JSON.parse(localStorage.getItem("motivos") || "{}");
        delete motivos[nombre];
        localStorage.setItem("motivos", JSON.stringify(motivos));
        
        const uniformes = JSON.parse(localStorage.getItem("uniformes") || "{}");
        delete uniformes[nombre];
        localStorage.setItem("uniformes", JSON.stringify(uniformes));
        
        cargarEstudiantes();
      }
    }
  
    function abrirMotivo(nombre) {
      root.innerHTML = "";
      const cont = document.createElement("div");
      cont.className = "motivo-container";
  
      const h3 = document.createElement("h3");
      h3.textContent = `Motivo de: ${nombre}`;
      cont.appendChild(h3);
  
      const txtMot = document.createElement("textarea");
      txtMot.placeholder = "Motivo...";
      txtMot.value = motivos[nombre] || "";
  
      const btnGuardar = document.createElement("button");
      btnGuardar.textContent = "Guardar Motivo";
      btnGuardar.onclick = () => {
        motivos[nombre] = txtMot.value;
        localStorage.setItem("motivos", JSON.stringify(motivos));
        alert("Motivo guardado");
        cargarEstudiantes();
      };
  
      const btnVolver = document.createElement("button");
      btnVolver.textContent = "Volver";
      btnVolver.onclick = cargarEstudiantes;
  
      cont.append(txtMot, btnGuardar, btnVolver);
      root.appendChild(cont);
    }
  }
  
  function cargarUniforme(nombreAlumno) {
    const root = document.querySelector("#root");
    root.innerHTML = "";
  
    const cont = document.createElement("div");
    cont.className = "uniforme-container";
  
    const h3 = document.createElement("h3");
    h3.textContent = `Uniforme de: ${nombreAlumno}`;
    cont.appendChild(h3);
  
    const piezas = [
      { id: "camisa", url: "https://st2.depositphotos.com/29688696/43853/v/450/depositphotos_438537390-stock-illustration-shirt-icon-vector-simple-flat.jpg" },
      { id: "pantalon", url: "https://www.shutterstock.com/image-vector/pants-icon-thin-line-art-260nw-2542676957.jpg" },
      { id: "zapatos", url: "https://www.shutterstock.com/image-vector/sport-shoes-icon-logo-isolated-260nw-1843128061.jpg" }
    ];
  
    const grid = document.createElement("div");
    grid.className = "uniforme-opciones";
  
    const data = JSON.parse(localStorage.getItem("uniformes") || "{}");
    const estados = data[nombreAlumno] || {
      camisa: "ninguno",
      pantalon: "ninguno",
      zapatos: "ninguno",
      motivo: ""
    };
  
    piezas.forEach(p => {
      const item = document.createElement("div");
      item.className = "uniforme-item";
      item.dataset.id = p.id;
  
      const img = document.createElement("img");
      img.src = p.url;
      const lbl = document.createElement("p");
      lbl.textContent = p.id.charAt(0).toUpperCase() + p.id.slice(1);
  
      item.append(img, lbl);
      grid.appendChild(item);
  
      const pintar = () => {
        item.style.border = "4px solid";
        item.style.borderColor =
          estados[p.id] === "si" ? "green" :
          estados[p.id] === "no" ? "red" : "#ccc";
      };
      pintar();
  
      item.onclick = () => {
        estados[p.id] = estados[p.id] === "ninguno" ? "si"
                      : estados[p.id] === "si" ? "no"
                      : "ninguno";
        pintar();
      };
    });
  
    const txtMot = document.createElement("textarea");
    txtMot.placeholder = "Motivo si NO trajo uniforme completo…";
    txtMot.value = estados.motivo || "";
  
    const btnGuardar = document.createElement("button");
    btnGuardar.textContent = "Guardar Uniforme";
    btnGuardar.onclick = () => {
      estados.motivo = txtMot.value;
      estados.completo = estados.camisa === "si" && estados.pantalon === "si" && estados.zapatos === "si";
      data[nombreAlumno] = estados;
      localStorage.setItem("uniformes", JSON.stringify(data));
      cargarEstudiantes();
    };
  
    const btnVolver = document.createElement("button");
    btnVolver.textContent = "Volver";
    btnVolver.onclick = cargarEstudiantes;
  
    cont.append(grid, txtMot, btnGuardar, btnVolver);
    root.appendChild(cont);
  }export function cargarEstudiantes() {
    const root = document.querySelector("#root");
    root.innerHTML = "";
  
    const cont = document.createElement("div");
    cont.className = "asistencia-container";
  
    const h2 = document.createElement("h2");
    h2.textContent = "Lista de Asistencia";
    cont.appendChild(h2);
  
    // Botón para añadir nuevo alumno
    const btnAgregar = document.createElement("button");
    btnAgregar.className = "btn-agregar";
    btnAgregar.textContent = "➕ Añadir Alumno";
    btnAgregar.onclick = agregarAlumno;
    cont.appendChild(btnAgregar);
  
    const tabla = document.createElement("table");
    tabla.className = "tabla-estudiantes";
    tabla.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Asistencia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody></tbody>`;
    const tbody = tabla.querySelector("tbody");
  
    // Obtener estudiantes de localStorage o array inicial
    const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [
      { nombre: "Carlos Pérez" },
      { nombre: "Ana López" },
      { nombre: "Luis Gómez" },
      { nombre: "María Torres" },
      { nombre: "Pedro Martínez" },
      { nombre: "Sofía Ramírez" },
      { nombre: "Diego Hernández" },
      { nombre: "Valeria Ruiz" },
      { nombre: "Javier Castro" },
      { nombre: "Lucía Morales" }
    ];
  
    const motivos = JSON.parse(localStorage.getItem("motivos") || "{}");
    const uniformes = JSON.parse(localStorage.getItem("uniformes") || "{}");
  
    estudiantes.forEach((estudiante, i) => {
      const tr = document.createElement("tr");
  
      // Número
      const tdNum = document.createElement("td");
      tdNum.textContent = i + 1;
  
      // Nombre
      const tdNom = document.createElement("td");
      tdNom.textContent = estudiante.nombre;
  
      // Botones de asistencia
      const tdBtns = document.createElement("td");
      tdBtns.className = "asistencia-botones";
  
      const bOk = crearBtn("✔", "btn-check");
      const bNo = crearBtn("✘", "btn-x");
      const bUni = crearBtn("👕", "btn-uniforme");
      const bCorreo = crearBtn("📧", "btn-correo");
  
      if (motivos[estudiante.nombre]) {
        bCorreo.style.backgroundColor = "#ffcc00";
      }
  
      bOk.onclick = () => marcar(bOk, bNo);
      bNo.onclick = () => marcar(bNo, bOk);
      bUni.onclick = () => cargarUniforme(estudiante.nombre);
      bCorreo.onclick = () => abrirMotivo(estudiante.nombre);
  
      tdBtns.append(bOk, bNo, bUni, bCorreo);
  
      // Botón eliminar
      const tdAcciones = document.createElement("td");
      const btnEliminar = crearBtn("🗑️", "btn-eliminar");
      btnEliminar.onclick = () => eliminarAlumno(estudiante.nombre);
      tdAcciones.appendChild(btnEliminar);
  
      tr.append(tdNum, tdNom, tdBtns, tdAcciones);
      tbody.appendChild(tr);
    });
  
    cont.appendChild(tabla);
  
    // Barra de botones inferiores
    const barra = document.createElement("div");
    barra.className = "botones-container";
  
    const bTodosOk = crearBtnTexto("Marcar Todos Presentes");
    const bTodosNo = crearBtnTexto("Marcar Todos Ausentes");
    const bGuardar = crearBtnTexto("Guardar Asistencia", "btn-guardar");
  
    bTodosOk.onclick = () => document.querySelectorAll(".btn-check").forEach(b => b.click());
    bTodosNo.onclick = () => document.querySelectorAll(".btn-x").forEach(b => b.click());
    bGuardar.onclick = () => alert("Asistencia guardada (demo)");
  
    barra.append(bTodosOk, bTodosNo, bGuardar);
    cont.appendChild(barra);
    root.appendChild(cont);
  
    // Funciones auxiliares
    function crearBtn(txt, cls) {
      const b = document.createElement("button");
      b.textContent = txt;
      b.className = cls;
      return b;
    }
  
    function crearBtnTexto(txt, cls = "btn-todos") {
      const b = document.createElement("button");
      b.textContent = txt;
      b.className = cls;
      return b;
    }
  
    function marcar(act, inac) {
      act.classList.add("activo");
      inac.classList.remove("activo");
    }
  
    function agregarAlumno() {
      const nombre = prompt("Ingrese el nombre del nuevo alumno:");
      if (nombre && nombre.trim() !== "") {
        const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
        estudiantes.push({ nombre: nombre.trim() });
        localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
        cargarEstudiantes();
      }
    }
  
    function eliminarAlumno(nombre) {
      if (confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
        // Eliminar de estudiantes
        let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
        estudiantes = estudiantes.filter(est => est.nombre !== nombre);
        localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
        
        // Eliminar datos relacionados
        const motivos = JSON.parse(localStorage.getItem("motivos") || "{}");
        delete motivos[nombre];
        localStorage.setItem("motivos", JSON.stringify(motivos));
        
        const uniformes = JSON.parse(localStorage.getItem("uniformes") || "{}");
        delete uniformes[nombre];
        localStorage.setItem("uniformes", JSON.stringify(uniformes));
        
        cargarEstudiantes();
      }
    }
  
    function abrirMotivo(nombre) {
      root.innerHTML = "";
      const cont = document.createElement("div");
      cont.className = "motivo-container";
  
      const h3 = document.createElement("h3");
      h3.textContent = `Motivo de: ${nombre}`;
      cont.appendChild(h3);
  
      const txtMot = document.createElement("textarea");
      txtMot.placeholder = "Motivo...";
      txtMot.value = motivos[nombre] || "";
  
      const btnGuardar = document.createElement("button");
      btnGuardar.textContent = "Guardar Motivo";
      btnGuardar.onclick = () => {
        motivos[nombre] = txtMot.value;
        localStorage.setItem("motivos", JSON.stringify(motivos));
        alert("Motivo guardado");
        cargarEstudiantes();
      };
  
      const btnVolver = document.createElement("button");
      btnVolver.textContent = "Volver";
      btnVolver.onclick = cargarEstudiantes;
  
      cont.append(txtMot, btnGuardar, btnVolver);
      root.appendChild(cont);
    }
  }
  
  function cargarUniforme(nombreAlumno) {
    const root = document.querySelector("#root");
    root.innerHTML = "";
  
    const cont = document.createElement("div");
    cont.className = "uniforme-container";
  
    const h3 = document.createElement("h3");
    h3.textContent = `Uniforme de: ${nombreAlumno}`;
    cont.appendChild(h3);
  
    const piezas = [
      { id: "camisa", url: "https://st2.depositphotos.com/29688696/43853/v/450/depositphotos_438537390-stock-illustration-shirt-icon-vector-simple-flat.jpg" },
      { id: "pantalon", url: "https://www.shutterstock.com/image-vector/pants-icon-thin-line-art-260nw-2542676957.jpg" },
      { id: "zapatos", url: "https://www.shutterstock.com/image-vector/sport-shoes-icon-logo-isolated-260nw-1843128061.jpg" }
    ];
  
    const grid = document.createElement("div");
    grid.className = "uniforme-opciones";
  
    const data = JSON.parse(localStorage.getItem("uniformes") || "{}");
    const estados = data[nombreAlumno] || {
      camisa: "ninguno",
      pantalon: "ninguno",
      zapatos: "ninguno",
      motivo: ""
    };
  
    piezas.forEach(p => {
      const item = document.createElement("div");
      item.className = "uniforme-item";
      item.dataset.id = p.id;
  
      const img = document.createElement("img");
      img.src = p.url;
      const lbl = document.createElement("p");
      lbl.textContent = p.id.charAt(0).toUpperCase() + p.id.slice(1);
  
      item.append(img, lbl);
      grid.appendChild(item);
  
      const pintar = () => {
        item.style.border = "4px solid";
        item.style.borderColor =
          estados[p.id] === "si" ? "green" :
          estados[p.id] === "no" ? "red" : "#ccc";
      };
      pintar();
  
      item.onclick = () => {
        estados[p.id] = estados[p.id] === "ninguno" ? "si"
                      : estados[p.id] === "si" ? "no"
                      : "ninguno";
        pintar();
      };
    });
  
    const txtMot = document.createElement("textarea");
    txtMot.placeholder = "Motivo si NO trajo uniforme completo…";
    txtMot.value = estados.motivo || "";
  
    const btnGuardar = document.createElement("button");
    btnGuardar.textContent = "Guardar Uniforme";
    btnGuardar.onclick = () => {
      estados.motivo = txtMot.value;
      estados.completo = estados.camisa === "si" && estados.pantalon === "si" && estados.zapatos === "si";
      data[nombreAlumno] = estados;
      localStorage.setItem("uniformes", JSON.stringify(data));
      cargarEstudiantes();
    };
  
    const btnVolver = document.createElement("button");
    btnVolver.textContent = "Volver";
    btnVolver.onclick = cargarEstudiantes;
  
    cont.append(grid, txtMot, btnGuardar, btnVolver);
    root.appendChild(cont);
  }