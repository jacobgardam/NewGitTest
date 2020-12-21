
var GameRunning=false;
var Score=0;
var TimeAllowed = 5;
var Timer = TimeAllowed;
var startTimer=false;

var MinSize;
var MaxSize;
var DeductionSize;

var gameWindowWidth;
var gameWindowHeight;

document.getElementById("ShapeButton").onclick = function(){
    startTimer=true;
    StartGame();
}
document.getElementById("Shape").onclick = function(){
    GenerateShape(document.getElementById("Shape"));
    ScorePoint();
}

function ScorePoint(){
    Score+=1; // add point
    
    // Reduce TimeAllowed per Point scored 
    if(TimeAllowed > 0.75){
        TimeAllowed-=0.15;
    }else {
        TimeAllowed = 0.75;
    }
        
    Timer = TimeAllowed;
        
        
    if(MaxSize >= (MinSize+DeductionSize)){
        MaxSize -= DeductionSize; // increase difficulty by making newly generated shapes smaller
    }
}

var TimerCountdown = setInterval(function(){
        if(Timer >=(0.00) && startTimer){
            console.log(GameRunning);
            document.getElementById("ScoreHUD").innerHTML = "Score: " + Score;
            document.getElementById("TimerHUD").innerHTML = "Timer: " + Timer.toFixed(2);
            GameRunning=true;
            Timer -= 0.1;
        }else {
            document.getElementById("ScoreHUD").innerHTML = "Score: " + 0;
            document.getElementById("TimerHUD").innerHTML = "Timer: " + 5 + "s";
            GameRunning=false;
            RestartGame();
            console.log(GameRunning);
        }   
    
}, 100);

function RestartGame(){
    if(startTimer){
        document.getElementById("Shape").style.visibility = 'hidden';

        GameRunning=false;
        MinSize=30;
        MaxSize=400;
        DeductionSize=30;


        Score = 0; 
        TimeAllowed=5; // 5 seconds allowed 
        Timer = TimeAllowed;

        // Set all elements with the class MENU SCREEN to invisible 
        for(i=0;i<document.getElementsByClassName("MenuScreen").length;i++){
            document.getElementsByClassName("MenuScreen")[i].style.visibility = "visible";
        }
        
        startTimer=false;
    }
}

function StartGame(){
    MinSize=30;
    MaxSize=400;
    DeductionSize=30;
    
    
    Score = 0; 
    TimeAllowed=5; // 5 seconds allowed 
    Timer = TimeAllowed;
    
    gameWindowWidth=1200;
    gameWindowHeight=700;
    
   
    // Set all elements with the class MENU SCREEN to invisible 
    for(i=0;i<document.getElementsByClassName("MenuScreen").length;i++){
        document.getElementsByClassName("MenuScreen")[i].style.visibility = "hidden";
    }

    GameRunning=true;
    GenerateShape(document.getElementById("Shape"));
}

function GenerateShape(obj){
    var tempShape = Math.floor((Math.random()*2)+1);
    var tempSize = Math.floor((Math.random()*(MaxSize-MinSize) + MinSize));
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var posX = Math.floor((Math.random() * (gameWindowWidth-tempSize)));
    var posY = Math.floor((Math.random() * (gameWindowHeight-tempSize)));
    var roT = 45;
    
    
    console.log("X: " + posX + "Y: " + posY);
    
    // make shape circle or square
    if(tempShape==1){
        obj.style.borderRadius = '0px';
    }else{
        obj.style.borderRadius = '50%';
    }
    
    // if random colour is the same as background, change it
    if(randomColor=='#ffffff'){
        randomColor='#000000';
    }
    
    obj.style.visibility = 'visible';
    obj.style.width = tempSize;
    obj.style.height = tempSize;
    obj.style.backgroundColor = randomColor;
    obj.style.left = posX;
    obj.style.top = posY;  
    obj.style.transform = "rotate('roT' + deg";
    console.log(roT);
}