// select all elements
const main = document.getElementById("main");
const num = document.getElementById("num");
const question = document.getElementById("question");
const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const choiceC = document.getElementById("choiceC");
const next = document.getElementById("next");

// create some variables
let index = 1;
let runningQSA = 1;
let runningQSB = 0;
let score = 0;
var randQSA;
var randQSB;
var q;


renderQuestionSetA();


// render a question
function renderQuestionSetA()   {
    num.innerHTML = "<h4>Q" + index + "</h4>";

    randQSA = Math.floor(Math.random() * tempQSA.length);
    q = tempQSA[randQSA];

    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = "<h4>A</h4><p>"+ q.choiceA +"</p>";
    choiceB.innerHTML = "<h4>B</h4><p>"+ q.choiceB +"</p>";
    choiceC.innerHTML = "<h4>C</h4><p>"+ q.choiceC +"</p>";

    tempQSA.splice(randQSA, 1);
}

function renderQuestionSetB()   {
    num.innerHTML = "<h4>Q" + index + "</h4>";

    randQSB = Math.floor(Math.random() * tempQSB.length);
    q = tempQSB[randQSB];

    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = "<h4>A</h4><p>"+ q.choiceA +"</p>";
    choiceB.innerHTML = "<h4>B</h4><p>"+ q.choiceB +"</p>";
    choiceC.innerHTML = "<h4>C</h4><p>"+ q.choiceC +"</p>";

    tempQSB.splice(randQSB, 1);
}

// choiceA.addEventListener('touchstart', function()   {
//     choiceA.style.color = "--MyWhite";
//     choiceA.style.backgroundColor = "--MyBlack";
// });

// checkAnswer
function checkAnswer(answer)    {
    var ans = answer;

    // if(ans == "A") {
    //     choiceA.style.color = "--MyWhite";
    //     choiceA.style.backgroundColor = "--MyBlack";
    // } else if (ans == "B") {
    //     choiceB.style.color = "black";
    // } else if (ans == "C") {
    //     choiceC.style.color = "black";
    // }
    if(runningQSA < 3)  {
        if(ans == tempQSA[randQSA.correct]) {
            score++;
            console.log(score);
        }
        index++;
        runningQSA++;
        renderQuestionSetA();
    } else if (runningQSB < 3)  {
        index++;
        runningQSB++;
        renderQuestionSetB();
    } else {
        scoreRender();
    }
}



// score render
function scoreRender()          {
    // next.innerHTML = "<p>"+ score +"</p>";
    console.log(score);
    window.open("/html/quiz_end.html","_self");
}


function fix()
{
    var el = this;
    var par = el.parentNode;
    var next = el.nextSibling;
    par.removeChild(el);
    setTimeout(function() {par.insertBefore(el, next);}, 0)
}