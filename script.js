const canvas = document.querySelector("canvas")
const WIDTH = 500
const HEIGHT = 500
canvas.height = HEIGHT
canvas.width = WIDTH
const ctx = canvas.getContext("2d")
let isFood = false
let gameOver = false
let intervalId
let score = 0

ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)

class Snake {
    constructor() {
        this.x = 100
        this.y = 100
        this.dx = 10
        this.dy = 0
        this.width = 10
        this.height = 10
        this.prevx = this.x - 10
        this.prevy = this.y
        this.body = [new Segment(this.prevx, this.prevy)]
    }

    render() {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        this.body.forEach((segment) => {
            let tmpX = this.prevx
            let tmpY = this.prevy
            ctx.fillRect(this.prevx, this.prevy, this.width, this.height)
            this.prevx = segment.x
            this.prevy = segment.y
            segment.x = tmpX
            segment.y = tmpY
        })
    }

    update() {
        this.prevx = this.x
        this.prevy = this.y
        this.x += this.dx
        this.y += this.dy
        this.render()
        this.consumeFood()
    }

    consumeFood() {
        if (this.x === food.x && this.y === food.y) {
            this.body.unshift(new Segment(this.x, this.y))
            isFood = false
            score ++
        }
    }

    checkBoundaryCollision() {
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            gameOver = true
        }
    }

    checkBodyCollision() {
        this.body.forEach((segment, i) => {

            if (i !== 0 && this.x === segment.x && this.y === segment.y) {
                gameOver = true
            }
        })
    }
}

class Segment {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Food {
    constructor() {
        this.height = 10
        this.width = 10
        this.x = 0
        this.y = 0
    }

    render() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    generate() {
        this.x = Math.floor(Math.random() * 50) * 10
        this.y = Math.floor(Math.random() * 50) * 10
    }
}

const food = new Food()
const snake = new Snake()

function displayGameOver() {
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.font = "bold 30px Arial"
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 30)
    ctx.fillText(`SCORE: ${score}`, canvas.width / 2, canvas.height / 2 + 10)
}

function gameloop() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (!isFood) {
        food.generate()
        isFood = true
    }
    food.render()
    snake.update()
    snake.checkBoundaryCollision()
    snake.checkBodyCollision()
    if (gameOver) {
        clearInterval(intervalId)
        displayGameOver()
    }
}

intervalId = setInterval(() => {
    gameloop()
}, 100);


// GAME CONTROLS
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'a':
            if (snake.dy) {
                snake.dx = -10;
                snake.dy = 0;
            }
            break;
        case 'd':
            if (snake.dy) {
                snake.dx = 10;
                snake.dy = 0;
            }
            break;
        case 'w':
            if (snake.dx) {
                snake.dy = -10;
                snake.dx = 0;
            }
            break;
        case 's':
            if (snake.dx) {
                snake.dy = 10;
                snake.dx = 0;
            }
            break;
        default:
            break;
    }
})