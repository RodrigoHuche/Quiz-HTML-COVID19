//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Tempo"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// Botão sair clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //carregar a pagina
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// botão proximo clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //contagem de perguntas menor que total
        que_count++; // incremento do que_count valor
        que_numb++; // incremento do que_numb valor
        showQuetions(que_count); // chamada do showQuestions função
        queCounter(que_numb); // amostra do que_numb valor para o queCounter
        clearInterval(counter); // limpar contador
        clearInterval(counterLine); // limpar counterLine
        startTimer(timeValue); // chamada do startTimer função
        startTimerLine(widthValue); // chamada startTimerLine função
        timeText.textContent = "Tempo"; // muda timeText para tempo
        next_btn.classList.remove("show"); // esconde o botão de proximo
    }else{
        clearInterval(counter); //limpa contador
        clearInterval(counterLine); //limpa linha do contador
        showResult(); //chama showResult function
    }
}

// pegando as questões e funções do array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //valor novo, span + index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //novo valor dentro do que_tag
    option_list.innerHTML = option_tag; //adicionando novo valor dentro de option_tag
    
    const option = option_list.querySelectorAll(".option");

    // atribuindo onclick para todas as opções variaveis
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// criando uma nova div tags para os icones
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//para click na opções
function optionSelected(answer){
    clearInterval(counter); //limpar contador
    clearInterval(counterLine); //limpar contador de linha
    let userAns = answer.textContent; //buscar a opção da linha
    let correcAns = questions[que_count].answer; //buscar opção correta do array
    const allOptions = option_list.children.length; //listar todas opções
    
    if(userAns == correcAns){ //se a resposta tiver correta
        userScore += 1; //adiciona valo +1 no score
        answer.classList.add("correct"); //adiciona cor verde a resposta
        answer.insertAdjacentHTML("beforeend", tickIconTag); //marcação de correto
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adiciona cor vermelha a resposta fora do array = errado
        answer.insertAdjacentHTML("beforeend", crossIconTag); //mostra errado com simbolo
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //procura e mostra resposta certa
                option_list.children[i].setAttribute("class", "option correct"); //adiciona cor verde a resposta certa
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adiciona marcação de certo resposta
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //ao responder, desabilita outras opções
    }
    next_btn.classList.add("show"); //mostra o botão proximo, depois de responder a questão
}

function showResult(){
    info_box.classList.remove("activeInfo"); //esconde a caixa de informações
    quiz_box.classList.remove("activeQuiz"); //esconde a caixa do quiz
    result_box.classList.add("activeResult"); //mostra a caixa de resultado
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 8){ // se usuário marcar mais que 8 pontos
        //cria um novo span mostrando o resultado
        let scoreTag = '<span>Parabéns! 🎉, Você teve <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //cria novo span dando parabéns junto com resultado
    }
    else if(userScore > 5){ // se usuário acertar a metade
        let scoreTag = '<span>Precisa 😎, estudar <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;//cria novo span dando precisa estudar junto com resultado
    }
    else{ // se usuário errar tudo
        let scoreTag = '<span>Cuidado 😐, você errou tudo! <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;//cria novo span dando cuidado junto com resultado
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //alterando o valor de timeCount com o valor de tempo
        time--; //decrecenta o valor de time
        if(time < 9){ //se tempo for menor que 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //adiciona zero ao valor de tempo
        }
        if(time < 0){ //se tempo for menor que zero, esgotado
            clearInterval(counter); //limpa contador
            timeText.textContent = "acabou o tempo"; //muda o texto para acabou tempo
            const allOptions = option_list.children.length; //busca todas opções
            let correcAns = questions[que_count].answer; //marca resposta correta da matriz
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //se houver uma opção que corresponda a uma resposta de matriz
                    option_list.children[i].setAttribute("class", "option correct"); //adiciona cor verde a resposta certa
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adiciona marcação de certo
                    console.log("Time Off: Auto selected correct answer."); //seleciona a resposta certa se o tempo acabar
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //ao marcar uma opção, desativa as outras
            }
            next_btn.classList.add("show"); //motra botão de proximo, apos selecionar resposta
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //aumenta o valor do tempo
        time_line.style.width = time + "px"; //aumentando a largura da linha do tempo com px pelo valor do tempo
        if(time > 549){ //se o valor do tempo for maior que 549
            clearInterval(counterLine); //limpa o contador
        }
    }
}

function queCounter(index){
    //criando uma nova tag de span e passando o número da pergunta e o total pergunta
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adicionar nova tag span dentro de bottom_ques_counter
}