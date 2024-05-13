import Card from "../craftCard.js";
//

function newGame(cardsCount) {
  //create gameboard
  let cardsNumberArray = [];
  let cardsArray = [];
  let firstCard = null;
  let secondCard = null;
  let errors = 0;
  for (let i = 1; i <= cardsCount / 2; i++) {
    cardsNumberArray.push(i);
    cardsNumberArray.push(i);
  }

  shuffle(cardsNumberArray);

  for (const cardNumber of cardsNumberArray) {
    cardsArray.push(new Card(cardNumber, flip));
  }
  //logic game
  function flip(card) {
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number != secondCard.number) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null;
      }
    }
    if (firstCard == null) {
      firstCard = card;
    } else {
      if (secondCard == null) {
        secondCard = card;
      }
    }
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
      } else {
        errors++;
      }
    }

    //reset
    function reset() {
      let clickButton = button.addEventListener("click", () => {
        document.getElementById("game").innerHTML = "";
        let cardsNumberArray = [];
        let cardsArray = [];
        let firstCard = null;
        let secondCard = null;
        newGame(cardsCount);
      });
      if (
        document.querySelectorAll(".card.success").length ==
          cardsNumberArray.length ||
        errors == 5
      ) {
        document.getElementById("game").innerHTML = "";
        let cardsNumberArray = [];
        let cardsArray = [];
        let firstCard = null;
        let secondCard = null;
        newGame(cardsCount);
      }
    }
    setTimeout(reset, 3000);
  }
}
//mix
function shuffle(arr) {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

newGame(16);
