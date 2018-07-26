let boardValues = [
    "./images/blueshell.png",
    "./images/Games-icon.png",
    "./images/casino-icon.png",
    "./images/Center-icon.png",
    "./images/Chess-icon.png",
    "./images/Mario-SZ-icon.png",
    "./images/polito-icon.png",
    "./images/blueshell.png",
    "./images/Games-icon.png",
    "./images/casino-icon.png",
    "./images/Center-icon.png",
    "./images/Chess-icon.png",
    "./images/Mario-SZ-icon.png",
    "./images/polito-icon.png",
    "./images/soccer-icon.png",
    "./images/soccer-icon.png"
  ];
  
  let boardTileIds = [];
  let memoryValues = [];
  let matchedTileIds = [];
  let tilesFlipped = 0;
  let output = "",
    seconds = 0,
    minutes = 0,
    hours = 0;
  var counter = 0;
  var tm;
  const queImage = "/images/icon-que.png";
  
  const memoryBoard = document.getElementById("memory-board");
  const reset = document.getElementById("reset");
  const dialog = document.getElementById("dialog");
  const dialogCloseIcon = document.getElementsByClassName("close")[0];
  const numOfMoves = document.querySelector("#moves");
  const timer = document.querySelector("time");
  const playAgain = document.querySelector(".playAgain");
  const scoreDetails = document.querySelector("#scoreDetails");
  const stars = document.querySelectorAll(".fa-star");
  
  // initiating the board while loading the page
  document.body.onload = startGame();
  
  // creating shuffling and painitng the board tiles
  function shuffleArray(d) {
    for (var c = d.length - 1; c > 0; c--) {
      var b = Math.floor(Math.random() * (c + 1));
      var a = d[c];
      d[c] = d[b];
      d[b] = a;
    }
    return d;
  }
  
  function startGame() {
    // resetting counter, score, timer
    memoryBoard.innerHTML = "";
    output = "";
    counter = 0;
    numOfMoves.innerHTML = counter;
    tilesFlipped = 0;
    matchedTileIds = [];
    boardTileIds = [];
    memoryValues = [];
    // resetting timer
    if (tm) {
      // tm = null;
      seconds = 0;
      minutes = 0;
      hours = 0;
      clearInterval(tm);
      tm = null;
     } else {
      seconds = 0;
      minutes = 0;
      hours = 0;
      tm = null;
    }
    timer.innerHTML = "00:00:00";
    // resetting rating
    document
      .querySelectorAll(".fa-star")
      .forEach(element => element.classList.add("checked"));
  
    shuffleArray(boardValues).forEach(function(tileValue, tileIndex) {
      output +=
        '<div id="tile_' +
        tileIndex +
        '" onclick="memoryFlipTile(event, this,\'' +
        tileValue +
        "')\"></div>";
    });
  
    memoryBoard.innerHTML = output;
  }
  
  // resetting the board wheck user clciks restart button
  reset.addEventListener("click", function() {
    startGame();
  });
  
  // timer logic
  function createTimer() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
  
    timer.textContent =
      (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
      ":" +
      (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
      ":" +
      (seconds > 9 ? seconds : "0" + seconds);
  }
  
  // uncheck stars
  function uncheckStars() {
    stars[stars.length - 1].classList.remove("checked");
    stars[stars.length - 2].classList.remove("checked");
    stars[stars.length - 3].classList.remove("checked");
    stars[stars.length - 4].classList.remove("checked");
  }
  
  // ----- main game functionality ---
  // ---------------------
  // set up the card as flipped
  function setUpCardFliped(tile, value) {
    tile.style.backgroundImage = `url(${value})`;
    tile.style.backgroundSize = "100% 100%";
    tile.style.pointerEvents = 'none';
  }
  
  // flipback cards that are not matched
  function flipback() {
    document.getElementById(boardTileIds[0]).style.background = "rgb(166, 175, 172)";
    document.getElementById(boardTileIds[0]).style.pointerEvents = 'auto';
    document.getElementById(boardTileIds[1]).style.background = "rgb(166, 175, 172)";
    document.getElementById(boardTileIds[1]).style.pointerEvents = 'auto';
    memoryValues = [];
    boardTileIds = [];
  }
  
  // to keep track of open card values
  function storeTileIdValue(tile, value) {
    memoryValues.push(value);
    boardTileIds.push(tile.id);
  }
  
  // check clciked tile values
  function isMatchCards() {
    return memoryValues[0] == memoryValues[1];
  }
  
  // clearing the local saved arrays data after matching cards
  // and background color of tiles to restrict them
  function afterCatdsMatched() {
    console.log("after matched");
    matchedTileIds.push(...boardTileIds);
    memoryValues = [];
    boardTileIds = [];
    tilesFlipped += 2;
  }
  
  // game over
  // check wether the game is over or not
  function gameOver() {
    displayModal(counter);
    tilesFlipped = 0;
    counter = 0;
    matchedTileIds = [];
    memoryValues = [];
    boardTileIds = [];
  }
  
  // total time
  const totalTime = function() {
    return `${hours}hr(s) ${minutes}min(s) ${seconds}sec(s) `;
  };
  // display dialog , when user wins the game,
  const displayModal = function(moves) {
    scoreDetails.innerHTML = "";
    scoreDetails.insertAdjacentHTML(
      "beforeend",
      `<p>Made ${counter} move(s)</p>`
    );
    scoreDetails.insertAdjacentHTML("beforeend", `<p> in ${totalTime()}</p>`);
    scoreDetails.insertAdjacentHTML(
      "beforeend",
      `<p>score rating 
      ${document.getElementsByClassName("checked").length} 
      <span class="fa fa-star checked"></span></p>`
    );
    dialog.style.display = "block";
  };
  
  // when user clicks close (X) icon
  dialogCloseIcon.onclick = function() {
    dialog.style.display = "none";
    startGame();
  };
  
  // when user clicks on playAgain button
  playAgain.addEventListener("click", function() {
    dialog.style.display = "none";
    startGame();
  });
  
  // calculate score rating based on moves
  function setupRating(moves) {
    if (moves > 8 && moves <= 11) {
      stars[stars.length - 1].classList.remove("checked");
    } else if (moves > 12 && moves < 16) {
      // stars[stars.length - 1].classList.remove("checked");
      stars[stars.length - 2].classList.remove("checked");
    } else if (moves > 16 && moves <= 19) {
      // stars[stars.length - 1].classList.remove("checked");
      // stars[stars.length - 2].classList.remove("checked");
      stars[stars.length - 3].classList.remove("checked");
    } else if (moves > 23) {
      stars[stars.length - 4].classList.remove("checked");
      // uncheckStars();
    }
  }
  
  // main memory game logic part
  function memoryFlipTile(e, tileClicked, value) {
    if (!tm) {
      tm = setInterval(createTimer, 400);
    }
    // stating the game logic
    if (!matchedTileIds.includes(tileClicked.id) && memoryValues.length < 2) {
      setUpCardFliped(tileClicked, value);
      if (tileClicked.style.backgroundImage) {
        storeTileIdValue(tileClicked, value);
        if (memoryValues.length == 2) {
          counter = counter + 1;
          // ---game displays the current no.of moves
          numOfMoves.innerHTML = counter;
          //--- displaying the star rating
          setupRating(counter);
          // checkeing the wether cards r matched or not
          if (isMatchCards()) {
            afterCatdsMatched();
            //--- check wether the game is over or not
            if (boardValues.length == tilesFlipped) {
              //--- clearing the timer interval
              clearInterval(tm);
              tm = null;
              //--- invoke gameover method to genrate dialog box
              setTimeout(gameOver, 100);
            }
          } else {
            setTimeout(flipback, 200);
          }
        }
      }
    }
  }
  