var gamePattern=[""];
var userClickedPattern=[""];
var level=0;
var started=false;

$("body").on("keydown",function(){
    if(!started){
        nextSequence();
        $("#level-title").text("Level "+ level);
        started=true;
    }
});

//btn is clicked and an array stores the value of the button which was clicked

$(".btn").click(function(){
    var userChosenColour=this.id;//to store the id of the button which got clicked
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    check(userClickedPattern.length-1);
});

//checks whether the input by the user matches the sequence generated else shows game over mssg

function check(currLevel){
    if(userClickedPattern[currLevel]===gamePattern[currLevel]){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
    else{
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

//generating a random sequence for the simon says task

function nextSequence(){
    function randomNumber(){
        return Math.floor(Math.random()*4);
    }
    
    var buttonColours=["red", "blue", "green", "yellow"];
    var randomChosenColour=buttonColours[randomNumber()];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level+=1;
    $("#level-title").text("Level " + level);
}

//to play the sound cue

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animating the button when clicked by the user

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },300);
}

//fresh start of the game after getting wrong 

function startOver(){
    started=false;
    gamePattern=[];
    userClickedPattern=[];
    level=0;
}
