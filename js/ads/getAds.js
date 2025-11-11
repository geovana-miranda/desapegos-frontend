import { getAdByUserId, getAdExceptUser } from "../api/ads.js";
import { checkFavoritado, createFavorito, deleteFavorito} from "../api/favoritos.js";


async function carregarAds() {
  const items = await getAdExceptUser();
  const myItems = await getAdByUserId();
  const ads = items.reverse();
  const myAds = myItems.reverse();

  const itemList = document.getElementById("item-list");
  const myItemList = document.getElementById("my-item-list");

  if (!ads || ads.length === 0 || !myAds || myAds.length === 0) {
    if (!ads || ads.length === 0) {
      itemList.innerHTML = "<p>Nenhum anúncio encontrado.</p>";
    }

    if (!myAds || myAds.length === 0) {
      myItemList.innerHTML = "<p>Nenhum anúncio encontrado.</p>";
    }
  }

  if (ads.length >= 1) {
    ads.forEach((ad) => {
      const image = !ad.imagem
        ? "/img/no_image.png"
        : `https://localhost:7155${ad.imagem}`;

      const card = document.createElement("a");
      card.href = `anuncio.html?id=${ad.id}`;
      card.textContent = "Ver anúncio";

      card.classList.add("item-card");

      card.innerHTML = `              
              <div class="item-img">
                <img src="${image}" alt="${ad.titulo}">
              </div>
              <h3>${ad.titulo}</h3>
              <p>${ad.descricao}</p>
              <i class="far fa-heart fav"></i>
            `;

      // like icone click
      const favIcon = card.querySelector(".fav");

      async function check() {
        const check = await checkFavoritado(ad.id);

        if (check.isFavoritado == true) {
          favIcon.classList.add("active");
          favIcon.classList.add("fas");
        }
      }

      check();


      favIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (favIcon.classList.contains("active")) {
          deleteFavorito(ad.id);
          favIcon.classList.remove("active");
          favIcon.classList.remove("fas");
          favIcon.classList.add("far");
        } else {
          createFavorito(ad.id);
          favIcon.classList.add("active");
          favIcon.classList.add("fas");
          alert("Item favoritado com sucesso!");
        }
      });

      itemList.appendChild(card);
    });
  }

  if (myAds.length >= 1) {
    myAds.forEach((ad) => {
      const image = !ad.imagem
        ? "/img/no_image.png"
        : `https://localhost:7155${ad.imagem}`;

      const card = document.createElement("a");
      card.href = `meu-anuncio.html?id=${ad.id}`;
      card.textContent = "Ver anúncio";

      card.classList.add("item-card");

      card.innerHTML = `              
              <div class="item-img">
                <img src="${image}" alt="${ad.titulo}">
              </div>
              <h3>${ad.titulo}</h3>
              <p>${ad.descricao}</p>
            `;

      myItemList.appendChild(card);
    });
  }
}

carregarAds();
