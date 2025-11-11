import { URL_BASE } from "./apiConfig.js";

const URL = `${URL_BASE}/cep`;

export async function buscarCEP(cep) {
  try {
    const res = await fetch(`${URL}/${cep}`);
    
    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar cep:", error);
    return [];
  }
}
