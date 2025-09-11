const loadLevel = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/levels/all"
  );
  const data = await res.json();
  displayLevel(data.data);
};
const displayLevel = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    let btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button class="border-1 border-blue-300 btn btn-soft btn-primary">
                        <i class="fa-solid fa-book-open"></i>
                        Lesson-${lesson.level_no}
                    </button>
        `;
    levelContainer.appendChild(btnDiv);
  }
};
loadLevel();
