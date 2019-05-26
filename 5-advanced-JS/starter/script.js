/*
--- Let's build a fun quiz game in the console! ---

//1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

//2. Create a couple of questions using the constructor

//3. Store them all inside an array

//4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

//5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

//6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

//7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).

--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/
let userChoice, questionArray;
function questionPrompt(response, callback) {
  if (response !== "EXIT") {
    questionIndex = Math.floor(Math.random() * questionArray.length);
    console.log(questionIndex);
    questionArray[questionIndex].askQuestion();

    userChoice = (prompt("Your answer is"));
    questionArray[questionIndex].verifyAnswer(parseInt(userChoice));
    callback(userChoice, callback);
  }
}

(function() {
  let questionNumber = 0;
  function Question(question, answerArray, rightAnswer) {
    this.Question = question;
    this.answers = answerArray;
    this.rightAnswer = rightAnswer;
  }
  Question.prototype.askQuestion = function() {
    questionNumber++;
    console.log(questionNumber + ")" + this.Question);

    for (let i in this.answers) {
      console.log("   " + (parseInt(i) + 1) + "." + this.answers[i]);
    }
  };

  Question.prototype.verifyAnswer = function(ans) {
    if (ans - 1 === this.rightAnswer) {
      alert("Right answer!");
    } else {
      alert("Wrong answer :(");
    }
  };

  let answer1 = ["V8", "Zend", "GCC"];
  let question1 = new Question("PHP runtime is", answer1, 1);

  let answer2 = ["Compiled", "Interpreted", "JIT-ed"];
  let question2 = new Question("V8 runtime is ", answer2, 2);

  let answer3 = ["Flat 6", "V6", "V8"];
  let question3 = new Question("Prosche 911 has an engine type of", answer3, 0);

  let answer4 = ["To C", "To Be", "To Sneed"];
  let question4 = new Question("To C or not ", answer4, 2);

  questionArray = [question1, question2, question3, question4];

  userChoice = parseInt(prompt("Start game? "));
  /* Just calling questionPromp will quickly call the prompt function, and prompt function interfers with fully rendering the page
  *  That is why we use setTimeout function with 0. This means that after the first prompt instead of calling questionPrompt immediately
  *  which calls the prompt method which blocks the render, the questionPrompt gets put into the event queue, which ends for the global execution stack to exit.
  *  Once the global execution stack exits, the page has a chance to fully render. (which also means we can see the damn questions on the console).
  * 
  * In a nutshell, setTimeout is here so that the page is fully rendered before questionPrompt is called again.
   */
  setTimeout(questionPrompt,0,userChoice,questionPrompt);
  
})();



/*function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}
*/
/*
var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');


teacherQuestion('John');
designerQuestion('John');
designerQuestion('jane');
designerQuestion('Mark');
designerQuestion('Mike');
interviewQuestion('teacher')('Mark');
interviewQuestion()("Sneed");


function interviewQuestion(job)
{
    return function(name)
    {
        if(job === "designer")
        {
            console.log("Hello",name,"Can you explain what UX design is?");
        }
        else if(job === "teacher")
        {
            console.log("Hello",name,"What subject do you teach?");
        }
        else
        {
            console.log("Hello",name,"What do you do?");
        }
    }
}

*/

/*

var years = [1990, 1965, 1937, 2005, 1998];
//general purpose function to iterate over a array. it takes each value of an array and calls a callback function with the array value.
function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(limit, el) {
    return el >= limit;
}

let fullJapan = isFullAge.bind(this,27);

let ageArray = arrayCalc(years,calculateAge);
console.log(ageArray);
let returnArray = arrayCalc(ageArray,fullJapan)
console.log(returnArray);

*/

// var ages = arrayCalc(years, calculateAge);
// var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
// console.log(ages);
// console.log(fullJapan);
