const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const battle = {
  initiated: false,
};
//creating the canvas
canvas.width = 1024;
canvas.height = 576;

const offset = {
  x: -1000,
  y: -650,
};

//drawing image in canvas

const backgroundImg = document.createElement("img");
backgroundImg.src = "./assets/img/backgroundMap.png";
const hermione = document.createElement("img");
hermione.src = "./assets/img/singleHermione2.png";

const battleBackgroundImage = document.createElement("img");
battleBackgroundImage.src = "./assets/img/battleBackground.png";

// const attackDiv = document.getElementById("attack");
// const attackOn = document.createElement("div");
// attackOn.className = "attackBar";

const battleBackground = new backgroundClass({
  image: battleBackgroundImage,
  position: { x: 0, y: 0 },
});

//creating hermione class in canvas

const battlePatch = new Boundary({
  position: { x: 900, y: 300 },
});

const battlePatch2 = new Boundary({
  position: { x: 900, y: 50 },
});

//might not need mandrake image...refactor

const player = new Sprite({
  position: {
    x: canvas.width - 510,
    y: canvas.height - 250,
  },
  image: hermione,
  //   width: this.width,
  //   height: this.height,
});
//creating background moving class
const background = new backgroundClass({
  image: backgroundImg,
  position: { x: offset.x, y: offset.y },
});

////////colliding zone///////////
// creating collisions array
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

///////drawing boundaries/////////

const boundaries = [];

//////colliding zone///////////
//looping over each row, i=index of the subarray
collisionsMap.forEach((row, i) => {
  //within each row, j=index that is looping over each symbol [0,1,0]
  row.forEach((symbol, j) => {
    //so that only pushing in boundaries that i want 1025
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * 48 + offset.x,
            y: i * 48 + offset.y,
          },
        })
      );
  });
});

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height
  );
}

//adding keys object --> default = false
const keys = {
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};

const battleHermione = new Hero({
  name: "Hermione",
  health: 500,
});

const mandrake = new Hero({
  name: "Mandrake",
  health: 100,
});

/////////////BATTLE SCENE/////////////////////
const container = document.getElementById("container");
// const attackBtn = document.createElement("div");
// attackBtn.innerText = "Hello";
// canvas.prepend(attackBtn);
// const insertOverlay = document.getElementById("insertOverlay");
//   window.requestAnimationFrame(animateBattle);
//   battleBackground.draw();
//   //   attackDiv.appendChild(attackOn);
//   mandrake.draw();
//   battleHermione.draw();

////// insert ...battleZones below////

// creating movables array
const movables = [background, battlePatch, battlePatch2, ...boundaries];
let moving = true;

function animate() {
  //adding infinite loop so character can move
  const animationId = window.requestAnimationFrame(animate);
  //   console.log(animationId);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();

    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: boundary,
      })
    ) {
      console.log("colliding boundary");
    }
  });
  player.draw();
  battlePatch.draw();
  battlePatch2.draw();

  //////////forboundarycollision////////////

  if (keys.ArrowUp.pressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        console.log("colliding boundary");
        moving = false;
        break;
      }
    }
    if (battle.initiated) return true;
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: battlePatch,
      })

      //   player.position.x + player.width >= battlePatch.position.x &&
      //   player.position.x <= battlePatch.position.x + battlePatch.width &&
      //   player.position.y + player.height >= battlePatch.position.y &&
    ) {
      console.log("initiate battle");
      battle.initiated = true;
      animateBattle();
    }
    if ((moving = true))
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
    //  if (battle.initiated) return true;
    // if (
    //   rectangularCollision({
    //     rectangle1: player,
    //     rectangle2: battlePatch,
    //   })

    //   //   player.position.x + player.width >= battlePatch.position.x &&
    //   //   player.position.x <= battlePatch.position.x + battlePatch.width &&
    //   //   player.position.y + player.height >= battlePatch.position.y &&
    // ) {
    //   console.log("initiate battle");
    //   battle.initiated = true;
    //   animateBattle();
    // }
    //   player.position.y <= battlePatch.position.y + battlePatch.height
    // while(battleHermione.health<0){
    //   (mandrake.position.y += 3),
    //   (battlePatch.position.y += 3);
  } else if (keys.ArrowDown.pressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        console.log("colliding boundary");
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
    //   (mandrake.position.y -= 3),
    //   (battlePatch.position.y -= 3);
  } else if (keys.ArrowLeft.pressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log("colliding boundary");
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
    //   (mandrake.position.x += 3),
    //   (battlePatch.position.x += 3);
  } else if (keys.ArrowRight.pressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log("colliding boundary");
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
    //   (mandrake.position.x -= 3),
    //   (battlePatch.position.x -= 3);
  }
}

