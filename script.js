const loadLevel = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/levels/all"
  );
  const data = await res.json();
  displayLevel(data.data);
};
const spinner = (state) => {
  if (state ===true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
const loadWord = async (level) => {
  spinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${level}`;
  const res = await fetch(url);
  const words = await res.json();
  const levelBtns = document.querySelectorAll(".level-btn");
  levelBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  const selectedBtn = document.getElementById(`level-btn-${level}`);
  selectedBtn.classList.add("active");
  displayWord(words.data);
  spinner(false);
};

const loadDetails = async (id) => {
  spinner(true);
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);
  const word = await res.json();

  showDetails(word.data);
  spinner(false);
};
const showDetails = (word) => {
  const modalContainer = document.getElementById("modalContainer");
  let synonymHtml = "";
  if (word.synonyms && word.synonyms.length > 0) {
    for (let syn of word.synonyms) {
      synonymHtml += `<p class="btn bg-blue-100">${syn}</p>`;
    }
  }
  modalContainer.innerHTML = `
  <div class="w-full border-1 border-blue-200 rounded-md p-3">
                            <h1 class="font-bold text-3xl mb-4">
                                    ${word.word} (
                                    <i class="fa-solid fa-microphone"></i>
                                    :${word.pronunciation})
                                </h1>
                                <p class="font-semibold text-[22px]">Meaning</p>
                                <p class="mb-4 mt-2 text-[22px] bangla">${word.meaning}</p>
                                <p class="font-semibold text-[22px]">Example</p>
                                <p class="mb-4 mt-2 text-[22px] bangla">
                                    ${word.sentence}
                                </p>
                                <p class="font-semibold text-[22px] mb-3">সমার্থক শব্দ গুলো</p>
                                <div id="synonyms-container" class="flex flex-wrap gap-4">
                                  ${synonymHtml}
                                </div>
                                
                        </div>
                        <div class="modal-action justify-start">
                                <form method="dialog">
                                    <button class="btn bg-[#422ad5] text-white rounded-md">Complete Learning</button>
                                </form>
                            </div>`;
  document.getElementById("modal").showModal();
};

const displayWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.classList.remove("middle");
  wordContainer.innerHTML = "";
  if (words.length === 0) {
    let div = document.createElement("div");
    div.innerHTML = `
    <div class="flex gap-y-4 flex-col justify-center items-center ">
                    <img src="./assets/alert-error.png" alt="">

                    <p class="bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h1 class="bangla  text-4xl">নেক্সট Lesson এ যান</h1>
                </div>`;
    wordContainer.classList.add("middle");
    wordContainer.append(div);
    return;
  }
  for (let word of words) {
    let cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
                      <div class="cards bg-white h-full text-center p-12 rounded-md">
                    <h1 class="font-bold text-3xl">${
                      word.word ? word.word : "কোনো শব্দ পাওয়া যায়নি "
                    }</h1>
                    <p class="text-[20px] mb-3 mt-3">Meaning /Pronounciation</p>
                    <h1 class="bangla font-bold text-3xl">"${
                      word.meaning ? word.meaning : "কোনো অর্থ পাওয়া যায়নি "
                    }/${
      word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যায়নি"
    } "</h1>

                    <div class="flex justify-between mt-6 items-end">
                        <button onclick="loadDetails(${
                          word.id
                        })" class="btn bg-[#e8f4ff] hover:bg-blue-600 hover:text-white"><i class="fa-solid fa-circle-info "></i></button>
                        <button class="btn bg-[#e8f4ff] hover:bg-blue-600 hover:text-white"><i class="fa-solid fa-volume-high "></i></button>
                    </div>
                </div>
    `;
    wordContainer.append(cardDiv);
  }
  spinner(false);
};

const displayLevel = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    let btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button id="level-btn-${lesson.level_no}" onclick="loadWord(${lesson.level_no})" class="border-1 border-blue-300 btn btn-soft btn-primary level-btn">
                        <i class="fa-solid fa-book-open"></i>
                        Lesson-${lesson.level_no}
                    </button>
        `;
    levelContainer.appendChild(btnDiv);
  }
};
loadLevel();
