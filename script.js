const adviceId = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");
const diceButton = document.getElementById("dice-button");

// #146 and #76 contain weird characters
const adviceToSkip = [146, 76];
const adviceRendered = [];

let canFetchAdvice = true;

const fetchAdvice = () => {
   if (!canFetchAdvice) {
      return;
   }

   fetch(`https://api.adviceslip.com/advice`)
      .then((res) => res.json())
      .then((adviceObj) => renderAdvice(adviceObj))
      .then(() => {
         // prevent spamming
         canFetchAdvice = false;
         setTimeout(() => {
            canFetchAdvice = true;
         }, 1000);
      })
      .catch((err) => console.error(err));
};

const renderAdvice = ({ slip }) => {
   const { advice, id } = slip;

   if (adviceRendered.includes(id) || adviceToSkip.includes(id)) {
      fetchAdvice();
      return;
   }

   adviceId.innerText = `Advice #${id}`;
   adviceText.innerText = `“${advice}”`;

   adviceRendered.push(id);
};

diceButton.addEventListener("click", fetchAdvice);
window.addEventListener("DOMContentLoaded", fetchAdvice);
