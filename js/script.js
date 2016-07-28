$(document).ready(function() {
  var snakeCanvas = $(".snake-game")[0],
      context = snakeCanvas.getContext("2d"),
      width = snakeCanvas.width,
      height = snakeCanvas.height,
      snakeSize = 10,
      direction = "right",
      snake = [
        { "x": 0, "y": 0 },
        { "x": 10, "y": 0 },
        { "x": 20, "y": 0 },
        { "x": 30, "y": 0 },
        { "x": 40, "y": 0 }
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
    snakeArray.push(updateDirection(snakeArray, direction));
  }

  function updateDirection(snakeArray, direction) {
    var cellX = snakeArray[snake.length-1].x,
        cellY = snakeArray[snake.length-1].y;

    if(direction === "right") {
      cellX = cellX + 10;
    } else if(direction === "left") {
      cellX = cellX - 10;
    } else if(direction === "up") {
      cellY = cellY - 10;
    } else if(direction === "down") {
      cellY = cellY + 10;
    }
    return { "x": cellX, "y": cellY };
  }

  $(document).on("keydown", function(e) {
    if(e.which == "37" && direction !== "right") {
      direction = "left";
    } else if(e.which == "38" && direction !== "down") {
      direction = "up";
    } if(e.which == "39" && direction !== "left") {
      direction = "right";
    } if(e.which == "40" && direction !== "up") {
      direction = "down";
    }
  });
});
