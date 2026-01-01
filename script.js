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
let locked = false;
const timeLimit = 5;

let candidateName = "";
let candidateEmail = "";

// ================= FORM =================
function startExam() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const error = document.getElementById("error");

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!name) {
    error.innerText = "Name is required";
    return;
  }

  if (!gmailRegex.test(email)) {
    error.innerText = "Enter a valid Gmail ID (abc@gmail.com)";
    return;
  }

  candidateName = name;
  candidateEmail = email;

  document.getElementById("formBox").style.display = "none";
  document.getElementById("quizBox").style.display = "block";

  showQuestion();
}

// ================= QUIZ =================
function showQuestion() {
  clearInterval(timer);
  locked = false;

  const q = quiz[currentQ];
  const box = document.getElementById("quizContainer");
  box.innerHTML = `<p>${q.question}</p>`;
  document.getElementById("nextBtn").style.display = "none";

  for (let key in q.options) {
    const label = document.createElement("label");
    label.innerHTML = `${key}: ${q.options[key]}`;
    label.onclick = () => !locked && checkAnswer(label, key, q.answer);
    box.appendChild(label);
  }

  startTimer();
}

function startTimer() {
  let t = timeLimit;
  document.getElementById("timer").innerText = `Time: ${t}s`;

  timer = setInterval(() => {
    t--;
    document.getElementById("timer").innerText = `Time: ${t}s`;
    if (t === 0) {
      clearInterval(timer);
      lockQuestion();
    }
  }, 1000);
}

function checkAnswer(label, selected, correct) {
  locked = true;
  clearInterval(timer);

  if (selected === correct) {
    label.classList.add("correct");
    score++;
  } else {
    label.classList.add("wrong");
  }

  document.getElementById("nextBtn").style.display = "block";
}

function lockQuestion() {
  locked = true;
  document.getElementById("nextBtn").style.display = "block";
}

document.getElementById("nextBtn").onclick = () => {
  currentQ++;
  if (currentQ < quiz.length) {
    showQuestion();
  } else {
    endExam();
  }
};

// ================= SEND RESULT =================
function endExam() {
  document.getElementById("quizContainer").innerHTML = "<h3>Test Completed</h3>";
  document.getElementById("timer").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("score").innerText =
    `Score: ${score} / ${quiz.length}`;

  fetch("https://script.google.com/macros/s/AKfycbxiglE_m5J-JsHkcsbTJLsZoYjmUOrKXagssP3Ez_4p6BnZx9fOXwadhJGfflZQsVyNvA/exec", {
    method: "POST",
    body: JSON.stringify({
      name: candidateName,
      email: candidateEmail,
      score: score
    })
  });
}


