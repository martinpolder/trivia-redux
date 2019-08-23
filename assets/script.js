

var questions = [{
    question: "What is Ringo Starr's real name?",
    answers: ["That is his real name!", "Ritchie Staarsgard", "Ron Stahren", "Richard Starkey"],
    correctAnswer: "Richard Starkey",
},
{
    question: "Who is considered The Fifth Beatle? (hint: many are, but this one is a producer)",
    answers: ["George Martin", "Geoff Michaels", "Pete Best", "Jeff Lynne"],
    correctAnswer: "George Martin",
},
{
    question: "In which German city did the lads hone their live chops before fame?",
    answers: ["Dusseldorf", "Hamburg", "Frankfurt", "Berlin"],
    correctAnswer: "Hamburg",
},
{
    question: "Paul McCartney wrote Hey Jude for John's son named",
    answers: ["Judd", "John Jacob Jingleheimer-Schmidt ", "Julius", "Julian"],
    correctAnswer: "Julian",
},
{
    question: "Who was the Beatle's spiritual advisor on their trips to India?",
    answers: ["Maharishi Mahesh Yogi", "Ravi Shankar", "Joel Osteen", "Herman Hesse"],
    correctAnswer: "Maharishi Mahesh Yogi",
},
{
    question: "George loved to incorporate which unique instrument on his songs?",
    answers: ["Koto", "Banjo", "Sitar", "Accordion"],
    correctAnswer: "Sitar",
},
{
    question: "What was the Beatles' first #1 single in the US?",
    answers: ["I Want To Hold Your Hand", "Help!", "Can't By Me Love", "Eight Days A Week"],
    correctAnswer: "I Want To Hold Your Hand",
},
{
    question: "Who is the Walrus?",
    answers: ["John", "Paul", "George", "Ringo"],
    correctAnswer: "Paul",
},
{
    question: "In the famous Abbey Road cover, who is the gravedigger?",
    answers: ["John", "Paul", "George", "Ringo"],
    correctAnswer: "George",
},
{
    question: "The beginning of All You Need Is Love uses which country's anthem?",
    answers: ["England", "Ireland", "Italy", "France"],
    correctAnswer: "France",
},

];

var card = $("#quiz-area");

var countStartNumber = 20;



var timer;

var game = {

    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    // if the user runs out of time
    countdown: function () {
        this.counter--;
        $("#counter-number").text(this.counter);
        if (this.counter === 0) {
            console.log("TIME'S UP!");
            this.timeUp();
        }
    },

    loadQuestion: function () {

        timer = setInterval(this.countdown.bind(this), 1000);

        card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            card.append("<button class='answer-button btn-primary btn-lg btn-block' id='button' data-name='" + questions[this.currentQuestion].answers[i]
                + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function () {
        this.counter = window.countStartNumber;
        $("#counter-number").text(this.counter);
        this.currentQuestion++;
        this.loadQuestion.bind(this)();
    },

    timeUp: function () {

        clearInterval(window.timer);

        $("#counter-number").text(this.counter);

        card.html("<h2>Out of Time!</h2>");
        card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
      

        if (this.currentQuestion === questions.length - 1) {
            setTimeout(this.results.bind(this), 2 * 1000);
        }
        else {
            setTimeout(this.nextQuestion.bind(this), 2 * 1000);
        }
    },

    results: function () {

        clearInterval(window.timer);

        card.html("<h2>Show's over! Here's your score:</h2>");

        $("#counter-number").text(this.counter);

        card.append("<h3>Correct Answers: " + this.correct + "</h3>");
        card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        card.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
        card.append("<br><button id='start-over'>Try Again</button>");
    },

    clicked: function (e) {
        clearInterval(window.timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        }
        else {
            this.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function () {

        this.incorrect++;

        clearInterval(window.timer);

        card.html("<h2>Nope!</h2>");
        card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
      

        if (this.currentQuestion === questions.length - 1) {
            setTimeout(this.results.bind(this), 2 * 1000);
        }
        else {
            setTimeout(this.nextQuestion.bind(this), 2 * 1000);
        }
    },

    answeredCorrectly: function () {

        clearInterval(window.timer);

        this.correct++;

        card.html("<h2>Correct!</h2>");
      

        if (this.currentQuestion === questions.length - 1) {
            setTimeout(this.results.bind(this), 2 * 1000);
        }
        else {
            setTimeout(this.nextQuestion.bind(this), 2 * 1000);
        }
    },

    reset: function () {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function (e) {
    game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function () {
    $("#sub-wrapper").prepend("<h6>Time Remaining: <span id='counter-number'>20</span> Seconds</h6>");
    game.loadQuestion.bind(game)();
});
