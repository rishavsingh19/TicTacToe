let huPlayer = "X";
let comPlayer = "O";
let gameStatus = "Game On";
let orgboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const boxes = document.getElementsByClassName("box");
resetgame();
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {

        if (boxes[i].innerHTML.trim() == "" && gameStatus == "Game On") {

            boxes[i].innerHTML = huPlayer;
            orgboard[i] = huPlayer;
            checktie(winner);
            turn(bestspot(), comPlayer);
            var winner = declaringwin();
            declaringwin();
        }
    });
}
function emptyBox() {
    ArrayOfEmptyBox = [];
    for (let i = 0; i < 9; ++i) {
        if (typeof orgboard[i] == 'number') {
            ArrayOfEmptyBox.push(i);
        }
    }
    return ArrayOfEmptyBox;
}

function bestspot() {
    return minimax(orgboard, comPlayer).index;
}
function turn(Spot, player) {
    orgboard[Spot] = player;
    boxes[Spot].innerHTML = player;
}

function resetgame() {
    document.getElementById("reset").addEventListener("click", function () {
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML = "";
            boxes[i].style.backgroundColor = "#98B3EF";
            boxes[i].style.color = "black";
        }
        orgboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        document.getElementById("message").style.display = "none";
        gameStatus = "Game On";
    });
}
function showWinner(x, y, z, winner) {
    if (winner == huPlayer) {
        boxes[x].style.background = "#0d8b70";
        boxes[x].style.color = "white";
        boxes[y].style.background = "#0d8b70";
        boxes[y].style.color = "white";
        boxes[z].style.background = "#0d8b70";
        boxes[z].style.color = "white";
        document.getElementById("winner").innerHTML = "You Win :) !!";
        document.getElementById("message").style.display = "block";
        gameStatus = "Game Over";
    }
    else {
        boxes[x].style.background = "#FC1717";
        boxes[x].style.color = "white";
        boxes[y].style.background = "#FC1717";
        boxes[y].style.color = "white";
        boxes[z].style.background = "#FC1717";
        boxes[z].style.color = "white";
        document.getElementById("winner").innerHTML = "You Lose :(";
        document.getElementById("message").style.display = "block";
        gameStatus = "Game Over";
    }
}

function checkwin(sqboard) {
    if (
        sqboard[0] == sqboard[1] &&
        sqboard[1] == sqboard[2]) {
        return sqboard[0];
    } else if (
        sqboard[3] == sqboard[4] &&
        sqboard[4] == sqboard[5]) {
        return sqboard[3];
    } else if (
        sqboard[6] == sqboard[7] &&
        sqboard[7] == sqboard[8]) {
        return sqboard[6];
    } else if (
        sqboard[0] == sqboard[3] &&
        sqboard[3] == sqboard[6]) {
        return sqboard[0].innerHTML;
    } else if (
        sqboard[1] == sqboard[4] &&
        sqboard[4] == sqboard[7]) {
        return sqboard[1];
    } else if (
        sqboard[2] == sqboard[5] &&
        sqboard[5] == sqboard[8]) {
        return sqboard[2];
    } else if (
        sqboard[0] == sqboard[4] &&
        sqboard[4] == sqboard[8]) {
        return sqboard[0];
    } else if (
        sqboard[2] == sqboard[4] &&
        sqboard[4] == sqboard[6]) {
        return sqboard[2];
    }
    else {
        return null;
    }
}

function checktie(winner) {
    var available = emptyBox();
    if (winner == null && available.length == 0) {
        for (var i = 0; i < 9; i++) {
            boxes[i].style.background = "#85C814";
            boxes[i].style.color = "white";
        }
        document.getElementById("winner").innerHTML = "Tie";
        document.getElementById("message").style.display = "block";
        gameStatus = "Game Over";
    }
    else return false;
}

function minimax(newboard, player) {
    var emptyboxes = emptyBox();

    if (checkwin(newboard) == huPlayer) return { score: -10 };
    else if (checkwin(newboard) == comPlayer) return { score: 10 };
    else if (emptyboxes.length === 0) return { score: 0 };

    var moves = [];
    for (let i = 0; i < emptyboxes.length; ++i) {
        var temp = {};
        temp.index = newboard[emptyboxes[i]];
        newboard[emptyboxes[i]] = player;
        if (player == comPlayer) {
            var result = minimax(newboard, huPlayer);
            temp.score = result.score;
        }
        else {
            var result = minimax(newboard, comPlayer);
            temp.score = result.score;
        }
        newboard[emptyboxes[i]] = temp.index;
        moves.push(temp);
    }
    var bestMove;
    if (player == comPlayer) {
        var bestScore = -1000000;
        for (let i = 0; i < moves.length; ++i) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    else {
        var bestScore = 1000000;
        for (let i = 0; i < moves.length; ++i) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

function declaringwin() {
    if (
        boxes[0].innerHTML == boxes[1].innerHTML &&
        boxes[1].innerHTML == boxes[2].innerHTML &&
        boxes[0].innerHTML.trim() != ""
    ) {
        showWinner(0, 1, 2, boxes[0].innerHTML);
        return boxes[0].innerHTML;
    } else if (
        boxes[3].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[5].innerHTML &&
        boxes[3].innerHTML.trim() != ""
    ) {
        showWinner(3, 4, 5, boxes[3].innerHTML);
        return boxes[3].innerHTML;
    } else if (
        boxes[6].innerHTML == boxes[7].innerHTML &&
        boxes[7].innerHTML == boxes[8].innerHTML &&
        boxes[6].innerHTML.trim() != ""
    ) {
        showWinner(6, 7, 8, boxes[6].innerHTML);
        return boxes[6].innerHTML;
    } else if (
        boxes[0].innerHTML == boxes[3].innerHTML &&
        boxes[3].innerHTML == boxes[6].innerHTML &&
        boxes[0].innerHTML.trim() != ""
    ) {
        showWinner(0, 3, 6, boxes[0].innerHTML);
        return boxes[0].innerHTML;
    } else if (
        boxes[1].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[7].innerHTML &&
        boxes[1].innerHTML.trim() != ""
    ) {
        showWinner(1, 4, 7, boxes[1].innerHTML);
        return boxes[1].innerHTML;
    } else if (
        boxes[2].innerHTML == boxes[5].innerHTML &&
        boxes[5].innerHTML == boxes[8].innerHTML &&
        boxes[2].innerHTML.trim() != ""
    ) {
        showWinner(2, 5, 8, boxes[2].innerHTML);
        return boxes[2].innerHTML;
    } else if (
        boxes[0].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[8].innerHTML &&
        boxes[0].innerHTML.trim() != ""
    ) {
        showWinner(0, 4, 8, boxes[0].innerHTML);
        return boxes[0].innerHTML;
    } else if (
        boxes[2].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[6].innerHTML &&
        boxes[2].innerHTML.trim() != ""
    ) {
        showWinner(2, 4, 6, boxes[2].innerHTML);
        return boxes[2].innerHTML;

    }
    else {
        return null;
    }
}
