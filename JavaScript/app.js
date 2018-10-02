window.addEventListener("keydown", function(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) !== -1) {
        e.preventDefault();
    }
}, false);
let game = true;
let score = 0;
let gameSpeed = 1.5;
const bird = {
    x: 1,
    y: 5,
}
$('#start-game').on('click', (e)=>{
    (e.currentTarget).remove();
    $('body').append("<div class='bottom'></div>")
    makeBoard();
    makeBird();
    $('body').keydown((e)=>{
        if(e.keyCode === 38){
            moveUp();
    }});
    $('body').keydown((e)=>{
        if(e.keyCode === 40){
            moveDown();
    }});
    setInterval(()=>{
        if(game){
            createBar();
        }
    },3000/gameSpeed)
    setTimeout(()=>{setInterval(()=>{
        if(game){
            createCoin();
        }
    },3000/gameSpeed)},1500/gameSpeed) 
    setInterval(()=>{
        scoreIncrease();
        $('.score').text(`score: ${score}`);
    }, 600/gameSpeed)
    setInterval(()=>{
        setTimeout (levelUp, );
    },30000)
       
}) 
const levelUp = () => {
    gameSpeed+= .2;
}
const gameOver = () => {
    if($('#bird').hasClass('dodge-bar')){
        game = false;
        $('.game').empty();
        $('.game').append(`<h1>Game Over!</h1>`)
        $('.game').append(`<h2>your score: ${score}</h2>`)
        $('.game').append(`<button class='retry'>retry?</button>`)
        $('.retry').on('click', ()=>{
            window.location.reload();
        })
    } 
}
const makeBird = () => {
    $('.square-1-5').attr('id', 'bird');
}
const makeBoard = () => {
    for(let x = 1; x < 26; x++){
        $('.game').append(`<div class='game-column game-column-${x}'></div>`)
        for(let y = 10; y > 0; y--){
            const gameSquare = $('<div/>')
            gameSquare.addClass('square')
            gameSquare.addClass(`square-${x}-${y}`)
            $(`.game-column-${x}`).append(gameSquare)
        }
    }
}
const createBar = () =>{
    const bar = new DodgeBar(26, Math.ceil(Math.random()*10))
    for (let i = 0; i < 10; i++){
        if((i+1)!== bar.hole){ 
            $(`.square-${bar.x}-${i+1}`).removeClass('blank');
            $(`.square-${bar.x}-${i+1}`).addClass('dodge-bar');
        } else {
            $(`.square-${bar.x}-${i+1}`).addClass('hole');
        }
    }
    setInterval(()=>{
        if(bar.x > 0){
            bar.move();
            gameOver();
    }}, 600/gameSpeed)    
}
const createCoin = () =>{
    const coin = new Coin(Math.ceil(Math.random()*10))
    $(`.square-${coin.x}-${coin.y}`).removeClass('blank');
    $(`.square-${coin.x}-${coin.y}`).addClass('coin');
    setInterval(()=>{
        if(coin.x > 0){
            coin.move();
    }}, 600/gameSpeed)
}
const scoreIncrease = () => {
    if($('#bird').hasClass('hole')){
        score++;
    } 
    if($('#bird').hasClass('coin')){
        score+= 5;
    } 
        
}
const moveUp = () => {
    if(bird.y < 10){
        const currentSquare = $('#bird');
        currentSquare.removeAttr('id');
        bird.y++;
        $(`.square-1-${bird.y}`).removeClass('hole');
        $(`.square-1-${bird.y}`).attr('id', 'bird');
    }
}
const moveDown = () => {
    if(bird.y > 1){
        const currentSquare = $('#bird');
        currentSquare.removeAttr('id');
        bird.y--;
        $(`.square-1-${bird.y}`).removeClass('hole');
        $(`.square-1-${bird.y}`).attr('id', 'bird');
    }
}
class DodgeBar  { 
    constructor( x, hole){
    this.x = x;
    this.hole = hole;
    } 
    move(){
        this.x--;
        for (let i = 0; i < 10; i++){
            if((i+1)!== this.hole){
                $(`.square-${this.x + 1}-${i+1}`).removeClass('dodge-bar');
                $(`.square-${this.x + 1}-${i+1}`).addClass('blank');
                $(`.square-${this.x}-${i+1}`).addClass('dodge-bar');
            } if((i+1)=== this.hole){
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
    }
    move(){
        this.x--;
        $(`.square-${this.x + 1}-${this.y}`).removeClass('coin');
        $(`.square-${this.x + 1}-${this.y}`).addClass('blank');
        $(`.square-${this.x}-${this.y}`).addClass('coin');    
    } 
}















