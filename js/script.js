$(document).ready(function() {
  var snakeCanvas = $(".snake-game")[0],
      context = snakeCanvas.getContext("2d"),
      width = snakeCanvas.width,
      height = snakeCanvas.height,
      snakeSize = 10,
      snake = [
        {
          "x": 0,
          "y": 0
        },
        {
          "x": 10,
          "y": 0
        },
        {
          "x": 20,
          "y": 0
        },
        {
          "x": 30,
          "y": 0
        },
        {
          "x": 40,
          "y": 0
        }
      ];

  var gameLoop = setInterval(reDraw, 50);

  function reDraw() {
    drawBg();
    drawSnake(snake);
  }


  function drawBg() {
    paint(0, 0, width, height, "white", "black");
  }

  function drawSnake(snakeArray) {
    updateSnake(snakeArray);
    snakeArray.forEach(function(element) {
      paint(element.x, element.y, snakeSize, snakeSize, "orange", "black");
    });
  }

  function paint(x, y, width, height, bgColor, borderColor) {
    context.fillStyle = bgColor;
    context.fillRect(x, y, width, height);
    context.strokeStyle = borderColor;
    context.strokeRect(x, y, width, height);
  }

  function updateSnake(snakeArray) {
    snakeArray.shift();
    snakeArray.push({"x": snakeArray[snake.length-1].x+10, "y": snakeArray[snake.length-1].y});
  }
});
