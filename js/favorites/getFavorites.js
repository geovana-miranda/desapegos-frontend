import { listarMeusFavoritos, checkFavoritado, deleteFavorito, createFavorito } from "../api/favoritos.js";

async function carregarAds() {
    const items = await listarMeusFavoritos();
    const ads = items.reverse();

    const itemList = document.getElementById("my-favorites-list");

    if (!ads || ads.length === 0) {
        if (!ads || ads.length === 0) {
            itemList.innerHTML = "<p>Nenhum anúncio encontrado.</p>";
        }

    }
    if (ads.length >= 1) {
        ads.forEach((ad) => {
            const image = !ad.imagem
                ? "/img/no_image.png"
                : `data:image/*;base64,${ad.imagem}`;

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

}

carregarAds();
