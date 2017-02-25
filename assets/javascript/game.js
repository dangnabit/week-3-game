var playerLives = 0;
var wordList = ["Macho Man", "Hulk Hogan", "Bret Hart", "Lex Luger", "efgzzz"];
var wordPick = "";
var wordShow = [];
var wordArr = [];
var hangman = $("#hangmanWord");
var playerP = $("#lives")
var guessP = $("#guesses")
var letterArr = [];
var winCount = 0;
var lossCount = 0;

function newWord() {
    var wordPick = wordList[Math.floor(Math.random() * wordList.length)];
    // empties HTML from the document
    hangman.empty();
    wordPick = wordPick.split("");
    wordShow = [];
    wordArr = [];
    letterArr = [];
    // console.log(wordPick);

    for (var i = 0; i < wordPick.length; i++) {
        if (wordPick[i] == " ") {
            wordPick[i] = "-";
        };

        wordArr.push(wordPick[i].toUpperCase());

        if (wordPick[i] == "-") {
            wordShow.push("-");
        } else {
            wordShow.push("_");
        };



        if (wordArr.length < (wordPick.length * 2 - 1)) {
            wordArr.push(" ");
            wordShow.push(" ");
        };
    };

    hangman.html(wordShow);
    playerLives = 5;
    playerP.html("Lives Remaining: " + playerLives);
    guessP.html(letterArr);
};





$(document).ready(function() {

    // window.onload = function play() {

    $("#hangmanStart").on("click", function() {

        newWord();

        playerP.html("Lives Remaining: " + playerLives);




        document.onkeyup = function(event) {

            if (event.code == "Escape") {
                // restrarts game, clears guesses and gets a new word
                hangman.empty();
                newWord();

            } else if (playerLives > 0 && event.key.length == 1 && isNaN(event.key)) {
                // sanitizes input and checks if the input has been entered before. 
                var letter = event.key.toUpperCase();
                var x = 0;
                for (var i = 0; i < letterArr.length; i++) {

                    if (letter == letterArr[i]) {
                        x = 1;
                        guessP.html("Stop Pressing that one, brother.")
                    };

                };
                // adds guess to the "Guessed array"
                if (x == 0) {
                    letterArr.push(letter);
                };




                var y = 0;
                // checks guess against the answer, if its correct , adds the guess to the solution area
                for (var i = 0; i < wordShow.length; i++) {
                    if (letter == wordArr[i]) {
                        wordShow[i] = letter;
                        y = 1;
                    };
                };

                if (y == 0) {
                    playerLives--;
                };
                // rewrites the solution area 

                hangman.html(wordShow);

                if (playerLives > 0) {
                    playerP.html("Lives Remaining: " + playerLives);
                } else {
                    lossCount++;
                    playerP.html("You Lose! Press 'Esc' to replay!" + "<br>" + "Wins: " + winCount + "<br>" + "Losses: " + lossCount);

                };

                guessP.html(letterArr);

                if (x == 1) {
                    guessP.append("<br>" + "Stop pressing that one, brother.")
                };

                // checks win conditions
                if (wordArr.toString() == wordShow.toString()) {
                    hangman.empty();
                    hangman.append(wordShow);
                    winCount++;
                    playerP.html("You Win! Press 'Esc' to replay!" + "<br>" + "Wins: " + winCount + "<br>" + "Losses: " + lossCount);
                    playerLives = 0;
                };
            };
        };
    });
});
