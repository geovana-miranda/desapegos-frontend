import { getAll } from "../api/denuncia.js";
import { statusDenuncia } from "../utils/statusDenuncia.js";

async function carregarDenuncias() {
  const denuncias = await getAll();

  denuncias.sort((a, b) => a.status - b.status);

  const tbody = document.getElementById("denuncias-body");
  tbody.innerHTML = "";

  if (denuncias.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">Nenhuma denúncia encontrada.</td></tr>`;
    return;
  }

  denuncias.forEach((denuncia) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${denuncia.usuario.nome}</td>
      <td>${denuncia.anuncio.titulo}</td>
      <td>${denuncia.motivo}</td>
      <td>${statusDenuncia[denuncia.status]}</td>
      <td>
        <a href="analise.html?id=${denuncia.id}">Analisar</a> |
        <a href="denuncia/anuncio.html?id=${denuncia.id}">Visualizar Anúncio</a>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

carregarDenuncias();
