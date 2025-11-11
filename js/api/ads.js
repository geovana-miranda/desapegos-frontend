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

    const formData = new FormData();

    formData.append("titulo", newAd.titulo);
    formData.append("descricao", newAd.descricao);
    formData.append("categoria", newAd.categoria);
    formData.append("estadoConservacao", newAd.estadoConservacao);
    formData.append("cep", newAd.cep);
    formData.append("logradouro", newAd.logradouro);
    formData.append("bairro", newAd.bairro);
    formData.append("localidade", newAd.localidade);
    formData.append("uf", newAd.uf);

    if (newAd.imagem) {
      formData.append("imagemUpload", newAd.imagem);
    }

    const res = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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

    const formData = new FormData();

    formData.append("id", id);
    formData.append("titulo", updatedAd.titulo);
    formData.append("descricao", updatedAd.descricao);
    formData.append("categoria", updatedAd.categoria);
    formData.append("estadoConservacao", updatedAd.estadoConservacao);
    formData.append("cep", updatedAd.cep);
    formData.append("logradouro", updatedAd.logradouro);
    formData.append("bairro", updatedAd.bairro);
    formData.append("localidade", updatedAd.localidade);
    formData.append("uf", updatedAd.uf);
    formData.append("status", updatedAd.status);

    if (updatedAd.imagem) {
      formData.append("imagemUpload", updatedAd.imagem);
    }

    const res = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
