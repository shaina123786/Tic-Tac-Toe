let boxes = document.querySelectorAll(".box");
let restartBtn = document.querySelector("#restart");
let exit = document.querySelector("#exit");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnDisplay = document.querySelector("#turn-display");
let music = new Audio("music.mp3");
let turnMusic = new Audio("ting.mp3");
let gameOver = new Audio("gameOver.mp3");

let turnO = true;
let count = 0;

//  music.loop = true;
// music.play();



const patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const turn = () => {
    turnDisplay.innerText = turnO ? "Player O Turn!" : "Player X Turn!";

};

exit.addEventListener("click", () => {
    if (confirm("Are you sure you want to exit the game?")) { // Confirmation for user
        window.close();
    }
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Check if the box has been clicked already
        if (box.innerText === "")
        {
            turnMusic.play();
            box.innerText = turnO ? "O" : "X";
            box.classList.add(turnO ? "O" : "X");
            // if (turnO) {
            //     box.innerText = "O";
                // box.classList.add("O");
            
                // turnO = false;
                 turnO = !turnO;
            // } else {
            //     box.innerText = "X";
                // box.classList.add("X");
                // turnO = true;
            // }
            box.disabled = true;
            count++;
            turn();


            let isWinner = checkWinner();
            if (checkWinner() || count === 9) {
                if (count === 9)
                    gameDraw();
            // if (count === 9 && !isWinner) {
                
            }
        }
        
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw 🤝`;
    msg.style.color = " #f0f08f";
    msgContainer.classList.remove("hide");
    disableBoxes();
    
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("X", "O");
    });
};

const restartGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnDisplay.innerText = "Player O Turn!";
};

const show = (winner) => {
    msg.innerText = `Player ${winner} Wins! 🎉`;
    msg.style.color = "green";
    msgContainer.classList.remove("hide");
    gameOver.play();
    // music.pause();
    disableBoxes();
};

function checkWinner() {
    for (let pattern of patterns) {
        let [a, b, c] = pattern;
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;
        console.log(`Checking pattern: ${pattern}`);
        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            // if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            show(pos1Val);
            return true;
        }
    }
    return false; // No winner yet
}

// Event listener for restarting the game
restartBtn.addEventListener("click", restartGame);