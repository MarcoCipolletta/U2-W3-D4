const apiKey = "Vfi2EiXQSKnPUnQIJXaUI3HGO3U6NnOIaEP7zTwU1xQxJde4yHhafh0Y";
const rowImgs = document.getElementById("rowImgs");

const getImageLandscape = () => {
  fetch("https://api.pexels.com/v1/search?query=landscape", {
    headers: {
      Authorization: apiKey
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Richiesta non andata abuon fine");
      }
    })
    .then((obj) => {
      rowImgs.innerHTML = "";
      obj.photos.forEach((objImg) => {
        placeImgs(objImg.src.medium, objImg.id, objImg.photographer);
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};
const getImageHouses = () => {
  fetch("https://api.pexels.com/v1/search?query=house", {
    headers: {
      Authorization: apiKey
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Richiesta non andata abuon fine");
      }
    })
    .then((obj) => {
      rowImgs.innerHTML = "";
      obj.photos.forEach((objImg) => {
        placeImgs(objImg.src.medium, objImg.id, objImg.photographer);
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};
const getSearchedImgs = () => {
  const searchInput = document.getElementById("searchInput");
  const searchInputValue = searchInput.value;

  fetch(`https://api.pexels.com/v1/search?query=${searchInputValue}`, {
    headers: {
      Authorization: apiKey
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Richiesta non andata abuon fine");
      }
    })
    .then((obj) => {
      rowImgs.innerHTML = "";
      obj.photos.forEach((objImg) => {
        placeImgs(objImg.src.medium, objImg.id, objImg.photographer);
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

const firstBtnLoad = document.getElementById("firstBtnLoad");
firstBtnLoad.addEventListener("click", getImageLandscape);

const secondBtnLoad = document.getElementById("secondBtnLoad");
secondBtnLoad.addEventListener("click", getImageHouses);

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", getSearchedImgs);

const placeImgs = (urlImg, id, author) => {
  const col = document.createElement("div");
  col.classList.add("col-md-4");

  const card = document.createElement("div");
  card.classList.add("card", "mb-4", "shadow-sm");

  const img = document.createElement("img");
  img.src = urlImg;
  img.classList.add("bd-placeholder-img", "card-img-top", "imgCard");
  img.role = "button";
  img.addEventListener("click", () => {
    goToDetailPage(id);
  });

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5"); //dentro cardBody
  cardTitle.classList.add("card-title");
  cardTitle.innerText = author;
  cardTitle.role = "button";
  cardTitle.addEventListener("click", () => {
    goToDetailPage(id);
  });

  const description = document.createElement("p"); //dentro cardBody
  description.classList.add("card-text");
  description.innerText = "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.";

  const cardFooter = document.createElement("div"); //dentro cardBody
  cardFooter.classList.add("d-flex", "justify-content-between", "align-items-center");

  const btnGroup = document.createElement("div"); //dentro cardFooter
  btnGroup.classList.add("btn-group");

  const btnView = document.createElement("button"); //dentro btnGroup
  btnView.classList.add("btn", "btn-sm", "btn-outline-secondary");
  btnView.type = "button";
  btnView.setAttribute("data-bs-toggle", "modal");
  btnView.setAttribute("data-bs-target", "#viewCard");
  btnView.innerText = "View";
  btnView.addEventListener("click", () => {
    const modalTitle = document.getElementById("modalTitle");
    const imgModal = document.getElementById("imgModal");
    modalTitle.innerText = author;
    imgModal.src = urlImg;
  });

  const btnHide = document.createElement("button"); //dentro btnGroup
  btnHide.classList.add("btn", "btn-sm", "btn-outline-secondary");
  btnHide.type = "button";
  btnHide.innerText = "Hide";
  btnHide.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.closest("div.col-md-4").remove();
  });

  btnGroup.append(btnView, btnHide); //dentro cardFooter

  const idText = document.createElement("small"); //dentro cardFooter
  idText.classList.add("text-muted");
  idText.innerText = id;

  cardFooter.append(btnGroup, idText);
  cardBody.append(cardTitle, description, cardFooter);
  card.append(img, cardBody);
  col.appendChild(card);
  rowImgs.appendChild(col);
};

const goToDetailPage = (id) => {
  location.href = `./details.html?imgId=${id}`;
};
