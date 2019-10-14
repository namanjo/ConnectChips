request = 'empty';

while (request !== 'quit') {
  var player1 = prompt("Player 1: Enter your name, you will be Blue");
  var player2 = prompt('Player 2: Enter Your name, you will be red');

  if (player1 === null || player2 === null) {
    continue
  }
  else {
    request = 'quit';
  }
}

var player1color = 'rgb(5, 130, 255)';
var player2color = 'rgb(215, 23, 23)';

var game_on = true;
var table = $('table tr');

function changeColor(rowIndex, colIndex, color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex, colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
  var colorReport = returnColor(5, colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row, colIndex);
    if (colorReport === 'rgb(241, 241, 241)') {
      return row;
    }
  }
}

function colorMatchCheck(one, two, three, four){
  return (one === two && one === three && one===four && one!== 'rgb(241, 241, 241)' && one!==undefined);
}

function horizontalWinCheck(){
  for(var row = 0; row < 6; row++){
    for(var col = 0; col < 4; col++){
      if(colorMatchCheck(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))){
        return true;
      }else {
        continue;
      }
    }
  }
}

function verticalWinCheck(){
  for(var col = 0; col < 7; col++){
    for(var row = 0; row < 3; row++){
      if(colorMatchCheck(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))){
        return true;
      }else {
        continue;
      }
    }
  }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1color;
$('#ticker').text(player1 + " it is your turn, choose a column to drop chip.")

$('.board button').on('click', function(){

  var col = $(this).closest('td').index();
  var bottomEmptyChip = checkBottom(col);

  changeColor(bottomEmptyChip, col, currentColor);

  if(horizontalWinCheck() || verticalWinCheck()){
    $('h1').css({'font-size':'24px', 'font-family':'garmond'});
    $('h1').text(currentName + " has won the game, Refresh the page to play again..!");
    $('h2').fadeOut('9000');
  }

  currentPlayer = currentPlayer * -1;

  if (currentPlayer === 1) {
    currentName = player1;
    $('#ticker').text(currentName + " it is your turn.");
    currentColor = player1color;
  }else {
    currentName = player2;
    $('#ticker').text(currentName+ " it your turn.")
    currentColor = player2color;
  }
})
