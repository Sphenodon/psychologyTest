const dino = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const game = document.getElementsByClassName("game")[0]
const gameWidth = parseInt(window.getComputedStyle(game).getPropertyValue("width"))

let userDevice = 'ПК/ноутбук, '
let tryCount = 0
let score = 0
let results = ''
const secondRun = 7
const countRun = 12
let refreshRate = 5
let speedCactus = 5
let difficult = 3
let deathBackgroundPosition = 992
let deathBorderLeft = 10
let deathBorderRight = 50
let deathBorderTop = 135
let deathLogoTop = 0.05

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    userDevice = 'телефон, '
    refreshRate = 10
    speedCactus = 2
    difficult = 10
    deathBackgroundPosition = 496
    deathBorderLeft = 7
    deathBorderRight = 27
    deathBorderTop = 155
    deathLogoTop = 0.25
}

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
}

function jump(){
    if (dino.classList !== "run jump"){

        dino.classList.add("jump")

        setTimeout(function (){
            dino.classList.remove("jump")
        },510)
    }
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
            setTimeout(createCactus, 1000 + score*10)

        } else if(cactusPosition > deathBorderLeft && cactusPosition < deathBorderRight && dinoTop >= deathBorderTop){

            $('.tryCount').html('' + tryCount +'')
            $('.game').append(`<h5 class="mx-auto" style="top: ${dinoTop*deathLogoTop}px; width: 95px; position: relative; color: #cd0000;">YOU DIED</h5>`)
            $('.run').css({'animation': 'stop', 'background-position':` -${deathBackgroundPosition}px 1px`})
            $('#newRun').removeClass('invisible');
            results = results + tryCount + ", " + score + ", "
            $('#inputResults').val(results)

            if(tryCount === countRun){
                $('.dinoGame').remove()
                $('.results').removeClass('invisible')
                $('#inputComment').val(userDevice)
                $('#medianChart').removeClass('invisible')
                createUserChart();
                createMedianChart();
            }

            clearInterval(leftTimer);

        } else {

            cactusPosition -= speedCactus + score/difficult;
            cactus.style.left = cactusPosition + 'px';

        }
    }, 10);
}

function newRun(){

    score = 0
    $('.score').html('' + score +'')
    $('.run').css({'animation': '', 'background-position':''})
    $('.game h5').remove()
    $('#newRun').addClass('invisible');
    $('.tryCount').html('' + tryCount +'')

    tryCount++

    if (tryCount > secondRun){
        $('#scull').addClass('scull')
    }

    createCactus()
}

