let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "orange", "purple"];
let h2 = document.querySelector('h2');

let started = false;
let level = 0;
let highScore = 0; // Track the highest score

document.addEventListener('keypress', function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // Adjusted to 4 since there are 4 buttons
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randbtn);
}

// Button flash for 350 milliseconds
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 350);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove('userflash');
    }, 350);
}

let allBtn = document.querySelectorAll('.btn');

for (btn of allBtn) {
    btn.addEventListener('click', btnpress);
}

function btnpress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level - 1; // Store the highest score
        }
        h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b>.<br> Highest score: <b>${highScore}</b><br>Press any key to start again.`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
