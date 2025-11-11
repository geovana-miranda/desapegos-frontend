import { URL_BASE } from "./apiConfig.js";

const URL = `${URL_BASE}/Favoritos`;

const token = localStorage.getItem("token");

export async function checkFavoritado(anuncioId) {
  const r = await fetch(`${URL}/anuncios/${anuncioId}/is-favoritado`, {
 headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  if (!r.ok) return { isFavoritado: false };
  return r.json();
}

export async function createFavorito(anuncioId) {
  const r = await fetch(`${URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ anuncioId }),
  });

  if (!r.ok) {
    throw new Error(`Erro ao favoritar item HTTP: ${r.status}`);
  }
  const data = await r.json();
  return data;
}

export async function deleteFavorito(anuncioId) {
  const r = await fetch(`${URL}/anuncios/${anuncioId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!r.ok) {
    throw new Error(`Erro ao remover favorito HTTP: ${r.status}`);
  }

  alert("Favorito removido com sucesso!");
}

export async function listarMeusFavoritos() {
  const r = await fetch(`${URL}/mine`, {
 headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  if (!r.ok) return [];
  return r.json();
}
