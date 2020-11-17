const btnStart = document.getElementById("btn-start");
const blue = document.getElementById("blue");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");
const lastLevel = 2;


class Juego {
    constructor() {
        this.inicializar();
        this.generateSecuence();
        setTimeout(()=>{ this.nextLevel();}, 750);
       
    }
    inicializar() {
        this.nextLevel = this.nextLevel.bind(this);
        this.chooseColor = this.chooseColor.bind(this);
        btnStart.classList.add('hide');
        this.level = 1;
        this.colors = {
            blue,
            red,
            yellow,
            green
        };
        console.log(this.colors)
    }
    toggleBtnStart(){
        
    }
    generateSecuence() {
        this.secuence = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4));
        console.log(this.secuence);

    }
    nextLevel() {
        this.sublevel = 0;
        this.brightSecuence();
        this.addEventsClick();
    }

    tansformNumberToColor(num) {
        switch (num) {
            case 0:
                return "blue"
            case 1:
                return "red"
            case 2:
                return "yellow"
            case 3:
                return "green"
        }
    }

    tansformColorToNumber(color) {
        switch (color) {
            case "blue":
                return 0;
            case "red":
                return 1;
            case "yellow":
                return 2;
            case "green":
                return 3;
        }
    }

    brightSecuence() {
        for (let index = 0; index < this.level; index++) {
            console.log(index);
            const color = this.tansformNumberToColor(this.secuence[index]);
            setTimeout(() => {

                console.log(color);
                this.brightColor(color);
            },1000*index)
        }
    }


    brightColor(color) {
        this.colors[color].classList.add("light");
        setTimeout(() => {
            this.removeLightColor(color)
        }, 350)
    }
    removeLightColor(color) {
        this.colors[color].classList.remove("light");
    }
    addEventsClick(){
        this.colors.blue.addEventListener('click', this.chooseColor);
        this.colors.red.addEventListener('click', this.chooseColor);
        this.colors.yellow.addEventListener('click', this.chooseColor);
        this.colors.green.addEventListener('click', this.chooseColor);
    }

    removeEventsClick(){
        this.colors.blue.removeEventListener('click', this.chooseColor);
        this.colors.red.removeEventListener('click', this.chooseColor);
        this.colors.yellow.removeEventListener('click', this.chooseColor);
        this.colors.green.removeEventListener('click', this.chooseColor);
    }
    chooseColor(ev){
        console.log(ev)
        console.log(ev.target.dataset.color);
        const colorName = ev.target.dataset.color;
        const colorNumber = this.tansformColorToNumber(colorName);
        this.brightColor(colorName);
        console.log(`The color number is ${colorNumber}`)
        console.log(`The secuence number is ${this.secuence[this.sublevel] }`)
        if(colorNumber == this.secuence[this.sublevel]){
            console.log("Paso")
            this.sublevel++;
            if(this.sublevel === this.level){
                this.level++;
                this.removeEventsClick();
                if(this.level === (lastLevel+1)){
                    //Win the game
                    this.winTheGame();
                }
                else{
                    setTimeout(this.nextLevel, 1500);
                }

            }
        }
        else{
            //Lose
            this.loseTheGame();
            
        }
    }

    winTheGame(){
        swal("Ganaste!", "Has completado todos los niveles!", "success")
        .then(() => this.inicializar());
    }
    loseTheGame(){

        swal("Oh no!", "Has perdido, inténtalo de nuevo!", "error")
        .then(() => {
            this.removeEventsClick();
            this.inicializar();
        });
    }
}


function startGame() {
    var juego = new Juego();
}