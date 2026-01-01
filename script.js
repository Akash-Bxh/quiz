const quiz = [
  {
    question: "1. What is the exact name written on Bhide’s scooter RC book?",
    name: "q1",
    options: {A:"Sakharam", B:"Sakharam Bhide", C:"Shri Sakharam", D:"Sakharam MH-02"},
    answer: "A"
  },
  {
    question: "2. Which newspaper does Popatlal work for?",
    name: "q2",
    options: {A:"Toofan Express", B:"Mumbai Samachar", C:"Aaj Ki Khabar", D:"Janmat Times"},
    answer: "A"
  },
  {
    question: "3. What is the house number of Jethalal’s flat in Gokuldham?",
    name: "q3",
    options: {A:"Flat 101", B:"Flat 102", C:"Flat 1A", D:"Flat 104"},
    answer: "B"
  },
  {
    question: "4. What does Champaklal often say before giving moral advice?",
    name: "q4",
    options: {A:"Jetha!", B:"Ae Pagal Aurat!", C:"Galti Insaan Se Hi Hoti Hai", D:"Sanskar Naam Ki Cheez"},
    answer: "C"
  },
  {
    question: "5. What is the full name of Dr. Hathi?",
    name: "q5",
    options: {A:"Hansraj Hathi", B:"Hemant Hathi", C:"Harish Hathi", D:"Himmatlal Hathi"},
    answer: "A"
  },
  {
    question: "6. What item does Daya Gada always bring from Ahmedabad?",
    name: "q6",
    options: {A:"Thepla", B:"Fafda-Jalebi", C:"Khakhra", D:"Undhiyu"},
    answer: "C"
  },
  {
    question: "7. Which character first called the society ‘Gokuldham’?",
    name: "q7",
    options: {A:"Bhide", B:"Champaklal", C:"Jethalal", D:"Taarak Mehta"},
    answer: "D"
  },
  {
    question: "8. What is the name of Sonu Bhide’s school?",
    name: "q8",
    options: {A:"St. Xavier’s", B:"Don Bosco", C:"Royal Academy", D:"Swami Vivekanand School"},
    answer: "C"
  },
  {
    question: "9. Which vehicle does Sodhi own?",
    name: "q9",
    options: {A:"Jeep", B:"SUV", C:"Truck", D:"Bullet Bike"},
    answer: "B"
  },
  {
    question: "10. What is the name of the society watchman?",
    name: "q10",
    options: {A:"Ramu Kaka", B:"Kalu Kaka", C:"Raju", D:"Gopal"},
    answer: "A"
  },
  {
    question: "11. What diet item does Anjali Mehta force Taarak to drink daily?",
    name: "q11",
    options: {A:"Green Tea", B:"Karela Juice", C:"Bottle Gourd Juice", D:"Aloe Vera Juice"},
    answer: "C"
  },
  {
    question: "12. What is the profession of Iyer?",
    name: "q12",
    options: {A:"Scientist", B:"Engineer", C:"Professor", D:"Research Analyst"},
    answer: "A"
  },
  {
    question: "13. What does Bhide call himself in the society?",
    name: "q13",
    options: {A:"Secretary Sahab", B:"Ekmev Secretary", C:"Pramukh", D:"Society Head"},
    answer: "B"
  },
  {
    question: "14. What special quality does Pinku have?",
    name: "q14",
    options: {A:"Best student", B:"Silent observer", C:"Fast runner", D:"Good singer"},
    answer: "B"
  },
  {
    question: "15. Which character keeps chanting ‘Hey Maataji’?",
    name: "q15",
    options: {A:"Madhavi", B:"Babita", C:"Daya", D:"Anjali"},
    answer: "C"
  },
  {
    question: "16. What business loss frequently worries Jethalal?",
    name: "q16",
    options: {A:"Courier delay", B:"Customer cheating", C:"Goods stuck in godown", D:"Payment recovery"},
    answer: "D"
  },
  {
    question: "17. Who usually resolves fights between Jethalal and Iyer?",
    name: "q17",
    options: {A:"Babita", B:"Taarak Mehta", C:"Champaklal", D:"Sodhi"},
    answer: "B"
  },
  {
    question: "18. Which festival episode caused society blackout?",
    name: "q18",
    options: {A:"Diwali", B:"Ganesh Chaturthi", C:"Navratri", D:"Holi"},
    answer: "A"
  },
  {
    question: "19. What does Bhide sell from home besides teaching?",
    name: "q19",
    options: {A:"Pickles", B:"Papad", C:"Aachar-Papad", D:"Spices"},
    answer: "C"
  },
  {
    question: "20. Which phrase does Popatlal shout most when angry?",
    name: "q20",
    options: {A:"Main Reporter Hoon!", B:"Shaadi Kab Hogi!", C:"Anyay Hai!", D:"Breaking News!"},
    answer: "C"
  }
];


let currentQ = 0;
let score = 0;
let timer;
let questionLocked = false;
const timePerQuestion = 5; // ✅ 5 seconds only

// ================= SHOW QUESTION =================
function showQuestion() {
  clearInterval(timer);
  questionLocked = false;

  const container = document.getElementById("quizContainer");
  container.innerHTML = "";
  document.getElementById("nextBtn").style.display = "none";

  const q = quiz[currentQ];
  container.innerHTML = `<p>${q.question}</p>`;

  for (let key in q.options) {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="${q.name}" value="${key}">
      ${key}: ${q.options[key]}
    `;
    label.onclick = () => {
      if (!questionLocked) {
        checkAnswer(q.name, q.answer, key, label);
      }
    };
    container.appendChild(label);
  }

  startTimer(timePerQuestion);
}

// ================= TIMER =================
function startTimer(seconds) {
  let time = seconds;
  document.getElementById("timer").innerText = `Time left: ${time}s`;

  timer = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = `Time left: ${time}s`;

    if (time <= 0) {
      clearInterval(timer);
      lockAndRemoveOptions();
    }
  }, 1000);
}

// ================= LOCK & REMOVE OPTIONS =================
function lockAndRemoveOptions() {
  questionLocked = true;

  // remove all radio buttons (no marking possible)
  document.querySelectorAll("input[type='radio']").forEach(input => {
    input.remove();
  });

  document.getElementById("nextBtn").style.display = "block";
}

// ================= CHECK ANSWER =================
function checkAnswer(name, correct, selected, label) {
  if (questionLocked) return;

  clearInterval(timer);
  questionLocked = true;

  if (selected === correct) {
    label.classList.add("correct");
    score++;
  } else {
    label.classList.add("wrong");
    document.querySelectorAll(`input[name="${name}"]`).forEach(i => {
      if (i.value === correct) {
        i.parentElement.classList.add("correct");
      }
    });
  }

  // remove all radio buttons after answering
  document.querySelectorAll("input[type='radio']").forEach(input => {
    input.remove();
  });

  document.getElementById("nextBtn").style.display = "block";
}

// ================= NEXT QUESTION =================
document.getElementById("nextBtn").onclick = () => {
  currentQ++;

  if (currentQ < quiz.length) {
    showQuestion();
  } else {
    // 🔓 unlock only AFTER test ends
    document.getElementById("quizContainer").innerHTML =
      "<h2>Test Completed</h2>";
    document.getElementById("timer").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("score").innerText =
      `Final Score: ${score} / ${quiz.length}`;
  }
};

// ================= INIT =================
showQuestion();