import { GetAllUnreadMessages } from "../api/conversations.js";

async function qtddMsgs() {
  const msgs = await GetAllUnreadMessages(); 

  if (msgs > 0) {
    const msgsContainer = document.querySelector(".icone-mensagens-container");

    const msgsNovas = document.createElement("span");
    msgsNovas.classList.add("msgs-novas");
    msgsNovas.textContent = msgs;

    msgsContainer.appendChild(msgsNovas);
  }
}

qtddMsgs();
