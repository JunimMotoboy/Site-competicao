const characters = [
  {
    name: "Axon",
    img: "/imgs/Axon.png",
    info: "Especialista em tecnologia alienígena.",
    skills: ["Campo de Força", "Disparo de Plasma", "Drone Reparador"]
  },
  {
    name: "Jaguar",
    img: "/imgs/jaguar.png",
    info: "Ágil e letal como o animal que representa.",
    skills: ["Salto Furtivo", "Garras Velozes", "Sentidos Aguçados"]
  },
  {
    name: "Kismet",
    img: "/imgs/Kismet.png",
    info: "Mestre do destino e do caos.",
    skills: ["Distorção Temporal", "Caminho do Caos", "Roda da Fortuna"]
  },
  {
    name: "Serket",
    img: "/imgs/Serket.png",
    info: "Escorpiônica com habilidades letais.",
    skills: ["Ferrão Venenoso", "Salto Escorpiônico", "Armadura Chitinosa"]
  },
  {
    name: "Corona",
    img: "/imgs/Corona.png",
    info: "Rainha do caos e do controle mental.",
    skills: ["Domínio Psíquico", "Explosão de Caos", "Aura da Loucura"]
  },
  {
    name: "Spider",
    img: "/imgs/Spider.png",
    info: "Tecelão de armadilhas e destruição.",
    skills: ["Teia Explosiva", "Camuflagem Sombria", "Emboscada"]
  },
  {
    name: "Broker",
    img: "/imgs/Broker.png",
    info: "Mercador de habilidades letais.",
    skills: ["Negócio Mortal", "Roubo de Habilidade", "Contrato Sombrio"]
  },
  {
    name: "Chum",
    img: "/imgs/Chu.png",
    info: "Tanque bruto com coração mole.",
    skills: ["Investida Brutal", "Muralha Viva", "Grito de Guerra"]
  },
  {
    name: "Sonar",
    img: "/imgs/Sonar.png",
    info: "Rastreia tudo com ondas supersônicas.",
    skills: ["Pulso Sônico", "Eco Rastreador", "Interferência Total"]
  }
];

const track = document.getElementById("carousel-track");
const leftBtn = document.querySelector(".arrow.left");
const rightBtn = document.querySelector(".arrow.right");
const visibleCards = 6;


function createCard(character) {
  const card = document.createElement("div");
  card.className = "character-card";
  card.style.setProperty("--bg", `url('${character.img}')`);
  card.dataset.name = character.name;
  card.dataset.info = character.info;
  card.dataset.skills = JSON.stringify(character.skills);

  card.innerHTML = `
    <span class="name">${character.name}</span>
    <button class="info-button">i</button>
  `;
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


const modal = document.createElement("div");
modal.className = "modal-overlay";
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <h2 id="modal-name"></h2>
    <p id="modal-info"></p>
    <ul id="modal-skills"></ul>
  </div>`;
document.body.appendChild(modal);

const modalName = modal.querySelector("#modal-name");
const modalInfo = modal.querySelector("#modal-info");
const modalSkills = modal.querySelector("#modal-skills");
const closeModal = modal.querySelector(".close-modal");


track.addEventListener("click", (e) => {
  if (e.target.classList.contains("info-button")) {
    const card = e.target.closest(".character-card");
    if (!card) return;

    modalName.textContent = card.dataset.name;
    modalInfo.textContent = card.dataset.info;

    const skills = JSON.parse(card.dataset.skills || "[]");
    modalSkills.innerHTML = skills.map(skill => `<li>${skill}</li>`).join("");

    modal.style.display = "flex";
  }
});

closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

window.addEventListener("resize", () => updateCarousel(false));
updateCarousel(false);

