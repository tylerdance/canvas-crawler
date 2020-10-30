const movementDisplay = document.querySelector('#movement')
// canvas
const game = document.querySelector('#game')

// syncing up the canvas's internal height&width to its apparent height&width
const computerStyle = getComputedStyle(game)
const height = computerStyle.height;
const width = computerStyle.width;
    // use parseINt to remove 'px' from string '400px'
game.width = parseInt(width)
game.height = parseInt(height)


// grab a context from the canvas
const ctx = game.getContext('2d')


class Crawler {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
    }
    
    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect (this.x, this.y, this.width, this.height)
    }
}

const ogre = new Crawler(10, 10, "#BADA55", 40, 80)
const hero = new Crawler(0, 0, 'hotpink', 20, 20)

console.log(ogre);
console.log(hero);

document.getElementById('status').addEventListener('click', function() {
    hero.render()
    ogre.render()
})

document.addEventListener('keyup', function(e) {
    if (e.key ==='w') {
        hero.y -= 10
    } else if (e.key === 'a') {
        hero.x -= 10
    } else if (e.key === 's') {
        hero.y += 10
    } else if (e.key === 'd') {
        hero.x += 10
    }

    // console.log(hero);

    movementDisplay.textContent = `X: ${hero.x}, Y: ${hero.y}`
})

function detectHit() {
    // hit coming from the right
    if (hero.x < ogre.x + ogre.width 
        && hero.x + hero.width > ogre.x
        && hero.y < ogre.y + ogre.height 
        && hero.y + ogre.height > ogre.y) {
        ogre.alive = false
    }
}


function repaint() {
    // clear off the entire canvas  
    ctx.clearRect(0, 0, game.width, game.height)

    // render hero and ogre
    hero.render()
    ogre.render()
}
setInterval(repaint, 80)