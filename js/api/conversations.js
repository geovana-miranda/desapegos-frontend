import { URL_BASE } from "./apiConfig.js";

const URL = `${URL_BASE}`;

export async function sendMsg(msg) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${URL}/mensagens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(msg),
    });

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    return null;
  }
}

export async function getConversations() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${URL}/conversas`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar conversas:", error);
    return [];
  }
}

export async function getConversationsById(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${URL}/conversas/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar conversas:", error);
    return [];
  }
}

export async function GetAllUnreadMessages() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${URL}/conversas/mensagens-nao-lidas`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar novas mensagens:", error);
    return [];
  }
}

export async function GetAllUnreadMessagesById(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${URL}/conversas/${id}/nao-lidas`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar novas mensagens:", error);
    return [];
  }
}

export async function MarkMsgsAsRead(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${URL}/conversas/${id}/marcar-como-lidas`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }
    const data = await res.json();
    return data;
    
  } catch (error) {
    console.error("Erro ao marcar mensagens como lidas:", error);
    return [];
  }
}

export function getUsuarioLogadoId() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.nameid;
}
