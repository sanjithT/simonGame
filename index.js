var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickerPattern = [];
var started = false;
var level = 0;


$(document).keypress(function () {
    if (!started) {
        $('#level-title').text('level ' + level);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function () {
    var userChosenColor = $(this).attr('id');
    userClickerPattern.push(userChosenColor);
    var path = "sounds/" + userChosenColor + ".mp3";
    playSound(path);
    animatePress(userChosenColor);
    checkAnswer(userClickerPattern.length - 1);
});

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickerPattern[currentLevel]) {
        console.log('success');
        if (userClickerPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('sounds/wrong.mp3');

        $("body").addClass('game-over');
        setTimeout(function () {
            $("body").removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }

}

function animatePress(currentColor) {
    $('.' + currentColor).addClass('pressed');
    setTimeout(function () {
        $('.' + currentColor).removeClass('pressed');
    }, 100);

}





function playSound(path) {
    var audio = new Audio(path);
    audio.play();
}

function nextSequence() {
    userClickerPattern = [];
    level++;
    $('#level-title').text('level ' + level);

    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);

    var path = "sounds/" + randomChosenColor + ".mp3";
    playSound(path);


}





