import { URL_BASE } from "./apiConfig.js";

const URL = `${URL_BASE}/usuarios`;

export async function createUser(user) {
  try {
    const res = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.status === 409) {
      return { error: "Email ou senha inválidos" };
    }

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return null;
  }
}

export async function login(user) {
  try {
    const res = await fetch(`${URL}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.status === 401) {
      return { error: "Email ou senha inválidos" };
    }

    if (!res.ok) {
      throw new Error("Falha na autenticação");
    }

    const data = await res.json();
    const token = data.jwtToken;
    localStorage.setItem("token", token);
    redirecionarPorPerfil(token);
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return null;
  }
}

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

function redirecionarPorPerfil(token) {
  const decoded = parseJwt(token);
  const role = decoded.role;

  if (role === "Usuario") {
    alert("Usuário logado com sucesso!");
    window.location.href = "home.html";
  } else {
    alert("Administrador logado com sucesso!");
    window.location.href = "home-admin.html";
  }
}

export async function handleGoogleCredential(resp) {
  try {
    const idToken = resp.credential;
    const r = await fetch(`${URL_BASE}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (!r.ok) {
      const err = await r.text();
      alert("Falha no login Google: " + err);
      return;
    }

    const data = await r.json();
    localStorage.setItem("token", data.jwtToken);
    window.location.href = "home.html";
  } catch (e) {
    console.error(e);
    alert("Erro ao autenticar com Google.");
  }
}
