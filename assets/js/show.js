function showNumber(i,j,randNumber){
  var numberCell=$("#number-cell-"+ i +"-" + j);
  numberCell.css('background-color',getBGcolor(randNumber));
  numberCell.css('color',getNumberColor(randNumber));
  numberCell.text(randNumber);

  numberCell.animate({
      width:cellLength,
      height:cellLength,
      top:getTopPos(i),
      left:getLeftPos(j)
  },100);
}

function showMoveAnimation(fromX, fromY, toX, toY) {
  let numberCell = $('#number-cell-'+ fromX + '-' + fromY)
  numberCell.animate({
    top: getTopPos(toX),
    left: getLeftPos(toY)
  }, 200)
}

function updateScore(score) {
  $('#score').html(score)
}