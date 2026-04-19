const lensData = {
  individual: {
    label: "For individuals",
    title: "Use the smallest useful tool.",
    description:
      "If a search engine, note, or human conversation can answer the question, use that first. Save generative AI for tasks where its unique strengths matter.",
    items: [
      "Set a purpose before prompting.",
      "Avoid endless retries when a single good draft is enough.",
      "Verify important facts with trusted sources.",
    ],
  },
  team: {
    label: "For teams",
    title: "Build a policy, not a habit of waste.",
    description:
      "Teams should define when AI is allowed, which model sizes are appropriate, and how output gets reviewed. The goal is consistent usefulness, not maximum usage.",
    items: [
      "Prefer efficient models unless a larger one is justified.",
      "Track repeated prompts and remove duplicated work.",
      "Make human review mandatory for high-stakes content.",
    ],
  },
  educator: {
    label: "For educators",
    title: "Teach judgment, not just prompting.",
    description:
      "Students need to learn when AI helps and when it short-circuits learning. Focus on verification, ethics, and accountability alongside technical skill.",
    items: [
      "Use AI as a scaffold, not a substitute for thinking.",
      "Discuss bias, privacy, and environmental cost openly.",
      "Require reflection on how the output was produced.",
    ],
  },
};

const lensButtons = document.querySelectorAll(".lens-tab");
const lensLabel = document.getElementById("lens-label");
const lensTitle = document.getElementById("lens-title");
const lensDescription = document.getElementById("lens-description");
const lensList = document.getElementById("lens-list");
const pledgeButton = document.getElementById("pledge-button");
const pledgeStatus = document.getElementById("pledge-status");
const year = document.getElementById("year");
const revealEls = document.querySelectorAll(".reveal");

year.textContent = `(c) ${new Date().getFullYear()}`;

function setLens(key) {
  const data = lensData[key];

  lensLabel.textContent = data.label;
  lensTitle.textContent = data.title;
  lensDescription.textContent = data.description;
  lensList.innerHTML = data.items.map((item) => `<li>${item}</li>`).join("");

  lensButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lens === key);
  });
}

lensButtons.forEach((button) => {
  button.addEventListener("click", () => setLens(button.dataset.lens));
});

pledgeButton.addEventListener("click", () => {
  pledgeStatus.textContent = "Pledge recorded: think first, use less when less is enough, and verify the result.";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((element) => observer.observe(element));
setLens("individual");
