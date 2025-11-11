import { login, handleGoogleCredential } from "../api/users.js";

const form = document.querySelector(".item-form");
const btnLogin = document.getElementById("login");
const emailEl = document.getElementById("email");
const passEl = document.getElementById("password");
const msgBox = document.querySelector(".error #msg_error");

const REDIRECT_AFTER_LOGIN = "home.html";

const GOOGLE_CLIENT_ID =
  "475791639669-94mbsgo76dv503q9rtrr4tv10qn9g7o7.apps.googleusercontent.com";

window.addEventListener("DOMContentLoaded", () => {
  const gsi = document.getElementById("gsi");
  if (window.google && google.accounts?.id) {
    initGoogle();
  } else {
    gsi.addEventListener("load", initGoogle, { once: true });
  }
});

function showError(message) {
  if (msgBox) {
    msgBox.textContent = message;
    msgBox.parentElement.style.display = "block";
  } else {
    alert(message);
  }
}

function clearError() {
  if (msgBox) {
    msgBox.textContent = "";
    msgBox.parentElement.style.display = "none";
  }
}

async function handleLogin(e) {
  e?.preventDefault?.();
  clearError();

  const email = emailEl?.value.trim();
  const senha = passEl?.value;

  if (!email || !senha) {
    showError("Preencha e-mail e senha.");
    return;
  }

  const prev = btnLogin?.innerText;
  if (btnLogin) {
    btnLogin.disabled = true;
    btnLogin.innerText = "Entrando...";
  }

  try {
    const res = await login({ email, senha });

    if (!res.ok) {
      showError(res.error || "E-mail ou senha inválidos.");
      return;
    }
    localStorage.setItem("token", res.jwtToken);
    window.location.href = REDIRECT_AFTER_LOGIN;
  } catch (err) {
    showError("Falha ao entrar. Tente novamente.");
  } finally {
    if (btnLogin) {
      btnLogin.disabled = false;
      btnLogin.innerText = prev || "ENTRAR";
    }
  }
}

form?.addEventListener("submit", handleLogin);
btnLogin?.addEventListener("click", handleLogin);
passEl?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleLogin(e);
});

function initGoogle() {
  if (!window.google || !google.accounts || !google.accounts.id) return;
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCredential,
    auto_select: false,
  });

  const container = document.getElementById("g_btn_container");
  container.innerHTML = ""; 
  google.accounts.id.renderButton(container, {
    theme: "outline",
    size: "large",
    text: "signin_with",
    shape: "rect",
    logo_alignment: "left",
    width: 320,
  });
}

