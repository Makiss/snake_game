$(document).ready(function() {
  var snakeCanvas = $(".snake-game")[0],
      context = snakeCanvas.getContext("2d"),
      width = snakeCanvas.width,
      height = snakeCanvas.height,
      snakeSize = 10,
      direction = "right",
      foodX,
      foodY,
      gameLoop,
      snake = [
        { "x": 0, "y": 0 },
        { "x": 10, "y": 0 },
        { "x": 20, "y": 0 },
        { "x": 30, "y": 0 },
        { "x": 40, "y": 0 }
      ],
      gameSpeed = 50,
      score = 0;

  startGame();

  function startGame() {
    createNewFood();
    gameLoop = setInterval(reDraw, gameSpeed);
  }

  function stopGame() {
    clearInterval(gameLoop);
  }

  function reDraw() {
    drawBg();
    drawSnake(snake);
    drawFood();
    drawScore();

    var collisionStatus = checkCollision(snake, foodX, foodY);

    if(collisionStatus == "food") {
      score++;
      createNewFood();
      snake.unshift(updateDirection(snake, direction));
    } else if(collisionStatus == "wall") {
      stopGame();
      score = 0;
    } else {

    }
  }

  function drawBg() {
    paint(0, 0, width, height, "white", "black");
  }

  function drawFood() {
    paint(foodX * snakeSize, foodY * snakeSize, snakeSize, snakeSize, "green", "black");
  }

  function drawScore() {
    context.fillStyle = "grey";
    context.fillText("Your Score: " + score, 5, height-5);
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

  function createNewFood() {
    foodX = parseInt(Math.random() * width/snakeSize),
    foodY = parseInt(Math.random() * height/snakeSize);
  }

  function checkCollision(snakeArray, foodXInput, foodYInput) {
    var collision = "nothing";
    snakeArray.every(function(element) {
      if(element.x == foodXInput * snakeSize && element.y == foodYInput * snakeSize) {
        collision = "food";
        return false;
      } else if(element.x == -10 ||
                element.y == -10 ||
                element.x == width ||
                element.y == height) {
        collision = "wall";
        return false;
      } else {
        return true;
      }
    });
    return collision;
  }
});
