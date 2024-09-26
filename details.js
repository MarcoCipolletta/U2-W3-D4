const apiKey = "Vfi2EiXQSKnPUnQIJXaUI3HGO3U6NnOIaEP7zTwU1xQxJde4yHhafh0Y";

const addressBarContent = new URLSearchParams(location.search);
// ho generato un oggetto con tutti i parametri dentro
const rowImgs = document.getElementById("rowImgs");

const imgId = addressBarContent.get("imgId");

const getImg = function () {
  fetch("https://api.pexels.com/v1/photos/" + imgId, {
    headers: {
      Authorization: apiKey
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nel recupero del singolo concerto");
      }
    })
    .then((img) => {
      const body = document.querySelector("body");
      body.style.backgroundColor = img.avg_color;

      console.log(img);
      const imgPage = document.getElementById("image");
      imgPage.src = img.src.medium;

      const nameAuthor = document.getElementById("nameAuthor");
      nameAuthor.innerText = img.photographer;

      const linkAuthor = document.getElementById("linkAuthor");
      linkAuthor.href = img.photographer_url;
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

getImg();
