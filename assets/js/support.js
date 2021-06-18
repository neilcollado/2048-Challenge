let documentWidth = window.screen.availWidth
let gridContainerWidth = 0.92 * documentWidth
let cellLength = 0.18 * documentWidth
let cellSpace = 0.04 * documentWidth

function getTopPos(row) {
  return cellSpace + row * (cellSpace + cellLength)
}

function getLeftPos(col) {
  return cellSpace + col * (cellSpace + cellLength)
}

function getBGcolor(number) {
  switch(number){
    case 2:return"#eee4da";break;
    case 4:return"#ede0c8";break;
    case 8:return"#f2b179";break;
    case 16:return"#f59563";break;
    case 32:return"#f67e5f";break;
    case 64:return"#f65e3b";break;
    case 128:return"#edcf72";break;
    case 256:return"#edcc61";break;
    case 512:return"#9c0";break;
    case 1024:return"#33b5e5";break;
    case 2048:return"#09c";break;
    case 4096:return"#a6c";break;
    case 8192:return"#93c";break;
  }
  return "black";
}

function getNumberColor(number) {
  if(number<=4)
  return "#776e65";
return "white";
}

function checkSpace(board) {
  for(let i = 0; i < width; i++) {
    for(let j =0; j < width; j++) {
      if(board[i][j] == 0)
        return true
    }
  }
  return false
}

function canMoveLeft(board) {
  for(let i = 0; i < width; i++) {
    for(let j = 1; j < width; j++) {
      if(board[i][j] != 0)
        if(board[i][j-1] == 0 || board[i][j-1] == board[i][j])
          return true
    }
  }
  return false
}

function canMoveRight(board) {
  for(let i = 0; i < width; i++) {
    for(let j = 2; j > -1; j--) {
      if(board[i][j] != 0)
        if(board[i][j+1] == 0 || board[i][j+1] == board[i][j])
          return true
    }
  }
  return false
}

function canMoveUp(board) {
  for(let i = 1; i < width; i++) {
    for(let j = 0; j < width; j++) {
      if(board[i][j] != 0)
        if(board[i-1][j] == 0 || board[i-1][j] == board[i][j])
          return true
    }
  }
  return false
}

function canMoveDown(board) {
  for(let i = 2; i > -1; i--) {
    for(let j = 0; j < width; j++) {
      if(board[i][j] != 0)
        if(board[i+1][j] == 0 || board[i+1][j] == board[i][j])
          return true
    }
  }
  return false
}

function noBlockHorizontal(row, col1, col2, board) {
  for(let i = col1 + 1; i < col2; i++) {
    if(board[row][i] != 0)
      return false
  }
  return true
}

function noBlockVertical(col, row1, row2, board) {
  for(let i = row1 + 1; i < row2; i++) {
    if(board[i][col] != 0)
      return false
  }
  return true
}

function nomove(board){
  return (canMoveDown(board)||canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)) ? true : false
}

function isGameOver() {
  nospace(board) && nomove(board) ? false : gameover()
}

function gameover() {

}

function moveLeft() {
  if(canMoveLeft(board)) {
    for(let i = 0; i < width; i++) {
      for(let j = 1; j < width; j++) {
        if(board[i][j] != 0) {
          for(let k = 0; k < j; k++) {
            if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
              showMoveAnimation(i, j, i, k)
              board[i][k] = board[i][j]
              board[i][j] = 0
              break
            } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasCollision[i][k]) {
              showMoveAnimation(i, j, i, k)
              board[i][k] += board[i][j]
              board[i][j] = 0
              hasCollision[i][k] = true
              score = score + board[i][k]
              updateScore(score)
              break
            }
          }
        }
      }
    }
    setTimeout("updateBoardView()", 200)
    return true
  } else {
    return false
  }
}

function moveRight() {
  if(canMoveRight(board)) {
    for(let i = 0; i < width; i++) {
      for(let j = 2; j > -1; j--) {
        if(board[i][j] != 0) {
          for(let k = 3; k > j; k--) {
            if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
              showMoveAnimation(i, j, i, k)
              board[i][k] = board[i][j]
              board[i][j] = 0
              break
            } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasCollision[i][k]) {
              showMoveAnimation(i, j, i, k)
              board[i][k] += board[i][j]
              board[i][j] = 0
              hasCollision[i][k] = true
              score = score + board[i][k]
              updateScore(score)
              break
            }
          }
        }
      }
    }
    setTimeout("updateBoardView()", 200)
    return true
  } else {
    return false
  }
}

function moveUp() {
  if(canMoveUp(board)) {
    for(let i = 1; i < width; i++) {
      for(let j = 0; j < width; j++) {
        if(board[i][j] != 0) {
          for(let k = 0; k < i; k++) {
            if(board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
              showMoveAnimation(i, j, k, j)
              board[k][j] = board[i][j]
              board[i][j] = 0
              break
            } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasCollision[k][j] ) {
              showMoveAnimation(i, j, k, j)
              board[k][j] += board[i][j]
              board[i][j] = 0
              hasCollision[k][j] = true
              score= score + board[k][j]
              updateScore(score)
              break
            }
          }
        }
      }
    }
    setTimeout("updateBoardView()", 200)
    return true
  } else {
    return false
  }
}

function moveDown() {
  if(canMoveDown(board)) {
    for(let i = 2; i > -1; i--) {
      for(let j = 0; j < width; j++) {
        if(board[i][j] != 0) {
          for(let k = 3; k > i; k--) {
            if(board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
              showMoveAnimation(i, j, k, j)
              board[k][j] = board[i][j]
              board[i][j] = 0
              break
            } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasCollision[k][j] ) {
              showMoveAnimation(i, j, k, j)
              board[k][j] += board[i][j]
              board[i][j] = 0
              hasCollision[k][j] = true
              score= score + board[k][j]
              updateScore(score)
              break
            }
          }
        }
      }
    }
    setTimeout("updateBoardView()", 200)
    return true
  } else {
    return false
  }
}

document.addEventListener('touchend',function(event){

  event.preventDefault();
  var touch = event.touches[0];
  alert(touch.pageX + " - " + touch.pageY);
  endx=event.changedTouches[0].pageX;
  endy=event.changedTouches[0].pageY;

  var deltax=endx-startx;
  var deltay=endy-starty;

  if(Math.abs(deltax)<0.3*documentWidth&&Math.abs(deltay)<0.3*documentWidth){
      return ;
  }
  if(Math.abs(deltax)>Math.abs(deltay)){
      if(deltax>0){
          if(moveRight()){
              setTimeout("createRandomNumber()",210);
              setTimeout("isGameOver()",300);
          }

      }else{
          if(moveLeft()){
              setTimeout("createRandomNumber()",210);
              setTimeout("isGameOver()",300);
          }

      }
  }else{
      if(deltay>0){
          if(moveDown()){
              setTimeout("createRandomNumber()",210);
              setTimeout("isGameOver()",300);
          }

      }else{

          if(moveUp()){
              setTimeout("createRandomNumber()",210);
              setTimeout("isGameOver()",300);
          }

      }

  }
});