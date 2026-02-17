const bells = new Audio("./Pompdoro_Alarm_Sound.mp3")
const strtbtn = document.querySelector(".b-start")
const stopbtn = document.querySelector(".b-stop")
const minutes = document.querySelector(".minute")
const seconds = document.querySelector(".seconds")
const easy = document.querySelector(".button1.light")
const moderate = document.querySelector(".button1.moderate")
const intensive = document.querySelector(".button1.intense")

let totalseconds = 0 
let running = false
let split = [25,5]
let myInterval = null 
let phase = 0

function splitchange(x,y){
    if (running === true) {
        return
    } else {
        split = [x,y]
        minutes.textContent = x 
    }
}

function nextPhase(){
    bells.play();
    clearInterval(myInterval)
    phase++;

    if (phase >= split.length) {
        running = false;
        clearInterval(myInterval);
    } else { 
        
        running = false;
        start();
    }
}

function updatetimer(){
    if (totalseconds <= 0){
        nextPhase();
        return;
    } 

    totalseconds --;

    const minuteleft = Math.floor(totalseconds/60);
    const secondsleft = totalseconds%60;

    minutes.textContent = minuteleft 

    if (secondsleft < 10) {
        seconds.textContent = "0" + secondsleft
    } else {
        seconds.textContent = secondsleft
    }
}

function start(){
    if (running) return;
    running = true; 
    totalseconds = split[phase] * 60 
    myInterval = setInterval(updatetimer, 1000)
}

easy.addEventListener("click", () =>splitchange(25,5))
moderate.addEventListener("click", () =>splitchange(45,15))
intensive.addEventListener("click", () => splitchange(52,8))
strtbtn.addEventListener("click", start)

