"use strict";
window.addEventListener("load", ready);

let points = 0;
let lives = 0;

function ready() {
  console.log("JavaScript ready!");

  document.querySelector("#btn_start").addEventListener("click", startGame);
  document.querySelector("#btn_restart").addEventListener("click", startGame);
  document
    .querySelector("#btn_go_to_start")
    .addEventListener("click", showStartScreen);
}

function showGameScreen() {
  // Skjul startskærm, game over og level complete
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function showStartScreen() {
  // fjern hidden fra startskærm og tilføj til game over og level complete
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function resetLives() {
  // sæt lives til 3
  lives = 3;
  //nulstil visning af liv (hjerte vi ser)
  document.querySelector("#heart1").classList.remove("broken_heart");
  document.querySelector("#heart2").classList.remove("broken_heart");
  document.querySelector("#heart3").classList.remove("broken_heart");
  document.querySelector("#heart1").classList.add("active_heart");
  document.querySelector("#heart2").classList.add("active_heart");
  document.querySelector("#heart3").classList.add("active_heart");
}

function resetPoints() {
  // nulstil point
  points = 0;
  // nulstil vising af point
  displayPoints();
}

function startGame() {
  startAnimationer();
  regristrerClick();
  sætPositioner();
  showGameScreen();
  resetPoints();
  resetLives();

  document.querySelector("#background_sound").play();

  // start timer
  startTimer();

  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");

  document
    .querySelector("#proteinbar_container1")
    .addEventListener("animationiteration", proteinbarRestart);
  document
    .querySelector("#proteinbar_container2")
    .addEventListener("animationiteration", proteinbarRestart);
  document
    .querySelector("#proteinbar_container3")
    .addEventListener("animationiteration", proteinbarRestart);

  document
    .querySelector("#waterbottle_container1")
    .addEventListener("animationiteration", proteinbarRestart);
  document
    .querySelector("#waterbottle_container2")
    .addEventListener("animationiteration", proteinbarRestart);
  document
    .querySelector("#waterbottle_container3")
    .addEventListener("animationiteration", proteinbarRestart);
  document
    .querySelector("#muffin_container1")
    .addEventListener("animationiteration", proteinbarRestart);
  document
    .querySelector("#muffin_container2")
    .addEventListener("animationiteration", proteinbarRestart);
  document
    .querySelector("#muffin_container3")
    .addEventListener("animationiteration", proteinbarRestart);
}

function sætPositioner() {
  document.querySelector("#proteinbar_container1").classList.add("position1");
  document.querySelector("#proteinbar_container2").classList.add("position2");
  document.querySelector("#proteinbar_container3").classList.add("position3");
  document.querySelector("#waterbottle_container1").classList.add("position4");
  document.querySelector("#waterbottle_container2").classList.add("position5");
  document.querySelector("#waterbottle_container3").classList.add("position6");
  document.querySelector("#muffin_container1").classList.add("position7");
  document.querySelector("#muffin_container2").classList.add("position8");
  document.querySelector("#muffin_container3").classList.add("position9");
}

function regristrerClick() {
  document
    .querySelector("#proteinbar_container1")
    .addEventListener("click", clickproteinbar);

  document
    .querySelector("#proteinbar_container2")
    .addEventListener("click", clickproteinbar);

  document
    .querySelector("#proteinbar_container3")
    .addEventListener("click", clickproteinbar);

  document
    .querySelector("#waterbottle_container1")
    .addEventListener("click", clickwaterbottle);

  document
    .querySelector("#waterbottle_container2")
    .addEventListener("click", clickwaterbottle);

  document
    .querySelector("#waterbottle_container3")
    .addEventListener("click", clickwaterbottle);

  document
    .querySelector("#muffin_container1")
    .addEventListener("click", clickmuffin);

  document
    .querySelector("#muffin_container2")
    .addEventListener("click", clickmuffin);

  document
    .querySelector("#muffin_container3")
    .addEventListener("click", clickmuffin);
}

function startAnimationer() {
  document.querySelector("#proteinbar_container1").classList.add("falling");
  document.querySelector("#proteinbar_container2").classList.add("falling");
  document.querySelector("#proteinbar_container3").classList.add("falling");
  document.querySelector("#waterbottle_container1").classList.add("falling");
  document.querySelector("#waterbottle_container2").classList.add("falling");
  document.querySelector("#waterbottle_container3").classList.add("falling");
  document.querySelector("#muffin_container1").classList.add("falling");
  document.querySelector("#muffin_container2").classList.add("falling");
  document.querySelector("#muffin_container3").classList.add("falling");
}

function clickproteinbar() {
  console.log("Click proteinbar");
  const proteinbar = this; //document.querySelector("#proteinbar_container1");
  // Forhindr gentagne clicks

  proteinbar.removeEventListener("click", clickproteinbar);

  // Stop coin container
  proteinbar.classList.add("paused");

  // sæt forsvind-animation på coin
  proteinbar.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: coinGone

  proteinbar.addEventListener("animationend", proteinbarGone);

  document.querySelector("#good_click").currentTime = 0;
  document.querySelector("#good_click").play();

  incrementPoints();
}

function proteinbarGone() {
  console.log("proteinbar gone");

  const proteinbar = this;
  // fjern event der bringer os herind

  proteinbar.removeEventListener("animationend", proteinbarGone);

  // fjern forsvind-animation
  proteinbar.querySelector("img").classList.remove("zoom_out");

  // fjern pause
  proteinbar.classList.remove("paused");

  proteinbarRestart.call(this);

  // gør det muligt at klikke på coin igen

  proteinbar.addEventListener("click", clickproteinbar);
}

function proteinbarRestart() {
  console.log("proteinbar restart");
  const proteinbar = this;

  proteinbar.classList.remove("falling");
  proteinbar.offsetWidth;
  proteinbar.classList.add("falling");

  proteinbar.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6",
    "position7",
    "position8",
    "position9"
  );

  const p = Math.ceil(Math.random() * 5);
  proteinbar.classList.add(`position${p}`);
}

function clickwaterbottle() {
  console.log("Click waterbottle");
  const waterbottle = this; // document.querySelector("#waterbottle_container1");
  // Forhindr gentagne clicks

  waterbottle.removeEventListener("click", clickwaterbottle);

  // Stop coin container
  waterbottle.classList.add("paused");

  // sæt forsvind-animation på coin
  waterbottle.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: coinGone
  waterbottle.addEventListener("animationend", waterbottleGone);

  document.querySelector("#good_click").currentTime = 0;
  document.querySelector("#good_click").play();

  incrementPoints();
}

function waterbottleGone() {
  console.log("waterbottle gone");
  const waterbottle = this;
  // fjern event der bringer os herind

  waterbottle.removeEventListener("animationend", waterbottleGone);

  // fjern forsvind-animation
  waterbottle.querySelector("img").classList.remove("zoom_out");

  // fjern pause
  waterbottle.classList.remove("paused");

  //genstart falling animation
  document.querySelector("#waterbottle_container1").classList.remove("falling");
  document.querySelector("#waterbottle_container1").offsetWidth;
  document.querySelector("#waterbottle_container1").classList.add("falling");

  // gør det muligt at klikke på coin igen

  waterbottle.addEventListener("click", clickwaterbottle);
}

function clickmuffin() {
  console.log("Click muffin");
  const muffin = this;
  // Forhindr gentagne clicks

  muffin.removeEventListener("click", clickmuffin);

  // Stop coin container
  muffin.classList.add("paused");

  // sæt forsvind-animation på coin
  muffin.querySelector("img").classList.add("zoom_in");

  // når forsvind-animation er færdig: coinGone

  muffin.addEventListener("animationend", muffinGone);

  decrementLives();

  document.querySelector("#bad_click").currentTime = 0;
  document.querySelector("#bad_click").play();
}

function muffinGone() {
  console.log("muffin gone");
  const muffin = this;
  // fjern event der bringer os herind

  muffin.removeEventListener("animationend", muffinGone);

  // fjern forsvind-animation
  muffin.querySelector("img").classList.remove("zoom_in");

  // fjern pause
  muffin.classList.remove("paused");

  // genstart falling animation
  document.querySelector("#muffin_container1").classList.remove("falling");
  document.querySelector("#muffin_container1").offsetWidth;
  document.querySelector("#muffin_container1").classList.add("falling");

  // gør det muligt at klikke på coin igen

  muffin.addEventListener("click", clickmuffin);
}

function incrementPoints() {
  console.log("Giv point");
  points++;
  console.log("har nu " + points + " point");
  displayPoints();
  if (points >= 10) {
    levelComplete();
  }
}

function displayPoints() {
  console.log("cis point");
  document.querySelector("#muffinproteinbar_count").textContent = points;
}

function decrementLives() {
  console.log("mist et liv");
  showDecrementedLives();
  lives--;
  if (lives <= 0) {
    gameOver();
  }
}

function incrementLives() {
  console.log("få et liv");
  lives++;
  showIncrementedLives();
}

function showDecrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("active_heart");
  document.querySelector("#heart" + lives).classList.add("broken_heart");
}

function showIncrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("broken_heart");
  document.querySelector("#heart" + lives).classList.add("active_heart");
}

function gameOver() {
  console.log("Game Over");
  document.querySelector("#game_over").classList.remove("hidden");
  stopGame();

  document.querySelector("#gameover_sound").play();

  //document.querySelector("#game_over_proteinbar").textContent = points;
  //document.querySelector("#game_over_waterbottle").textContent = points;
}

function levelComplete() {
  console.log("Level Complete");
  document.querySelector("#level_complete").classList.remove("hidden");
  stopGame();

  document.querySelector("#levelcomplete_sound").play();

  //document.querySelector("#level_complete_proteinbar").textContent = points;
  //document.querySelector("#level_complete_waterbottle").textContent = points;
}

function stopGame() {
  console.log("stopgame");
  // Stop animationer
  document.querySelector("#proteinbar_container1").classList.remove("falling");
  document.querySelector("#proteinbar_container2").classList.remove("falling");
  document.querySelector("#proteinbar_container3").classList.remove("falling");
  document.querySelector("#waterbottle_container1").classList.remove("falling");
  document.querySelector("#waterbottle_container2").classList.remove("falling");
  document.querySelector("#waterbottle_container3").classList.remove("falling");
  document.querySelector("#muffin_container1").classList.remove("falling");
  document.querySelector("#muffin_container2").classList.remove("falling");
  document.querySelector("#muffin_container3").classList.remove("falling");

  document
    .querySelector("#proteinbar_container1")
    .removeEventListener("click", clickproteinbar);
  document
    .querySelector("#proteinbar_container2")
    .removeEventListener("click", clickproteinbar);
  document
    .querySelector("#proteinbar_container3")
    .removeEventListener("click", clickproteinbar);
  document
    .querySelector("#waterbottle_container1")
    .removeEventListener("click", clickwaterbottle);
  document
    .querySelector("#waterbottle_container2")
    .removeEventListener("click", clickwaterbottle);
  document
    .querySelector("#waterbottle_container3")
    .removeEventListener("click", clickwaterbottle);
  document
    .querySelector("#muffin_container1")
    .removeEventListener("click", clickmuffin);
  document
    .querySelector("#muffin_container2")
    .removeEventListener("click", clickmuffin);
  document
    .querySelector("#muffin_container3")
    .removeEventListener("click", clickmuffin);

  document.querySelector("#background_sound").pause();
  document.querySelector("#background_sound").currentTime = 0;

  document.querySelector("#time_sprite").classList.remove("shrink");
}

function startTimer() {
  // Sæt timer-animationen (shrink) i gang ved at tilføje klassen shrink til time_sprite
  document.querySelector("#time_sprite").classList.add("shrink");

  // Tilføj en eventlistener som lytter efter at animationen er færdig (animationend) og kalder funktionen timeIsUp
  document
    .querySelector("#time_sprite")
    .addEventListener("animationend", timeIsUp);
}
function timeIsUp() {
  console.log("Tiden er gået!");

  if (points >= 10) {
    levelComplete();
  } else {
    gameOver();
  }
}
