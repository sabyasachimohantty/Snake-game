const canvas = document.querySelector("canvas")
const WIDTH = 500
const HEIGHT = 500
canvas.height = HEIGHT
canvas.width = WIDTH
const ctx = canvas.getContext("2d")

ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)

class Snake {
    constructor() {
        this.x = 100
        this.y = 100
        this.dx = 0
        this.dy = 0
        this.width = 10
        this.body = []
    }

    render() {
        ctx.fillStyle = "lightgreen"
        ctx.fillRect(this.x, this.y, this.width, 10)
        ctx.fillRect(this.x - 10, this.y, this.width, 10)
    }
}

class Food {
    constructor() {
        this.height = 10
        this.width = 10
    }

    render() {
        ctx.fillStyle = 'red'
        ctx.fillRect(Math.floor(Math.random() * 50) * 10, Math.floor(Math.random() * 50) * 10, this.width, this.height)
    }
}

const food = new Food()
const snake = new Snake()

function gameloop() {
    snake.render()
    requestAnimationFrame(gameloop)
}

requestAnimationFrame(gameloop)