const questions = [
    { text: "Allah var mı", points: [4, 0, 0] },
    { text: "Demokrasi olsun mu", points: [-1, -5, 0] },
    { text: "Devlet tağut mu", points: [3, 6, 0] },
    { text: "Kadın kotası koyalım belediyeye", points: [-2, -4, 6] },
    { text: "Allah'ın işinde hikmet vardır", points: [5, 0, -1] },
    { text: "Radiohead?", points: [-3, 1, 1] },
    { text: "Bitcoin müthiş bi icat", points: [0, 6, 0] },
    { text: "Çocuğum legebete olsa kahrolurum", points: [4, -1, -3] },
    { text: "Sünnetlere bol bol uyarım", points: [5, -2, -2] },
    { text: "4 eşe kadar okey aga", points: [5, 5, -5] }
];

//first axis: religion
//second axis: libertarianism
//third axis: feminism

const predefinedPoints = [
    { name: "Hamza Berk", vector: [14, -4, -15] },
    { name: "Kayra (_Q_)", vector: [-10, -5, -1] },
    { name: "Safsata Canavarı ya da Kailyn", vector: [24, 21, -15] },
    { name: "Habil Ademoğlu", vector: [21, 6, -16] },
    { name: "Sirius", vector: [-27, -11, 13] },
    { name: "Berat Mutluhan Seferoğlu", vector: [-23, 5, 2] },
    { name: "misshyptia (gülizar esma)", vector: [-32, -22, 18] },
    { name: "Zeynep (feminist)", vector: [-7, -18, 12] },

];

const resultImages = {
  "Hamza Berk": 'photos/hamza.png',
  "Kayra (_Q_)": 'photos/kayra.png',
  "Safsata Canavarı ya da Kailyn": 'photos/kailyn.jpg',
  "Habil Ademoğlu": 'photos/habil.jpg',
  "Sirius": 'photos/sirius.jpg',
  "Zeynep (feminist)": 'photos/zeynep.png',
  "Berat Mutluhan Seferoğlu": 'photos/bms.png',
  "misshyptia (gülizar esma)": 'photos/gulizaresma.png'
    
  // Add more results and corresponding image paths
};


const quizContainer = document.getElementById("quiz-container");
const submitButton = document.getElementById("submit-btn");
const resultText = document.getElementById("result");

// Generate questions dynamically
questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${q.text}</p>
                     <input type="radio" name="q${index}" value="1"> Evet
                     <input type="radio" name="q${index}" value="0"> Bilmem/Nötr
                     <input type="radio" name="q${index}" value="-1"> Hayır/Zıttı`;
    quizContainer.appendChild(div);
});

submitButton.addEventListener("click", () => {
    let userVector = [0, 0, 0];

    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            const value = parseInt(selected.value);
            userVector = userVector.map((v, i) => v + value * q.points[i]);
        }
    });

    let closestMatch = null;
    let minDistance = Infinity;

    predefinedPoints.forEach(point => {
        const distance = Math.sqrt(
            Math.pow(userVector[0] - point.vector[0], 2) +
            Math.pow(userVector[1] - point.vector[1], 2) +
            Math.pow(userVector[2] - point.vector[2], 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestMatch = point.name;
        }
    });
    
    const imagePath = resultImages[closestMatch];
    document.getElementById("result-img").src = imagePath;
    
    resultText.textContent = `Sen : ${closestMatch}`;
});
