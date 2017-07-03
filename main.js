const $canvas = document.querySelector('#canvas')
const ctx = $canvas.getContext('2d')
const cw = $canvas.width
const ch = $canvas.height
let moving = false
let carRunning
const mario = new Image()
mario.src = 'images/mario-straight.png'

const background = new Image()
background.src = 'images/bg.jpg'

const banana = new Image()
banana.src = 'images.banana.png'

function renderCanvas() {
  ctx.fillStyle = '#ecf0f1'
  ctx.drawImage(background, 0, 0, cw, ch)
}

class Car {
  constructor() {
    this.direction = 'up'
    this.speed = 10
    this.x = cw / 2
    this.y = ch - 250
    this.w = 100
    this.h = 125
  }

  render() {
    if (this.direction === 'left') {
      mario.src = 'images/mario-left.png'
    }
    else if (this.direction === 'right') {
      mario.src = 'images/mario-right.png'
    }
    else {
      mario.src = 'images/mario-straight.png'
    }
    ctx.drawImage(mario, this.x - this.w / 2, this.y, this.w, this.h)
  }

  turn(direction) {
    this.direction = direction
  }

  accelerate(amount) {
    this.speed += amount
  }

  move() {
    ctx.clearRect(0, 0, cw, ch)
    renderCanvas()

    if (this.x <= 0) {
      this.x = 0
    }
    else if (this.x >= cw) {
      this.x = cw
    }

    switch (this.direction) {
      case 'up':
        this.y -= this.speed
        break
      case 'right':
        this.x += this.speed
        break
      case 'down':
        this.y += this.speed
        break
      case 'left':
        this.x -= this.speed
    }

    this.render()
  }

  static start(car) {
    carRunning = setInterval(function () {
      car.move()
    }, 16)
  }

  static stop(car) {
    clearInterval(carRunning)
  }
}

const user = new Car()

window.addEventListener('load', () => {
  renderCanvas()
  user.render()
})

window.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 37:
      user.turn('left')
      if (!moving) {
        moving = true
        Car.start(user)
      }
      break
    case 38:
      user.turn('up')
      if (!moving) {
        moving = true
        Car.start(user)
      }
      break
    case 39:
      user.turn('right')
      if (!moving) {
        moving = true
        Car.start(user)
      }
      break
    case 40:
      user.turn('down')
      if (!moving) {
        moving = true
        Car.start(user)
      }
      break
  }
})

window.addEventListener('keyup', function (event) {
  moving = false
  Car.stop(user)
})
