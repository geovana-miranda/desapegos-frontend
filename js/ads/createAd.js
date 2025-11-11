import { AddNewAd } from "../api/ads.js";

const addItem = document.getElementById("add_item");

addItem.addEventListener("click", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const conservationStatus =
    document.getElementById("conservationStatus").value;
  const description = document.getElementById("description").value;

  const cep = document.getElementById("cep").value;
  const logradouro = document.getElementById("logradouro").value;
  const bairro = document.getElementById("bairro").value;
  const cidade = document.getElementById("cidade").value;
  const uf = document.getElementById("uf").value;
  const image = document.getElementById("image");

  if (
    !title ||
    !category ||
    !conservationStatus ||
    !description ||
    !cep ||
    !logradouro ||
    !bairro ||
    !cidade ||
    !uf
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  const newAd = {
    titulo: title,
    descricao: description,
    categoria: parseInt(category),
    estadoConservacao: parseInt(conservationStatus),
    cep: cep,
    logradouro: logradouro,
    bairro: bairro,
    localidade: cidade,
    uf: uf,
    imagem: image.files[0],
  };

  const result = await AddNewAd(newAd);

  if (result) {
    alert("Anúncio adicionado com sucesso!");
    document.querySelector("form").reset();
  } else {
    alert("Erro ao adicionar anúncio. Tente novamente.");
  }
});
