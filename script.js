// --- LISTA DE PERGUNTAS ---
const arrayQuestions = [
    {
        "category": "Desemprego",
        "type": "multiple",
        "difficulty": "medium",
        "question": "As pessoas pedirem conta ou serem mandadas embora está associado a qual TIPO de desemprego?",
        "correct_answer": "Natural",
        "incorrect_answers": [
            "Estrutural",
            "Involuntário",
            "Sazonal"
        ]
    },
    {
        "category": "Desemprego",
        "type": "multiple",
        "difficulty": "easy",
        "question": "Como podemos combater um cenário de desemprego Estrutural, onde falta mão de obra qualificada?",
        "correct_answer": "Mais instrução e capacitação profissional",
        "incorrect_answers": [
            "Pagar mais",
            "Pagar menos",
            "Mais feriados comerciais"
        ],
    },
    {
        "category": "Inflação & Desemprego",
        "type": "multiple",
        "difficulty": "medium",
        "question": "Uma grande empresa fecha as portas. Há um AUMENTO do desemprego e uma QUEDA nos preços dos bens e serviços da cidade. Com base neste cenário, podemos concluir que:",
        "correct_answer": "Inflação e desemprego possuem uma relação inversa",
        "incorrect_answers": [
            "Inflação é algo que só afeta a classe média",
            "Inflação e desemprego não possuem relação alguma",
            "Inflação é uma invenção da mídia"
        ],
    },
    {
        "category": "Inflação",
        "type": "boolean",
        "difficulty": "easy",
        "question": "Tipo de Inflação definida como a meta do governo e da economia:",
        "correct_answer": "Inflação Ideal",
        "incorrect_answers": [
            "Inflação Inercial",
            "Inflação de Demanda",
            "Inflação de Oferta"
        ],
    },
    {
        "category": "Inflação",
        "type": "boolean",
        "difficulty": "easy",
        "question": "A principal causa da Inflação de DEMANDA é o excesso de demanda em relação à produção disponível - esta afirmação está:",
        "correct_answer": "CERTA",
        "incorrect_answers": [
            "ERRADA"
        ],
    },
    {
        "category": "Inflação",
        "type": "multiple",
        "difficulty": "medium",
        "question": "Num cenário de juros MENORES -> MAIS crédito -> e MAIS consumo, que tipo de Inflação pode ocorrer?",
        "correct_answer": "Inflação de Demanda",
        "incorrect_answers": [
            "Inflação Ideal",
            "Inflação Inercial",
            "Inflação de Custos"
        ],
    },
    {
        "category": "Inflação",
        "type": "boolean",
        "difficulty": "medium",
        "question": "Para combater um cenário de Inflação de Demanda onde há MUITO crédito e MUITO consumo, é necessário:",
        "correct_answer": "Aumentar a taxa de juros",
        "incorrect_answers": [
            "Diminuir a taxa de juros"
        ],
    },
    {
        "category": "Inflação",
        "type": "multiple",
        "difficulty": "easy",
        "question": "Demanda estável e custos de produção elevados pode gerar uma:",
        "correct_answer": "Inflação de Custos",
        "incorrect_answers": [
            "Inflação de Demanda",
            "Inflação Inercial",
            "Inflação Ideal"
        ],
    },
];

// --- VARIÁVEIS DE ESCOPO GLOBAL ---
const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;

// --- EVENT LISTENERS ---
function eventListeners() {
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', restartQuiz);
}

document.addEventListener('DOMContentLoaded', function () {
    loadQuestion();
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
});

// --- DEMAIS FUNÇÕES ---

// armazena as questões que já foram exibidas
const displayedQuestions = [];

// seleciona uma questão aleatória de arrayQuestions 
// e verifica se ela já foi exibida anteriormente
function loadQuestion() {
  let question = arrayQuestions[Math.floor(Math.random() * arrayQuestions.length)];
  while (displayedQuestions.includes(question)) {
    question = arrayQuestions[Math.floor(Math.random() * arrayQuestions.length)];
  }
  displayedQuestions.push(question);
  _result.innerHTML = "";
  showQuestion(question);
}

function showQuestion(data) {
    _checkBtn.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;

    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);

    _question.innerHTML = `${data.question} <br> <span class = "category"> ${data.category} </span>`;
    _options.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;

    selectOption();
}

function selectOption() {
    _options.querySelectorAll('li').forEach(function (option) {
        option.addEventListener('click', function () {
            if (_options.querySelector('.selected')) {
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

function checkAnswer() {
    _checkBtn.disabled = true;
    if (_options.querySelector('.selected')) {
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if (selectedAnswer == correctAnswer) {
            correctScore++;
            _result.innerHTML = `<p><i class = "fas fa-check"></i>Acertou! Sabe muito.</p>`;
        } else {
            _result.innerHTML = `<p><i class = "fas fa-times"></i>Erooou!</p> <small><b>Ver Resposta: </b>${correctAnswer}</small>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class = "fas fa-question"></i>Por favor, selecione uma opção.</p>`;
        _checkBtn.disabled = false;
    }
}

function checkCount() {
    askedCount++;
    setCount();
    if (askedCount == totalQuestion) {
        _result.innerHTML += `<p>Sua pontuação é ${correctScore}.</p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(function () {
            loadQuestion();
        }, 1000);
    }
}

function setCount() {
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

function restartQuiz() {
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}