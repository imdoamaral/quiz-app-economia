// --- LISTA DE PERGUNTAS ---
// const arrayQuestions = [
//     {
//         "category": "Desemprego",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "As pessoas pedirem conta ou serem mandadas embora está associado a qual TIPO de desemprego?",
//         "correct_answer": "Natural",
//         "incorrect_answers": [
//             "Estrutural",
//             "Involuntário",
//             "Sazonal"
//         ]
//     },
//     {
//         "category": "Desemprego",
//         "type": "multiple",
//         "difficulty": "easy",
//         "question": "Como podemos combater um cenário de desemprego Estrutural, onde falta mão de obra qualificada?",
//         "correct_answer": "Mais instrução e capacitação profissional",
//         "incorrect_answers": [
//             "Pagar mais",
//             "Pagar menos",
//             "Mais feriados comerciais"
//         ],
//     },
//     {
//         "category": "Inflação & Desemprego",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "Uma grande empresa fecha as portas. Há um AUMENTO do desemprego e uma QUEDA nos preços dos bens e serviços da cidade. Com base neste cenário, podemos concluir que:",
//         "correct_answer": "Inflação e desemprego possuem uma relação inversa",
//         "incorrect_answers": [
//             "Inflação só afeta a classe média",
//             "Inflação e desemprego não possuem relação alguma",
//             "Inflação só existe na cabeça das pessoas"
//         ],
//     },
//     {
//         "category": "Inflação",
//         "type": "multiple",
//         "difficulty": "easy",
//         "question": "Tipo de Inflação definida como a meta do governo e da economia:",
//         "correct_answer": "Inflação Ideal",
//         "incorrect_answers": [
//             "Inflação Inercial",
//             "Inflação de Demanda",
//             "Inflação de Oferta"
//         ],
//     },
//     {
//         "category": "Inflação",
//         "type": "boolean",
//         "difficulty": "easy",
//         "question": "A principal causa da Inflação de DEMANDA é o excesso de demanda em relação à produção disponível - esta afirmação está:",
//         "correct_answer": "CERTA",
//         "incorrect_answers": [
//             "ERRADA"
//         ],
//     },
//     {
//         "category": "Inflação",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "Num cenário de juros MENORES -> MAIS crédito -> e MAIS consumo, que tipo de Inflação pode ocorrer?",
//         "correct_answer": "Inflação de Demanda",
//         "incorrect_answers": [
//             "Inflação Ideal",
//             "Inflação Inercial",
//             "Inflação de Custos"
//         ],
//     },
//     {
//         "category": "Inflação",
//         "type": "boolean",
//         "difficulty": "medium",
//         "question": "Para combater um cenário de Inflação de Demanda onde há MUITO crédito e MUITO consumo, é necessário:",
//         "correct_answer": "Aumentar a taxa de juros",
//         "incorrect_answers": [
//             "Diminuir a taxa de juros"
//         ],
//     },
//     {
//         "category": "Inflação",
//         "type": "multiple",
//         "difficulty": "easy",
//         "question": "Demanda estável e custos de produção elevados pode gerar uma:",
//         "correct_answer": "Inflação de Custos",
//         "incorrect_answers": [
//             "Inflação de Demanda",
//             "Inflação Inercial",
//             "Inflação Ideal"
//         ],
//     },
//     {
//         "category": "Inflação",
//         "type": "multiple",
//         "difficulty": "easy",
//         "question": "São CAUSAS da Inflação, EXCETO:",
//         "correct_answer": "Redução do gasto público",
//         "incorrect_answers": [
//             "Impressão de dinheiro pelo governo",
//             "Ajuste de preços por achar que o outro também vai ajustar",
//             "Desequilíbrio entre oferta e demanda de bens e serviços"
//         ],
//     },
//     {
//         "category": "Inflação",
//         "type": "multiple",
//         "difficulty": "easy",
//         "question": "AUMENTO geral do nível dos preços, o que resulta em PERDA de poder aquisitivo da moeda:",
//         "correct_answer": "Inflação",
//         "incorrect_answers": [
//             "Desemprego",
//             "Pandemia",
//             "Feriados comerciais"
//         ],
//     },
//     {
//         "category": "Inflação",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "São EFEITOS da Inflação, EXCETO:",
//         "correct_answer": "Prejudica a renda livre dos comerciantes",
//         "incorrect_answers": [
//             "Prejudica quem depende de salário mínimo",
//             "Resistência a investimentos de longo prazo",
//             "Dificulta exportações e estimula importações"
//         ],
//     },
//     {
//         "category": "Inflação",
//         "type": "boolean",
//         "difficulty": "medium",
//         "question": "Porque existem tantos índices de Inflação?",
//         "correct_answer": "Porque a alta de preços não atinge todo mundo da mesma forma",
//         "incorrect_answers": [
//             "Porque a alta de preços gera resistência a investimentos de longo prazo."
//         ],
//     },
//     {
//         "category": "Inflação",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "São formas de se COMBATER a Inflação, EXCETO:",
//         "correct_answer": "Dificultar exportações",
//         "incorrect_answers": [
//             "Alterar a taxa de juros",
//             "Controlar a emissão de dinheiro",
//             "Reduzir o gasto público"
//         ],
//     },
// ];

// --- VARIÁVEIS DE ESCOPO GLOBAL ---
const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _correctScore = document.getElementById('correct-score');
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
    _correctScore.textContent = correctScore;
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
        }, 1500);
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