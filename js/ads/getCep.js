import { buscarCEP } from "../api/cep.js";

const getCep = document.getElementById("get_cep");
const logradouro = document.getElementById("logradouro");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");

getCep.addEventListener("click", async (e) => {
  e.preventDefault();
  const cep = document.getElementById("cep").value;

  const data = await buscarCEP(cep);

  if (data.cep == null) {
    alert("CEP não encontrado");
    return;
  } else {
    uf.value = data.uf;
    cidade.value = data.localidade;
    bairro.value = data.bairro;
    logradouro.value = data.logradouro;
  }
});
