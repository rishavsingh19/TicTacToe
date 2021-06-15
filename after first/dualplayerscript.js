let currentPlayer = "X";
let gameStatus = "Game On";
const boxes = document.getElementsByClassName("box");
resetgame();
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {
        if (boxes[i].innerHTML.trim() == "" && gameStatus == "Game On") {
            boxes[i].innerHTML = currentPlayer;
            currentPlayer = currentPlayer == "X" ? "O" : "X";
            document.getElementById("player").innerHTML = currentPlayer;
            var available = emptySq();
            var winner = checkwin();
            checktie(winner, available);
            checkwin();
        }
    });
}
resetgame();
function resetgame() {
    document.getElementById("reset").addEventListener("click", function () {
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML = "";
            boxes[i].style.backgroundColor = "#98B3EF";
            boxes[i].style.color = "black";
        }
        currentPlayer = "x";
        document.getElementById("message").style.display = "none";
        document.getElementById("player").innerHTML = "X";
        gameStatus = "Game On";
    });
}
function showWinner(x, y, z) {
    boxes[x].style.background = "#0d8b70";
    boxes[x].style.color = "white";
    boxes[y].style.background = "#0d8b70";
    boxes[y].style.color = "white";
    boxes[z].style.background = "#0d8b70";
    boxes[z].style.color = "white";
    document.getElementById("winner").innerHTML =
        (currentPlayer == "X" ? "O" : "X") + " Wins";
    document.getElementById("message").style.display = "block";
    gameStatus = "Game Over";
}
function checkwin() {
    if (
        boxes[0].innerHTML == boxes[1].innerHTML &&
        boxes[1].innerHTML == boxes[2].innerHTML &&
        boxes[0].innerHTML.trim() != ""
    ) {
        showWinner(0, 1, 2);
        return boxes[0].innerHTML;
    } else if (
        boxes[3].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[5].innerHTML &&
        boxes[3].innerHTML.trim() != ""
    ) {
        showWinner(3, 4, 5);
        return boxes[0].innerHTML;
    } else if (
        boxes[6].innerHTML == boxes[7].innerHTML &&
        boxes[7].innerHTML == boxes[8].innerHTML &&
        boxes[6].innerHTML.trim() != ""
    ) {
        showWinner(6, 7, 8);
        return boxes[0].innerHTML;
    } else if (
        boxes[0].innerHTML == boxes[3].innerHTML &&
        boxes[3].innerHTML == boxes[6].innerHTML &&
        boxes[0].innerHTML.trim() != ""
    ) {
        showWinner(0, 3, 6);
        return boxes[0].innerHTML;
    } else if (
        boxes[1].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[7].innerHTML &&
        boxes[1].innerHTML.trim() != ""
    ) {
        showWinner(1, 4, 7);
        return boxes[0].innerHTML;
    } else if (
        boxes[2].innerHTML == boxes[5].innerHTML &&
        boxes[5].innerHTML == boxes[8].innerHTML &&
        boxes[2].innerHTML.trim() != ""
    ) {
        showWinner(2, 5, 8);
        return boxes[0].innerHTML;
    } else if (
        boxes[0].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[8].innerHTML &&
        boxes[0].innerHTML.trim() != ""
    ) {
        showWinner(0, 4, 8);
        return boxes[0].innerHTML;
    } else if (
        boxes[2].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[6].innerHTML &&
        boxes[2].innerHTML.trim() != ""
    ) {
        showWinner(2, 4, 6);
        return boxes[0].innerHTML;
    }
    else {
        return null;
    }
}

function checktie(winner, available) {
    if (winner == null && available == 0) {
        for (var i = 0; i < 9; i++) {
            boxes[i].style.background = "#85C814";
            boxes[i].style.color = "white";
        }
        document.getElementById("winner").innerHTML = "Tie Game";
        document.getElementById("message").style.display = "block";
        gameStatus = "Game Over";
    }
}
function emptySq() {
    var count = 0;
    for (var i = 0; i < 9; i++) {
        if (boxes[i].innerHTML == "")
            count++;
    }
    return count;
}