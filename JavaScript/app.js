window.addEventListener("keydown", function(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) !== -1) {
        e.preventDefault();
    }
}, false);

let score = 0;
const bird = {
    x: 1,
    y: 5,
}
$('#start-game').on('click', (e)=>{
    (e.currentTarget).remove();
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
    setInterval(createBar, 3000)
    
    $('.score').text(`score: ${score}`);
       
}) 
const gameOver = () => {
    if($('#bird').hasClass('dodge-bar')){
        game = false;
        $('.game').empty();
        $('game').append(``)
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
            $(`.square-${bar.x}-${i+1}`).removeClass('hole');
            $(`.square-${bar.x}-${i+1}`).addClass('dodge-bar');
        } else {
            $(`.square-${bar.x}-${i+1}`).addClass('hole');
        }
    }
    setInterval(()=>{
        if(bar.x > 0){
            bar.move();
        } else 
       
        gameOver();
    }, 600) 
}
const moveUp = () => {
    if(bird.y < 10){
        const currentSquare = $('#bird');
        currentSquare.removeAttr('id');
        bird.y++;
        $(`.square-1-${bird.y}`).attr('id', 'bird');
    }
}
const moveDown = () => {
    if(bird.y > 1){
        const currentSquare = $('#bird');
        currentSquare.removeAttr('id');
        bird.y--;
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
                $(`.square-${this.x + 1}-${i+1}`).removeClass('dodge-bar');;
                $(`.square-${this.x + 1}-${i+1}`).addClass('hole');;
                $(`.square-${this.x}-${i+1}`).removeClass('hole');;
                $(`.square-${this.x}-${i+1}`).addClass('dodge-bar');
            }  
        }   
    } 
}















