import { criarDenuncia } from "../api/denuncia.js";
import { getAdById } from "../api/ads.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const ad = await getAdById(id);

if (ad) {
  const nomeProduto = document.getElementById("produto");
  const denunciarBtn = document.getElementById("denunciar");

  nomeProduto.textContent = `Item: ${ad.titulo}`;

  denunciarBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const motivo = document.getElementById("motivo").value;

    if (!motivo) {
      alert("Por favor, preencha o motivo da denuncia");
    }

    const denuncia = {
      anuncioId: id,
      motivo,
    };

    const result = await criarDenuncia(denuncia);
    if (result) {
      alert("Anúncio denunciado com sucesso!");
      document.querySelector("form").reset();
      window.location.href = `home.html`;
    } else {
      alert("Erro ao denunciar anuncio. Tente novamente.");
    }
  });
} else {
  window.location.href = `not-found.html`;
}
