window.addEventListener("keydown", function(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) !== -1) {
        e.preventDefault();
    }
}, false);
let game = true;
let score = 0;
let points = 0;
let gameSpeed = 4.5;
const bird = {
    x: 5,
    y: 5,
    missles: 100,
}
$('#start-game').on('click', (e)=>{
    (e.currentTarget).remove();
    $('body').append("<div class='bottom'></div>")
    makeBoard();
    makeBird();
    $('body').keydown((e)=>{
        if(e.keyCode === 38){
            $('.woosh')[0].play();
            moveUp();
    }});
    $('body').keydown((e)=>{
        if(e.keyCode === 40){
            $('.woosh')[0].play();
            moveDown();
    }});
    $('body').keydown((e)=>{
        if(e.keyCode === 32){
            $('.pew')[0].play();
            fireMissle();
    }});
    setInterval(()=>{
        if(game){
            createBar();
        }
    },5000/gameSpeed)
    setTimeout(()=>{setInterval(()=>{
        if(game){
            createCoin();
        }
    },5000/gameSpeed)},2000/gameSpeed) 
    setInterval(()=>{

        points = Math.ceil(score)
        $('.score').text(`score: ${points}`);
    }, 10/gameSpeed)
}) 
const hardMode = () => {
    gameSpeed+= .5;
}
const gameOver = () => {
    if($('#bird').hasClass('box')){
        game = false;
        $('.board').empty();
        $('.board').append(`<h1 class="game-over">Game Over!</h1>`)
        $('.board').append(`<button class='button retry'>retry?</button>`)
        $('.retry').on('click', ()=>{
            window.location.reload();
        })
    } 
}
const makeBird = () => {
    $(`.square-${bird.x}-${bird.y}`).attr('id', 'bird');
}
const makeBoard = () => {
    for(let x = 1; x < 26; x++){
        $('.board').append(`<div class='game-column game-column-${x}'></div>`)
        for(let y = 10; y > 0; y--){
            const gameSquare = $('<div/>')
            gameSquare.addClass('square')
            gameSquare.addClass(`square-${x}-${y}`)
            $(`.game-column-${x}`).append(gameSquare)
        }
    }
}
const createBar = () => {
    const bar = new Bar(25, Math.ceil(Math.random()*10))
    for (let i = 0; i < 10; i++){
        if((i+1)!== bar.hole){ 
            $(`.square-${bar.x}-${i+1}`).removeClass('blank');
            $(`.square-${bar.x}-${i+1}`).addClass('box');
        } else {
            $(`.square-${bar.x}-${i+1}`).addClass('hole');
        }
    }
    setInterval(()=>{
        for (let i = 0; i < 10; i++){
            if($(`.square-${bar.x}-${i+1}`).hasClass('missle')){
                $('.punch')[0].play();
                $(`.square-${bar.x}-${i+1}`).removeClass('box');
                $(`.square-${bar.x}-${i+1}`).addClass('hole');
            }
        }
    }, 1);
    setInterval(()=>{
        if(bar.x > 0){
            bar.move();
            gameOver();
    }}, 500/gameSpeed);
}
const createCoin = () => {
    const coin = new Coin(Math.ceil(Math.random()*10))
    $(`.square-${coin.x}-${coin.y}`).removeClass('blank');
    $(`.square-${coin.x}-${coin.y}`).addClass('coin');
    setInterval(()=>{
        if(coin.x > 0){
            coin.move();
        }
    }, 500/gameSpeed)
    setInterval(()=>{
        coin.score();
    }, 5)
}
const fireMissle = () => {
    if (bird.missles > 0){
        const missle = new Missle(bird.x, bird.y);
        $(`.square-${missle.x}-${missle.y}`).addClass('missle');
        setInterval(()=>{
            missle.move();
            missle.destroy();
        }, 50);
        bird.missles--;
    }
}
const moveUp = () => {
    if(bird.y < 10){
        const currentSquare = $('#bird');
        currentSquare.removeAttr('id');
        bird.y++;
        $(`.square-${bird.x}-${bird.y}`).removeClass('hole');
        $(`.square-${bird.x}-${bird.y}`).attr('id', 'bird');
    }
}
const moveDown = () => {
    if(bird.y > 1){
        const currentSquare = $('#bird');
        currentSquare.removeAttr('id');
        bird.y--;
        $(`.square-${bird.x}-${bird.y}`).removeClass('hole');
        $(`.square-${bird.x}-${bird.y}`).attr('id', 'bird');
    }
}
class Bar  { 
    constructor( x, hole){
    this.x = x;
    this.hole = hole;
    } 
    move(){  
        this.x--;
        for (let i = 0; i < 10; i++){
            if($(`.square-${this.x + 1}-${i+1}`).hasClass('box')){
                $(`.square-${this.x + 1}-${i+1}`).removeClass('box');
                $(`.square-${this.x + 1}-${i+1}`).addClass('blank');
                $(`.square-${this.x}-${i+1}`).addClass('box');
            } if($(`.square-${this.x + 1}-${i+1}`).hasClass('hole')){
                $(`.square-${this.x + 1}-${i+1}`).removeClass('hole');
                $(`.square-${this.x + 1}-${i+1}`).addClass('blank');
                $(`.square-${this.x}-${i+1}`).addClass('hole');
            }
        }   
    }
}
class Coin {
    constructor(y){
        this.y = y;
        this.x = 26;
        this.active = true;
    }
    move(){
        $(`.square-${this.x}-${this.y}`).removeClass('coin');
        if(this.active){
            this.x--;
            $(`.square-${this.x + 1}-${this.y}`).addClass('blank');
            $(`.square-${this.x}-${this.y}`).addClass('coin');
        }       
    }
    score(){
        if(this.active){
            if($(`.square-${this.x}-${this.y}`)[0].hasAttribute('id', 'bird')){ 
                score++;
                $(`.square-${this.x}-${this.y}`).removeClass('coin');
                this.active = false;  
            }
        }   
    }      
} 
class Missle {
    constructor(x, y){
        this.x = x;
        this.y = y; 
        this.active = true;
    }
    move(){
        this.x++;
        if(this.active){
            $(`.square-${this.x - 1}-${this.y}`).removeClass('missle');
            $(`.square-${this.x - 1}-${this.y}`).addClass('blank');
            $(`.square-${this.x}-${this.y}`).addClass('missle');
        } else {
            $(`.square-${this.x - 1}-${this.y}`).removeClass('missle');
        } 
    }
    destroy(){
        if($(`.square-${this.x}-${this.y}`).hasClass('box')){
            this.active = false;
        }
    } 
}








$('body').keydown((e)=>{
    if(e.keyCode === 83){
        score+= 234;
    }
})



















