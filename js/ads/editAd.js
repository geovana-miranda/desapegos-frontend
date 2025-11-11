import { getAdById, updateAd } from "../api/ads.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function preencherFormulario() {
  const ad = await getAdById(id);

  document.getElementById("title").value = ad.titulo || "";
  document.getElementById("description").value = ad.descricao || "";
  document.getElementById("category").value = ad.categoria ?? "";
  document.getElementById("conservationStatus").value =
    ad.estadoConservacao ?? "";

  document.getElementById("cep").value = ad.cep || "";
  document.getElementById("logradouro").value = ad.logradouro || "";
  document.getElementById("bairro").value = ad.bairro || "";
  document.getElementById("cidade").value = ad.localidade || "";
  document.getElementById("uf").value = ad.uf || "";
  document.getElementById("status").value = ad.status ?? "";
}

const updateItem = document.getElementById("update_item");

updateItem.addEventListener("click", async (e) => {
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
  const status = document.getElementById("status").value;
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

  const updatedAd = {
    id: id,
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
    status: status,
  };  

  const result = await updateAd(id, updatedAd);

  if (result) {
    alert("Anúncio atualizado com sucesso!");
    window.location.href = `meu-anuncio.html?id=${id}`;
  } else {
    alert("Erro ao alterar anúncio. Tente novamente.");
  }
});

preencherFormulario();
