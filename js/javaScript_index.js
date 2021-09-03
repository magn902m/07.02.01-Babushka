"use strict";

//Kontroller om DOM´en er loaded
window.addEventListener("DOMContentLoaded", start);

const url = "https://babushka-dd8a.restdb.io/rest/menu";
const key = "600ec2fb1346a1524ff12de4";
const options = {
  headers: {
    "x-apikey": key,
  },
};

let retter;
let filter = "alle";

function start() {
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerKategori)
  );
  loadJSON();
}

function filtrerKategori() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  visRetter();

  const txtKategori = document.querySelector("header .txt_kategori");
  console.log(this);
  txtKategori.textContent = "Flitrer: " + this.textContent;
}

async function loadJSON() {
  const JSONData = await fetch(url, options);
  retter = await JSONData.json();
  console.log(retter);
  visRetter();
}

function visRetter() {
  const container = document.querySelector("section");
  const temp = document.querySelector("template");
  container.textContent = "";

  retter.forEach((ret) => {
    if (filter == ret.kategori || filter == "alle") {
      let klon = temp.cloneNode(true).content;
      const md = "-md.jpg";
      klon.querySelector(".navn").textContent = ret.navn;
      klon.querySelector(".billede").src = "medium/" + ret.billednavn + md;
      klon.querySelector(".kategori").textContent = ret.kategori;
      klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;
      klon.querySelector(".pris").textContent = "Pris: " + ret.pris + " kr.-";
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(ret));
      container.appendChild(klon);
    }
  });
}

document.querySelector("#popup button").addEventListener("click", lukPopup);

function lukPopup() {
  document.querySelector("#popup").style.display = "none";
}

function visDetaljer(ret) {
  console.log(ret);
  const popup = document.querySelector("#popup");
  popup.style.display = "block";
  popup.querySelector(".navn").textContent = ret.navn;
  popup.querySelector(".billede").src = "medium/" + ret.billednavn + "-md.jpg";
  popup.querySelector(".kategori").textContent = ret.kategori;
  popup.querySelector(".langbeskrivelse").textContent = ret.langbeskrivelse;
  popup.querySelector(".pris").textContent = ret.pris + " kr.-";
  popup.querySelector(".videre").addEventListener("click", () => {
    location.href = "single_view.html?id=" + ret._id;
  });
}
