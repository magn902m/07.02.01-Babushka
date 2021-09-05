"use strict";

const url = "https://babushka-dd8a.restdb.io/rest/menu/";
const key = "600ec2fb1346a1524ff12de4";
const options = {
  headers: {
    "x-apikey": key,
  },
};

const url2 = "https://babushka-dd8a.restdb.io/rest/menu";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let retter;
let ret;
let number = 0;

document.addEventListener("DOMContentLoaded", loadJSON);

async function loadJSON() {
  const JSONData = await fetch(url + id, options);
  ret = await JSONData.json();
  // console.log(ret);
  visMad(ret);
  loadJSONRetter();
}

async function loadJSONRetter() {
  const JSONDataRetter = await fetch(url2, options);
  retter = await JSONDataRetter.json();
  // console.log(retter);
  visMadRetter(retter);
}

//TEST start

// async function loadJSON() {
//   const JSONData = await fetch(url2, options);
//   retter = await JSONData.json();
//   // console.log(retter);
//   visMadRetter(retter);
//   madURL(retter);
// }

// function madURL(ret) {
//   url + id;
//   console.log(url + id);
//   console.log(ret);
//   visMad(ret);
// }

//TEST end

function visMad(ret) {
  document.querySelector(".navn").textContent = ret.navn;
  document.querySelector(".billede").src =
    "medium/" + ret.billednavn + "-md.jpg";
  document.querySelector(".kategori").textContent = ret.kategori;
  document.querySelector(".langbeskrivelse").textContent = ret.langbeskrivelse;
  document.querySelector(".oprindelsesregion").textContent =
    ret.oprindelsesregion;
  document.querySelector(".pris").textContent = ret.pris + " kr.-";
}

function visMadRetter(retter) {
  // console.log(retter);
  const container = document.querySelector(".section_wrapper");
  const temp = document.querySelector(".mere_salg_temp");
  // container.textContent = "";

  retter.forEach((ret) => {
    // console.log("retter forEach");
    ret = retter[Math.round(Math.random() * 26)];

    if (number < 3) {
      let klon = temp.cloneNode(true).content;
      klon.querySelector(".navn").textContent = ret.navn;
      klon.querySelector(".billede").src =
        "medium/" + ret.billednavn + "-md.jpg";
      klon.querySelector(".pris").textContent = ret.pris + " kr.-";
      klon
        .querySelector("article")
        .addEventListener(
          "click",
          () => (document.location.href = "single_view.html?id=" + ret._id)
        );
      container.appendChild(klon);
      number++;
    }
  });
}

// document.querySelector("button").addEventListener("click", () => {
//   location.href = "bistro_babushka.html?id=";
// });

document.querySelector("button").addEventListener("click", () => {
  window.history.back();
});