animate();

function animateBattle() {
  const overlay = document.createElement("div");
  overlay.setAttribute("id", "overlay");
  //   overlay.classList.add("blink");
  container.append(overlay);

  const mandrakeImg = document.createElement("img");
  mandrakeImg.src = "./assets/img/mandrake.png";
  mandrakeImg.className = "mandrake";
  overlay.appendChild(mandrakeImg);

  const battleHermioneImg = document.createElement("img");
  battleHermioneImg.src = "./assets/img/hermioneBattle.png";
  battleHermioneImg.className = "hermione";
  overlay.appendChild(battleHermioneImg);

  const divId = document.createElement("div");
  divId.setAttribute("id", "attackButtons");
  overlay.appendChild(divId);

  const button1 = document.createElement("button");
  button1.className = "attack1";
  button1.innerText = "Wingardium Leviosa";
  overlay.appendChild(button1);

  const button2 = document.createElement("button");
  button2.className = "attack2";
  button2.innerText = "Obliviate";
  overlay.appendChild(button2);

  const button3 = document.createElement("button");
  button3.className = "attack3";
  button3.innerText = "Petrificus Totalus";
  overlay.appendChild(button3);

  const hermioneFullHealth = document.createElement("div");
  hermioneFullHealth.className = "hermioneFullHealth";
  hermioneFullHealth.innerText = battleHermione.health;
  overlay.appendChild(hermioneFullHealth);

  const mandrakeFullHealth = document.createElement("div");
  mandrakeFullHealth.className = "enemyFullHealth";
  mandrakeFullHealth.innerText = mandrake.health;
  overlay.appendChild(mandrakeFullHealth);

  //   const dialogueBox = document.createElement("div");
  //   dialogueBox.className = "dialogueBox";
  //   dialogueBox.innerText = battleHermione.announceResults();
  //   overlay.appendChild(dialogueBox);

  button1.addEventListener("click", (e) => {
    console.log(battleHermione.announceHealth());
    // if this is working correctly??

    //    while (battleHermione.health>0 && mandrake.health>0){
    battleHermione.attack(mandrake);
    hermioneFullHealth.innerText = battleHermione.announceHealth();
    if (mandrake.health < 0) {
      alert("mandrake died");
      overlay.remove();
      //   moving = true;
      //   window.requestAnimationFrame(animate);
    } else {
      mandrake.attack(battleHermione);
      mandrakeFullHealth.innerText = mandrake.announceHealth();
    }

    //   console.log(battleHermione.announceHealth());

    //   overlay.remove();
    //   animate();

    if (battleHermione.health < 0) {
      alert("game over");
    }
  });
}
// }
//when keys are key down
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    keys.ArrowDown.pressed = true;
  } else if (e.key === "ArrowUp") {
    keys.ArrowUp.pressed = true;
  } else if (e.key === "ArrowRight") {
    keys.ArrowRight.pressed = true;
  } else if (e.key === "ArrowLeft") {
    keys.ArrowLeft.pressed = true;
  }
});

//when keys are keyup
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowDown") {
    keys.ArrowDown.pressed = false;
  } else if (e.key === "ArrowUp") {
    keys.ArrowUp.pressed = false;
  } else if (e.key === "ArrowRight") {
    keys.ArrowRight.pressed = false;
  } else if (e.key === "ArrowLeft") {
    keys.ArrowLeft.pressed = false;
  }
});

//beast

//

//battle
