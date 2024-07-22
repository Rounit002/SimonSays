
var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];  

var started=false;

var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        
        started=true;
    }
})

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour)

    var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    audio.play();

    checkAnswer(userClickedPattern.length-1);

    animatePress(currentColour);

    // $(".btn").addClass("pressed");

    // setTimeout(function(){
    //     $(".btn").removeClass("pressed");  
    // }, 50);
    
});


function nextSequence() {

    userClickedPattern=[];

    level++;
    var randomNumber= Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    
        $("#level-title").text("Level " + level);
    
}


function animatePress (currentColour) {
    
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {

        $("#" + currentColour).removeClass("pressed");
        
    }, 100);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("success");
    
    if (userClickedPattern.length===gamePattern.length) {
       setTimeout( function() {
          nextSequence();
       }, 1000);
    }
    } else {
        var audio = new Audio ("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        console.log("wrong")

        startOver();
    }
}

function startOver() {
    level=0;
    gamePattern=[];
    started=false;
    
}





  
    



