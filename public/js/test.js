const dino = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const game = document.getElementsByClassName("game")[0]
const gameWidth = parseInt(window.getComputedStyle(game).getPropertyValue("width"))

let tryCount = 0
let score = 0
let results = ''

document.addEventListener("keydown", function (event){
    jump()
})
document.addEventListener("click", function (event){
    jump()
})

let start = document.getElementsByClassName("newRun")[0]
start.addEventListener("click", function (){
    newRun()
})

let new_game = document.getElementsByClassName("newGame")[0]
new_game.addEventListener("click", function (){
    newGame()
})

function newGame(){
    document.getElementsByClassName("rules")[0].remove();
    document.getElementById("SP").classList.remove('invisible');

    newRun();
}

function jump(){
    if (dino.classList !== "jump"){

        dino.classList.add("jump")
    }
    setTimeout(function (){
        dino.classList.remove("jump")
    },350)
}

function createCactus() {
    let cactusPosition = gameWidth-18;

    cactus.classList.add('cactus');
    game.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval(function (){
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
        let cactusPosition = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

        if (cactusPosition < 0) {

            game.removeChild(cactus);
            score++
            $('.score').html('' + score + '')

            clearInterval(leftTimer);
            setTimeout(createCactus, Math.random() * (1000 - score*10) + score*10)

        } else if(cactusPosition > 5 && cactusPosition < 55 && dinoTop >= 130){

            $('.tryCount').html('' + tryCount +'')
            $('.game').append('<h5 class="mx-auto" style="width: 95px; color: #cd0000;">YOU DIED</h5>')
            $('.run').css({'animation': 'stop', 'background-position':' -1042px 1px'})
            $('#newRun').removeClass('invisible');
            results = results + tryCount + ", " + score + ", "
            $('#inputResults').val(results)

            if(tryCount === 20){
                $('.dinoGame').remove()
                $('.results').removeClass('invisible')
            }

            clearInterval(leftTimer);

        } else {

            cactusPosition -= 10 + score/3;
            cactus.style.left = cactusPosition + 'px';

        }
    }, 20);
}

function newRun(){

    score = 0
    $('.score').html('' + score +'')
    $('.run').css({'animation': '', 'background-position':''})
    $('.game h5').remove()
    $('#newRun').addClass('invisible');
    $('.tryCount').html('' + tryCount +'')

    tryCount++

    if (tryCount > 10){
        $('#scull').addClass('scull')
    }

    createCactus()
}

