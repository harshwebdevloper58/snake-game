console.log("let's write a JS")

//game constant
let inputdirection = { x: 0, y: 0 }
const gamemusic = new Audio('music/music.mp3')
const foodmusic = new Audio('music/food.mp3')
const gameovermusic = new Audio('music/gameover.mp3')
const movemusic = new Audio('music/move.mp3')
let speed = 7;
let lastpaintTime = 0;
let sankeArr = [{ x: 13, y: 16 }]
let food={x:3,y:6}
let score =0;
//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
        return;
     }
    lastpaintTime = ctime;
    gameEngine();
}

function iscollide(sarr){
    //bump into himself
    for(let i=1;i<sankeArr.length;i++){
        if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y){
            return true;
        }
    }
    //collide into a wall
    if(sankeArr[0].x>=18 ||sankeArr[0].x<=0 || sankeArr[0].y>=18 ||sankeArr[0].y<=0){
        return true;
    }
}


function gameEngine() {
    //update a snake array and food
    if (iscollide(sankeArr)) {
        gameovermusic.play();
        inputdirection = { x: 0, y: 0 };
        score = 0;
        scorebox.innerHTML="Score :"+score;
        alert("game over press any key to start");
        sankeArr = [{ x: 13, y: 16 }];
    }

    //if you have a eaten a food increment a score and regenerate a food
    //food is eaten
    if (sankeArr[0].x === food.x && sankeArr[0].y === food.y) {
        foodmusic.play();
        score++;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",hiscoreval);
            highscorebox.innerHTML="Highscore :"+hiscoreval
        }
        scorebox.innerHTML="Score :"+score;
        // Add a new segment at the front of the snake
        sankeArr.unshift({
            x: sankeArr[0].x + inputdirection.x,
            y: sankeArr[0].y + inputdirection.y
        });

        // Regenerate a new position for the food
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }

    //moving a snake
    for (let i = sankeArr.length - 2; i >= 0; i--) {
        // Move each segment to the position of the previous one
        sankeArr[i + 1] = { ...sankeArr[i] };
    }

    // Update the head position based on input direction
    sankeArr[0].x += inputdirection.x;
    sankeArr[0].y += inputdirection.y;

    //Display a snake and food
    //display a snake
    board.innerHTML = "";
    sankeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display a food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//main logic start here
let highscore = localStorage.getItem("hiscore");

if (highscore === null) {
    highscore = 0;
    localStorage.setItem("hiscore", highscore.toString());
} else {
    var hiscoreval = parseInt(localStorage.getItem("hiscore"));
    console.log(hiscoreval);
    highscorebox.innerHTML = "Highscore :" + hiscoreval;
}



window.requestAnimationFrame(main);


window.addEventListener('keydown',(e)=>{
    inputdirection={x:0,y:1}
    movemusic.play();


    switch(e.key){
        case "ArrowUp":
        inputdirection.x=0;
        inputdirection.y=-1;
        break;

        case "ArrowDown":
        inputdirection.x=0;
        inputdirection.y=1;
        break;
        
        case "ArrowRight":
        inputdirection.x=1;
        inputdirection.y=0;
        break;
        
        case "ArrowLeft":
        inputdirection.x=-1;
        inputdirection.y=0;
        break;

        default:
            break;
    }
})
