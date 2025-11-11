const btnLogout = document.getElementById("logout");

btnLogout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = `../index.html`;
});
