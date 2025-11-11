import {
  getConversations,
  getConversationsById,
  getUsuarioLogadoId,
  GetAllUnreadMessagesById,
  MarkMsgsAsRead,
} from "../api/conversations.js";

const conversations = await getConversations();

const container = document.querySelector(".conversas-content");

if (conversations.length > 0) {
  container.classList.remove("hidden");
  const noMsgs = document.querySelector(".no-msgs");  
  noMsgs.classList.add("hidden");

  conversations.map((c) => {
    carregarConversas(c);
  });
} 
async function carregarConversas(c) {
  const novasMsgs = await GetAllUnreadMessagesById(c.id);

  const usuarioLogadoId = getUsuarioLogadoId();
  const donoAnuncioId = c.donoAnuncioId;
  let conversaCom;

  const sidebar = document.querySelector(".sidebar");
  const chatDisplay = document.querySelector(".chat-input");

  const itemConversa = document.createElement("div");
  itemConversa.classList.add("conversation-item");

  // com quem estou conversando?
  if (donoAnuncioId == usuarioLogadoId) {
    conversaCom = c.interessado.nome;
  } else {
    conversaCom = c.donoAnuncio.nome;
  }

  if (novasMsgs > 0) {
    itemConversa.innerHTML = `${conversaCom} - ${c.anuncio.titulo} 
    <span class="msgs-novas-conversas">${novasMsgs}<span>     `;
  } else {
    itemConversa.innerHTML = `${conversaCom} - ${c.anuncio.titulo}`;
  }

  itemConversa.addEventListener("click", async () => {
    const conversa = await getConversationsById(c.id);  

    const marcarComoLidas = await MarkMsgsAsRead(c.id);

    const chatTitulo = document.querySelector(".chat-titulo");
    chatTitulo.innerHTML = `<div class="chat-header">Conversa com ${conversaCom}</div>`;

    const msgArea = document.querySelector(".messages");
    msgArea.innerHTML = "";

    const msgs = conversa.mensagens;

    chatDisplay.classList.remove("chat-hidden");
    chatDisplay.classList.add("chat-flex");

    msgs.map((m) => {
      carregarMensagens(m, usuarioLogadoId, msgArea);
    });

    document.getElementById("anuncioId").value = c.anuncio.id;
    document.getElementById("conversaId").value = c.id;
  });

  sidebar.appendChild(itemConversa);
}

function carregarMensagens(msg, usuarioLogadoId, msgArea) {
  const texto = msg.texto;

  const data = formatarData(msg.dataEnvio);

  const div = document.createElement("div");
  div.classList.add("message");

  if (usuarioLogadoId == msg.remetenteId) {
    div.classList.add("remetente");
  }

  div.textContent = texto;

  const date = document.createElement("p");
  date.classList.add("message-date");
  date.textContent = data;

  msgArea.appendChild(div);
  msgArea.appendChild(date);
}

function formatarData(dataEnvio) {
  const data = new Date(dataEnvio);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}
