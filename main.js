const container = document.getElementById("snake_container");
const apple = document.getElementById("apple");
const snake = document.getElementById("snake");
const lostContainer = document.getElementById("lost_container");
const score = document.getElementById("score");
const restart = document.getElementById("snake_replay");
var snakeXY = [[10,11]];
var snakeLength = 1;
var oldDir = 0;
let gen=0;
var game=true;
var scoreJS = 0;
var appleX = 0;
var appleY = 0;
var scoreUpdate = () => {
    scoreJS+=10;
    score.innerHTML = scoreJS;
}
var snakeHTML = (e) => {
    return "<div id='snake_"+e+"' class='snake snake_"+e+"'></div>";
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var defApple = () => {
    appleX=getRndInteger(1,21);
    appleY=getRndInteger(1,21);
    rmApple = document.getElementById('apple');
    container.removeChild(rmApple);
    container.innerHTML += "<div id='apple'></div>";
    document.getElementById('apple').style.gridArea = appleX+" / "+appleY;
}
defApple()
setInterval(function() {
    document.addEventListener('keydown', key);
    function key(e) {
        if (e.code == 'KeyW' && oldDir != 2) {
            oldDir=1;
        }
        else if (e.code == 'KeyS' && oldDir != 1){
            oldDir=2;
        }
        else if (e.code == 'KeyA' && oldDir != 4) {
            oldDir=3;
        }
        else if (e.code == 'KeyD' && oldDir != 3) {
            oldDir=4;
        }
    }
    if (game==true) {
        if (oldDir==1) {
            snakeXY.splice(0,0,([snakeXY[0][0]-1,snakeXY[0][1]]));
        }
        else if (oldDir==2) {
            snakeXY.splice(0,0,([snakeXY[0][0]+1,snakeXY[0][1]]));
        }
        else if (oldDir==3) {
            snakeXY.splice(0,0,([snakeXY[0][0],snakeXY[0][1]-1]));
        }
        else  if (oldDir==4) {
            snakeXY.splice(0,0,([snakeXY[0][0],snakeXY[0][1]+1]));
        }
        for (i in snakeXY) {
            container.innerHTML += snakeHTML(gen);
            if (snakeXY[i][0]==0 && snakeXY[i][1]!=0) {
                document.getElementsByClassName('snake_'+String(gen))[i].style.gridArea = 1+" / "+snakeXY[i][1];
            }
            else if (snakeXY[i][0]!=0 && snakeXY[i][1]==0) {
                document.getElementsByClassName('snake_'+String(gen))[i].style.gridArea = snakeXY[i][0]+" / "+1;
            }
            else {
                document.getElementsByClassName('snake_'+String(gen))[i].style.gridArea = snakeXY[i][0]+" / "+snakeXY[i][1];
            }
        }
        if (snakeXY[0][0] == appleX && snakeXY[0][1] == appleY) {
            scoreUpdate();
            snakeLength+=2;
            defApple();
        }
        if (gen>0) {
            for (i in snakeXY) {
                rmSnake = document.getElementById('snake_'+String(gen-1));
                if (rmSnake!=null) {
                    container.removeChild(rmSnake);
                }
            }
        }
        snakeXY.length = snakeLength;
        gen++;
        for (b in snakeXY) {        
            if ((snakeXY[0][0] == snakeXY[b][0]) && (snakeXY[0][1] == snakeXY[b][1]) && b!=0) {
                game=false;
            }
        }
        if (snakeXY[0][0] > 20 || snakeXY[0][0] < 1 || snakeXY[0][1] > 20 || snakeXY[0][1] < 1) {
            game=false;
        }
    }
    else {
        lostContainer.innerHTML = "You lost";
        restart.style.display = "block";
    }  
}, 100);
