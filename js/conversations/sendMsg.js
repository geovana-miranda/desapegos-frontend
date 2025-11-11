import { sendMsg } from "../api/conversations.js";

const btnSend = document.querySelector(".btn-msg");

btnSend.addEventListener("click", async (e) => {
  e.preventDefault();

  const anuncioId = document.getElementById("anuncioId").value;
  let conversaId;

  if (document.getElementById("conversaId")) {
    conversaId = document.getElementById("conversaId").value;
  } else {
    conversaId = null;
  }

  const text = document.getElementById("text").value;

  if (!text) {
    alert("Escreva sua mensagem!");
    return;
  }

  const msg = {
    anuncioId,
    texto: text,
    conversaId,
  };

  const result = await sendMsg(msg);

  if (result) {
    alert("Mensagem enviada com sucesso!");
    document.querySelector("form").reset();
  } else {
    alert("Erro ao enviar mensagem. Tente novamente.");
  }
});
