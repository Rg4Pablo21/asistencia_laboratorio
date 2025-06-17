export function createHeader() {
    const header = document.createElement("header");
    header.className = "app-header";
  
    const logo = document.createElement("div");
    logo.className = "logo";
    logo.textContent = "Sistema de Asistencia";
  
    const nav = document.createElement("nav");
  
    const menuItems = [
      { text: "Inicio", id: "home-btn" },
      { text: "Asistencia", id: "asistencia-btn" },
      { text: "Reportes", id: "reportes-btn" },
    ];
  
    menuItems.forEach((item) => {
      const btn = document.createElement("button");
      btn.textContent = item.text;
      btn.className = "nav-btn";
      btn.id = item.id;
      nav.appendChild(btn);
    });
  
    const logout = document.createElement("button");
    logout.id = "logout-btn";
    logout.textContent = "Cerrar sesión";
    logout.addEventListener("click", () => {
      localStorage.removeItem("token");
      location.reload();
    });
  
    header.append(logo, nav, logout);
    return header;
  }