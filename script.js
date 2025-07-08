const characters = [
  { name: "Axon", img: "/imgs/Axon.png", info: "Especialista em tecnologia alienígena." },
  { name: "Jaguar", img: "/imgs/jaguar.png", info: "Ágil e letal como o animal que representa." },
  { name: "Kismet", img: "/imgs/Kismet.png", info: "Mestre do destino e do caos." },
  { name: "Serket", img: "/imgs/Serket.png", info: "Escorpiônica com habilidades letais." },
  { name: "Corona", img: "/imgs/Corona.png", info: "Rainha do caos e do controle mental." },
  { name: "Spider", img: "/imgs/Spider.png", info: "Tecelão de armadilhas e destruição." },
  { name: "Broker", img: "/imgs/Broker.png", info: "Mercador de habilidades letais." },
  { name: "Chum", img: "/imgs/Chu.png", info: "Tanque bruto com coração mole." },
  { name: "Sonar", img: "/imgs/Sonar.png", info: "Rastreia tudo com ondas supersônicas." }
];

const track = document.getElementById("carousel-track");
const leftBtn = document.querySelector(".arrow.left");
const rightBtn = document.querySelector(".arrow.right");
const visibleCards = 6;

// Criar e clonar cards para looping infinito
function createCard(character) {
  const card = document.createElement("div");
  card.className = "character-card";
  card.style.setProperty("--bg", `url('${character.img}')`);
  card.dataset.name = character.name;
  card.dataset.info = character.info;
  card.innerHTML = `<span class="name">${character.name}</span>`;
  return card;
}

const clonesBefore = characters.slice(-visibleCards).map(createCard);
const clonesAfter = characters.slice(0, visibleCards).map(createCard);
clonesBefore.forEach(clone => track.appendChild(clone.cloneNode(true)));
characters.forEach(c => track.appendChild(createCard(c)));
clonesAfter.forEach(clone => track.appendChild(clone.cloneNode(true)));

const allCards = track.querySelectorAll(".character-card");
let currentIndex = visibleCards;

function getCardWidth() {
  const sampleCard = track.querySelector(".character-card");
  return sampleCard.offsetWidth + 30;
}

function updateCarousel(animate = true) {
  const cardWidth = getCardWidth();
  const offset = currentIndex * cardWidth;
  const centerOffset = ((cardWidth * visibleCards) - cardWidth) / 2;

  track.style.transition = animate ? "transform 0.5s ease" : "none";
  track.style.transform = `translateX(calc(${centerOffset}px - ${offset}px))`;

  allCards.forEach(card => card.classList.remove("active"));
  if (allCards[currentIndex]) {
    allCards[currentIndex].classList.add("active");
  }
}

// Navegação infinita
rightBtn.addEventListener("click", () => {
  if (currentIndex < allCards.length - visibleCards) {
    currentIndex++;
    updateCarousel();
    if (currentIndex === allCards.length - visibleCards) {
      setTimeout(() => {
        currentIndex = visibleCards;
        updateCarousel(false);
      }, 500);
    }
  }
});

leftBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = allCards.length - visibleCards * 2;
        updateCarousel(false);
      }, 500);
    }
  }
});

// Modal
const modal = document.createElement("div");
modal.className = "modal-overlay";
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <h2 id="modal-name"></h2>
    <p id="modal-info"></p>
  </div>`;
document.body.appendChild(modal);

const modalName = modal.querySelector("#modal-name");
const modalInfo = modal.querySelector("#modal-info");
const closeModal = modal.querySelector(".close-modal");

track.addEventListener("click", (e) => {
  const card = e.target.closest(".character-card");
  if (!card) return;
  modalName.textContent = card.dataset.name;
  modalInfo.textContent = card.dataset.info;
  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

window.addEventListener("resize", () => updateCarousel(false));
updateCarousel(false);
