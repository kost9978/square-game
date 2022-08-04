var $start        = document.querySelector('#start')
var $game         = document.querySelector('#game')
var $time         = document.querySelector('#time')
var $result       = document.querySelector('#result')
var $gameTime     = document.querySelector('#game-time')
var $timeHeader   = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var colors        = colorsArray()
var score         = 0
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', hendleBoxClick)
$gameTime.addEventListener('input',setGameTime)

function startGame() {
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled','true')
  isGameStarted = true
  $game.style.backgroundColor = '#fff'
  hide($start)
  var interval = setInterval(function () {
    var time = parseFloat($time.textContent)
    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100);

  renderBox()
}
function endGame() {
  isGameStarted = false
  setGameScore()
  show($start)
  $game.style.backgroundColor = '#ccc'
  $game.innerHTML = ''
  show($resultHeader)
  hide($timeHeader)
  $gameTime.removeAttribute('disabled')
}

function hendleBoxClick(event) {
  if (!isGameStarted) {
    return
  }
  if (event.target.dataset.box) {
    score++
    renderBox()
  }
}

function renderBox() {
  $game.innerHTML = ''
  var box = document.createElement('div')
  var boxSize = getRandom(30, 100)

  var gameSize = $game.getBoundingClientRect()
  var maxTop = gameSize.height - boxSize
  var maxLeft = gameSize.width - boxSize
  var randomColor = colors[getRandom(0,colors.length)]
  box.style.position = 'absolute'
  box.style.backgroundColor = randomColor
  box.style.height = box.style.width = boxSize + 'px'
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', box)

}

function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  var time  =+ $gameTime.value
  $time.textContent = time.toFixed(1)
  hide($resultHeader)
  show($timeHeader)
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function show ($el){
$el.classList.remove('hide')
}
function hide ($el){
  $el.classList.add('hide')
  }
  function colorsArray(){
    return ['#90EE90','#008B8B','#A9A9A9','#00008B','#1C1C1C','	#9B30FF','#8B1A1A','#008B45']
  }