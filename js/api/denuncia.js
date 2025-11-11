import { URL_BASE } from "./apiConfig.js";

const URL = `${URL_BASE}/denuncias`;

export async function criarDenuncia(denuncia) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(denuncia),
    });

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Erro ao criar denuncia:", error);
    return null;
  }

}
export async function getAll() {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Erro ao buscar denuncias:", error);
    return [];
  }

}

export async function atualizarStatus(id, novoStatus) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(novoStatus),
    });

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }
  return true;
  } catch (error) {
    console.error("Erro ao atualizar status da denuncia:", error);
    return null;
  }

}
export async function getById(id) {

  try {
    const token = localStorage.getItem("token");
   const res = await fetch(`${URL}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });  

  if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    const data = await res.json();

    return data;
 } catch (error) {
   console.error("Erro ao buscar denuncia:", error);
   return null;
  }

}
