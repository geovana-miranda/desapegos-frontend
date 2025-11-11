import { createUser } from "../api/users.js";

const btnRegister = document.getElementById("register");
const msgError = document.querySelector(".error");

btnRegister.addEventListener("click", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  const user = {
    nome: name,
    email,
    senha: password,
    perfil: 1,
  };

  const result = await createUser(user);

  if (result.error) {
    msgError.classList.remove("error");
    return;
  }

  if (result) {
    alert("Usuário cadastrado com sucesso!");
    document.querySelector("form").reset();
    window.location.href = `index.html`;
  } else {
    alert("Erro ao cadastrar usuário. Tente novamente.");
  }
});
