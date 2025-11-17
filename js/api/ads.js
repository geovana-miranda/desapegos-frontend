import { URL_BASE } from "./apiConfig.js";

const URL = `${URL_BASE}/anuncios`;

export async function getAds() {
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
    console.error("Erro ao buscar anúncios:", error);
    return [];
  }
}

export async function getAdById(id) {
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
    console.error("Erro ao buscar anúncio:", error);
    return null;
  }
}

export async function getAdByUserId() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${URL}/meus-anuncios`, {
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
    console.error("Erro ao buscar anúncio:", error);
    return [];
  }
}

export async function getAdByIdAndUserId(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${URL}/meus-anuncios/${id}`, {
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
    console.error("Erro ao buscar anúncio:", error);
    return null;
  }
}

export async function getAdExceptUser() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${URL}/outros`, {
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
    console.error("Erro ao buscar anúncio:", error);
    return [];
  }
}

export async function AddNewAd(newAd) {
  try {
    const token = localStorage.getItem("token");

    let imagemBase64 = null;

    if (newAd.imagem) {
      imagemBase64 = await fileToBase64(newAd.imagem);
      imagemBase64 = imagemBase64.split(",")[1];
    }

    const ad = {
      titulo: newAd.titulo,
      descricao: newAd.descricao,
      categoria: newAd.categoria,
      estadoConservacao: newAd.estadoConservacao,
      cep: newAd.cep,
      logradouro: newAd.logradouro,
      bairro: newAd.bairro,
      localidade: newAd.localidade,
      uf: newAd.uf,
      imagemBase64: imagemBase64,
    };

    const res = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ad),
    });

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao adicionar anúncio:", error);
    return null;
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export async function deleteAd(id) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar anúncio: ${response.status}`);
    }

    alert("Anúncio deletado com sucesso!");
    window.location.href = "home.html";
  } catch (error) {
    console.error("Erro ao deletar anúncio:", error);
    alert("Não foi possível deletar o anúncio.");
  }
}

export async function updateAd(id, updatedAd) {
  try {
    const token = localStorage.getItem("token");

    let imagemBase64 = null;

    if (updatedAd.imagem) {
      imagemBase64 = await fileToBase64(updatedAd.imagem);
      imagemBase64 = imagemBase64.split(",")[1];
    }

    const ad = {
      id,
      titulo: updatedAd.titulo,
      descricao: updatedAd.descricao,
      categoria: updatedAd.categoria,
      estadoConservacao: updatedAd.estadoConservacao,
      cep: updatedAd.cep,
      logradouro: updatedAd.logradouro,
      bairro: updatedAd.bairro,
      localidade: updatedAd.localidade,
      uf: updatedAd.uf,
      imagemBase64: imagemBase64,
    };

    const res = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ad),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Erro ao atualizar anúncio:", errorText);
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    return true;
  } catch (error) {
    console.error("Erro ao atualizar anúncio:", error);
    alert("Não foi possível atualizar o anúncio.");
  }
}
