import { getById, atualizarStatus } from "../api/denuncia.js";
import { statusDenuncia } from "../utils/statusDenuncia.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const alterarStatus = document.getElementById("alterarStatus");

const denuncia = await getById(id);

if (denuncia) {
  const tbody = document.getElementById("denuncia-body");
  tbody.innerHTML = "";

  const tr = document.createElement("tr");

  tr.innerHTML = `

      <td>${denuncia.usuario.nome}</td>
      <td>${denuncia.anuncio.titulo}</td>
      <td>${denuncia.motivo}</td>
      <td>${statusDenuncia[denuncia.status]}</td>
      <td>
        <select name="status" id="status">
      <option value="EmAnalise" ${
        denuncia.status == 0 ? "selected" : ""
      }>Em Análise</option>
      <option value="Aceita" ${
        denuncia.status == 1 ? "selected" : ""
      }>Aceita</option>
      <option value="Negada" ${
        denuncia.status == 2 ? "selected" : ""
      }>Negada</option>
    </select>
      </td>

    `;
  tbody.appendChild(tr);
}
alterarStatus.addEventListener("click", async () => {
  const novoStatus = document.getElementById("status").value;
  const result = await atualizarStatus(denuncia.id, novoStatus);

  if (result) {
    alert("Status de denuncia alterado com sucesso");
    window.location.href = `home-admin.html`;
  }

});
