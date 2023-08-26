// --- VARIÁVEIS DE ESCOPO GLOBAL ---
const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
// const _correctScore = document.getElementById('correct-score');
const _askedScore = document.getElementById('asked-score');
const _totalQuestion = document.getElementById('total-question');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 5;

// --- EVENT LISTENERS ---
function eventListeners() {
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', restartQuiz);
}

document.addEventListener('DOMContentLoaded', function () {
    loadQuestion();
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _askedScore.textContent = askedCount;
});

// --- DEMAIS FUNÇÕES ---

// carrega perguntas do arquivo JSON
let arrayQuestions = [];
fetch('questions.json')
    // pega a resposta da requisição, lê o corpo da resposta como JSON e retorna os dados para o argumento "data"
    .then(response => response.json())
    .then(data => {
        arrayQuestions = data;
        loadQuestion();
    })
    .catch(error => {
        console.error('Erro ao carregar as perguntas:', error);
    });

// armazena as questões que já foram exibidas
const displayedQuestions = [];

// seleciona uma questão aleatória de arrayQuestions 
// e verifica se ela já foi exibida anteriormente
function loadQuestion() {
    if (displayedQuestions.length >= arrayQuestions.length) {
        console.log("Todas as perguntas foram exibidas!");
        return;
    }

    let question = arrayQuestions[Math.floor(Math.random() * arrayQuestions.length)];
    while (displayedQuestions.includes(question)) {
        question = arrayQuestions[Math.floor(Math.random() * arrayQuestions.length)];
    }
    displayedQuestions.push(question);
    _result.innerHTML = "";
    showQuestion(question);
}

function showQuestion(data) {
    if (!data) {
        console.error("Dados da pergunta não fornecidos!");
        return;
    }
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
            _result.innerHTML = `<p><i class = "fas fa-check"></i>Acertou!</p>`;
        } else {
            _result.innerHTML = `<p><i class = "fas fa-times"></i>Erooou!</p> <small><b>Resposta certa: </b>${correctAnswer}</small>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class = "fas fa-question"></i>Por favor, selecione uma opção.</p>`;
        setTimeout(() => {
            _result.innerHTML = ''; // Limpa o conteúdo de _result após 2 segundos
        }, 2000);
        _checkBtn.disabled = false;
    }
}

function checkCount() {
    askedCount++;
    setCount();
    if (askedCount == totalQuestion) {
        setTimeout(function () {
            console.log("");
        }, 5000);
        _result.innerHTML += `<p>Sua pontuação final é ${correctScore}.</p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(function () {
            loadQuestion();
        }, 2000);
    }
}

function setCount() {
    _totalQuestion.textContent = totalQuestion;
    _askedScore.textContent = askedCount;
}

function restartQuiz() {
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}