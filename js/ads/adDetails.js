import { getAdById, deleteAd, getAdByIdAndUserId } from "../api/ads.js";
import { getById } from "../api/denuncia.js";
import {
  checkFavoritado,
  createFavorito,
  deleteFavorito,
} from "../api/favoritos.js";
import { categorias } from "../utils/categories.js";
import { estados } from "../utils/conservationStatus.js";
import { status } from "../utils/availabilityStatus.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let ad;

if (window.location.pathname.includes("/denuncia/anuncio.html")) {
  const denuncia = await getById(id);

  if (denuncia) {
    ad = await getAdById(denuncia.anuncioId);
    carregarAd(ad);
  }
} else if (window.location.pathname.includes("meu-anuncio.html")) {
  ad = await getAdByIdAndUserId(id);

  if (!ad) {
    window.location.href = `not-found.html`;
  } else {
    carregarAd(ad);
  }
} else if (window.location.pathname.includes("anuncio.html")) {
  ad = await getAdByIdAndUserId(id);

  if (ad) {
    window.location.href = `meu-anuncio.html?id=${ad.id}`;
  } else {
    ad = await getAdById(id);

    if (ad) {
      carregarAd(ad);
    } else {
      window.location.href = `not-found.html`;
    }
  }
}

async function carregarAd(ad) {
  if (!ad) {
    document.querySelector(".anuncio-content").innerHTML =
      "<p>Item não encontrado.</p>";
    return;
  }

  const image = !ad.imagem
    ? "/img/no_image.png"
    : `data:image/*;base64,${ad.imagem}`;

  document.getElementById("item-nome").textContent = ad.titulo;
  document.getElementById("item-status").textContent = status[ad.status];
  document
    .getElementById("item-status")
    .classList.add(
      status[ad.status] === "Disponível" ? "disponivel" : "indisponivel"
    );

  document.getElementById("item-descricao").textContent = ad.descricao;
  document.getElementById("item-info").textContent = `${
    categorias[ad.categoria]
  } | ${estados[ad.estadoConservacao]}`;
  document.getElementById(
    "item-localizacao"
  ).textContent = `${ad.logradouro}, ${ad.bairro} - ${ad.localidade}, ${ad.uf}`;

  if (document.getElementById("anuncioId")) {
    document.getElementById("anuncioId").value = ad.id;
  }

  if (document.getElementById("anunciante-nome")) {
    document.getElementById("anunciante-nome").textContent = ad.usuario.nome;
  }

  if (document.getElementById("analisar")) {
    const analisarBtn = document.getElementById("analisar");

    analisarBtn.addEventListener("click", () => {
      window.location.href = `../analise.html?id=${id}`;
    });
  }

  if (image) {
    const mainImage = document.getElementById("main-image");

    mainImage.innerHTML = `      
      <img src="${image}" alt="${ad.titulo}" class="main-image">
      `;
  }

  const deleteBtn = document.getElementById("delete-ad");
  const updateBtn = document.getElementById("update-ad");
  const favorite = document.querySelector(".fav-btn");
  const denunciaBtn = document.getElementById("btn-denuncia");

  if (denunciaBtn) {
    denunciaBtn.addEventListener("click", () => {
      window.location.href = `denunciar.html?id=${ad.id}`;
    });
  }

  if (favorite) {
    const favText = document.querySelector(".fav-text");
    const favIcon = document.querySelector(".fav");
    check(favIcon, favText);

    favorite.addEventListener("click", () => {
      if (favIcon.classList.contains("active")) {
        deleteFavorito(ad.id);
        favIcon.classList.remove("active");
        favIcon.classList.remove("fas");
        favIcon.classList.add("far");
        favText.innerHTML = "<span> FAVORITAR </span>";
      } else {
        createFavorito(ad.id);
        favIcon.classList.add("active");
        favIcon.classList.add("fas");
        favText.innerHTML = "<span> FAVORITADO </span>";
        alert("Item favoritado com sucesso!");
      }
    });
  }

  if (deleteBtn && updateBtn) {
    deleteBtn.addEventListener("click", () => {
      deleteAd(ad.id);
    });

    updateBtn.addEventListener("click", () => {
      window.location.href = `editar-anuncio.html?id=${ad.id}`;
    });
  }

  async function check(favIcon, favText) {
    const check = await checkFavoritado(ad.id);

    if (check.isFavoritado == true) {
      favIcon.classList.add("active");
      favIcon.classList.add("fas");
      favIcon.classList.remove("far");
      favText.innerHTML = "<span> FAVORITADO </span>";
    }
  }
}
