// const body = document.querySelector("body");
// const h2 = document.createElement("h2");
// h2.textContent = "World";
// body.appendChild(h2);

const form = document.querySelector("form");
const add = form.parentNode;
const card = document.createElement("div");
card.className = "card card-body mb-3";
const img = document.createElement("img");
img.setAttribute(
    "src",
    "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
);
const btn = document.createElement("button");
btn.textContent = "Delete";
btn.className = "btn btn-danger btn-block mt-4";
const p = document.createElement("p");
p.textContent = "Hello World";
card.appendChild(img);
// card.appendChild(p);
card.appendChild(btn);
add.appendChild(card);
