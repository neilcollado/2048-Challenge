let board = new Array()
let hasCollision = new Array()
let width = 4

$(document).ready(function() {
  setMobile()
  newGame()
})
// 230
function setMobile() {
  if(documentWidth > 500) {
    gridContainerWidth = 415
    cellSpace = 15
    cellLength = 85
  }

  //set the grid width and height
  $('.grid-container').css('width', gridContainerWidth- 2 * cellSpace)
  $('.grid-container').css('height', gridContainerWidth- 2 * cellSpace)
  $('.grid-container').css('padding', cellSpace)
  $('.grid-container').css('border-radius', 0.02 * gridContainerWidth)
  $('.header').css('width', gridContainerWidth- 2 * cellSpace)
  $('.header').css('padding', cellSpace)

  $('.grid-cell').css('width', cellLength)
  $('.grid-cell').css('height', cellLength)
  $('.grid-cell').css('border-radius', 0.02 * cellLength)
}

function newGame() {
  init()
  createRandomNumber()
  createRandomNumber()
}

$('#new-game').click(function() {
  newGame()
})

function init() {

  //initialize blank grids
  for(let i = 0; i < width; i++) {
    for(let j = 0; j < width; j++) {
      let gridCell = $('#grid-cell-'+ i + '-' + j)
      gridCell.css('top', getTopPos(i))
      gridCell.css('left', getLeftPos(j))
    }
  }

  //initialize board and collision table
  for(let i = 0; i < width; i++) {
    board[i] = new Array()
    hasCollision[i] = new Array()
    for(let j = 0; j < width; j++) {
      board[i][j] = 0
      hasCollision[i][j] = false
    }
  }

  updateBoardView()

  //reset score to zero
  score = 0
}

function updateBoardView() {
  $('.number-cell').remove()

  for(let i = 0; i < width; i++) {
    for(let j = 0; j < width; j++) {
      $('.grid-container').append('<div class="number-cell" id="number-cell-'+ i +'-'+ j +'"></div>')
      let numberCell = $('#number-cell-' + i + '-' + j)

      //set empty grid style if value is zero
      if(board[i][j] == 0) {
        numberCell.css('width', '0')
        numberCell.css('height', '0')
        numberCell.css('top', getTopPos(i) + cellLength * 0.5)
        numberCell.css('left', getLeftPos(j) + cellLength * 0.5)
        numberCell.text('')
      } else {
        numberCell.css('width', cellLength)
        numberCell.css('height', cellLength)
        numberCell.css('top', getTopPos(i))
        numberCell.css('left', getLeftPos(j))
        numberCell.css('background-color', getBGcolor(board[i][j]))
        numberCell.css('color', getNumberColor(board[i][j]))
        numberCell.text(board[i][j])
      }
      hasCollision[i][j] = false
    }
  }
  $('.number-cell').css('line-height', cellLength+'px')
  $('.number-cell').css('font-size', 0.6 * cellLength+'px')
}

function createRandomNumber() {
  if(checkSpace(board)) {
    let randx=parseInt(Math.floor(Math.random()*4))
    let randy=parseInt(Math.floor(Math.random()*4))

    while(board[randx][randy] != 0) {
      randx=parseInt(Math.floor(Math.random()*4))
      randy=parseInt(Math.floor(Math.random()*4))
    }
    let randNumber=Math.random()<0.80? 2 : 4;
    board[randx][randy] = randNumber
    showNumber(randx, randy, randNumber)
    return true
  } else {
    return false;
  }
}

$(document).keydown(function(event) {
  switch (event.keyCode) {
    case 38:
      if(moveUp()) {
        setTimeout("createRandomNumber()", 210)
        setTimeout("isGameOver", 300) 
      }
      break
    case 40:
      if(moveDown()) {
        setTimeout("createRandomNumber()", 210)
        setTimeout("isGameOver", 300)
      }
      break
    case 37:
      if(moveLeft()) {
        setTimeout("createRandomNumber()", 210)
        setTimeout("isGameOver", 300)
      }
      break
    case 39:
      if(moveRight()) {
        setTimeout("createRandomNumber()", 210)
        setTimeout("isGameOver", 300)
      }
    default:
      break
  }
})
