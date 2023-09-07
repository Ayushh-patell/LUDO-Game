let boxes = Array.from(document.getElementsByClassName("box"));
let blocks = Array.from(document.getElementsByClassName("block"));
let btn_green = document.getElementById("btn_green");
let btn_yellow = document.getElementById("btn_yellow");
let btn_red = document.getElementById("btn_red");
let btn_blue = document.getElementById("btn_blue");
let btn = Array.from(document.getElementsByClassName("roll_button"));
let green_win = document.getElementsByClassName("green_win")[0];
let yellow_win = document.getElementsByClassName("yellow_win")[0];
let blue_win = document.getElementsByClassName("blue_win")[0];
let red_win = document.getElementsByClassName("red_win")[0];
let dice_num
let dice = document.getElementById("dice");
let dice_img = document.getElementById("dice-img");
let gameOver = false;
let turn = 1;
let final_num = 1;
let Number_of_roll = 0
let homeElement
// object to specify turn number with the color
let turn_btn = {
    1: "green",
    2: "yellow",
    3: "blue",
    4: "red"
}

let green_block = [];
let yellow_block = []
let red_block = []
let blue_block = []

let moves = [];
let final_moves = [];
let num = [];
let middle_num = [];
// adding the number of id's for squares of each lane in a single array, and separating the square in between the two lane
for (let i = 1; i < 53; i++) {
    if (i == 7 || i == 20 || i == 33 || i == 46) {
        middle_num.push(i)
    }
    else {
        num.push(i)
    }
}
let num_arr = [];
let number
// separating the array in smaller arrays for each lane
while (num.length) {
    num_arr.push(num.splice(0, 6));
}
let route_arr = [route_1, route_2, route_3, route_4]
let container = document.getElementsByClassName("container")[0];

//creating a div for each lane and appending them in their respective route div
for (let i in num_arr) {
    let lane = document.createElement("div");
    lane.setAttribute("class", "lane")
    lane.setAttribute("id", `lane_${i}`)
    num_arr[i].forEach(block => {
        let square = document.createElement("div");
        square.setAttribute("class", "square")
        square.setAttribute("id", `S${(block)}`)
        lane.appendChild(square)
    })
    if (i == 0 || i == 1) {
        route_1.appendChild(lane)
    }
    if (i == 2 || i == 3) {
        route_2.appendChild(lane)
    }
    if (i == 4 || i == 5) {
        route_3.appendChild(lane)
    }
    if (i == 6 || i == 7) {
        route_4.appendChild(lane)
    }
    // container.appendChild(lane)
}

//creating a div for the middle square and adding it after the first lane in the route
for (let i in middle_num) {
    let middlerow = document.createElement("div")
    middlerow.setAttribute("class", "lane")
    i = parseInt(i)
    middlerow.setAttribute("id", `middle_${i}`)
    //adding the centre coloured path of each player
    for (let j = 1; j < 6; j++) {
        let center_block = document.createElement("div")
        center_block.setAttribute("class", "square centre")
        center_block.setAttribute("id", `c_${6 - j}_${i}`)
        middlerow.appendChild(center_block)
    }
    let middle = document.createElement("div")
    middle.setAttribute("class", "square")
    middle.setAttribute("id", `S${(middle_num[i])}`)
    middlerow.appendChild(middle)
    let lane_to_add = document.getElementById(`lane_${(i * 2)}`)
    lane_to_add.after(middlerow)
}
//an array for the beginning squares for each colour 
let homeElements = [S48, S9, S22, S35];
S9.classList.add("yellow_home")
S22.classList.add("blue_home")
S35.classList.add("red_home")
S48.classList.add("green_home")

// an array for the last square of the path for the individual colour
let finalElements = [S46, S7, S20, S33];
S7.classList.add("yellow_final", "0")
S20.classList.add("blue_final", "1")
S33.classList.add("red_final", "2")
S46.classList.add("green_final", "3")

// creating the piece div and giving them atributes for each player
for (let i = 0; i < 4; i++) {
    Array.from(boxes[i].children).forEach(element => {
        let piece = document.createElement("div")
        piece.setAttribute("class", `piece ${boxes[i].parentElement.classList[0].split("_")[0]}`)
        piece.setAttribute("id", `${boxes[i].parentElement.classList[0].split("_")[0]}_piece_${element.id.split("_")[2]}`)
        element.appendChild(piece)
    })

}
let green_pieces = [];
let yellow_pieces = []
let red_pieces = []
let blue_pieces = []

//populating arrays for each coloured piece
let pieces = Array.from(document.getElementsByClassName("piece"))
pieces.forEach(element => {
    if (element.id.includes("green")) {
        green_pieces.push(element)
    }
    if (element.id.includes("yellow")) {
        yellow_pieces.push(element)
    }
    if (element.id.includes("red")) {
        red_pieces.push(element)
    }
    if (element.id.includes("blue")) {
        blue_pieces.push(element)
    }
})
blocks.forEach(element => {
    if (element.id.includes("green")) {
        green_block.push(element)
    }
    if (element.id.includes("yellow")) {
        yellow_block.push(element)
    }
    if (element.id.includes("red")) {
        red_block.push(element)
    }
    if (element.id.includes("blue")) {
        blue_block.push(element)
    }
})


// important function

//function to change the turn and enable the appropriate button
function Turn_change() {
    if (turn > 3) {
        turn = 1
    }
    else {
        turn++
    }
    eval(`btn_${turn_btn[turn]}`).disabled = false
}

//function to calculate the movement on the board, moving the clicked piece, hitting the enemy's piece, and win
function piece_move(piece) {
    //calculating movement
    moves = [];
    final_moves = [];
    let centre_flag = false
    let decrement = 0
    for (let i = 1; i < (dice_num + 1); i++) {
        if (piece.parentElement.classList.contains("centre") || piece.parentElement.classList[0].includes("win")) {
            let cords = piece.parentElement.id.slice(2, 3)
            cords = parseInt(cords)
            let colour_cords = piece.parentElement.id.slice(4)
            if (((cords + dice_num) == 6)) {
                centre_flag = true
                eval(`${piece.classList[1]}_win`).appendChild(piece)
                break
            }
            else if ((cords + i) <= 5) {
                final_moves.push(`c_${(cords + i)}_${colour_cords}`)
                centre_flag = true
            }
            else if ((cords + i) > 5 && (cords + i) < 10) {
                final_moves.push(`c_${5 + (--decrement)}_${colour_cords}`)
                centre_flag = true
            }
            else {
                final_moves.push(`c_1_${colour_cords}`)
                centre_flag = true
            }
        }

        else {
            let cords = piece.parentElement.id.slice(1)
            cords = parseInt(cords)
            if ((cords + i) > 52) {
                moves.push((cords + i) - 52)
            }
            else { moves.push(cords + i) }
            finalElements.forEach(elem => {
                if (elem.classList[1].includes(piece.classList[1])) {
                    if ((cords + i) > elem.id.slice(1) && (cords <= elem.id.slice(1))) {
                        final_moves.push(`c_${final_num}_${elem.classList[2]}`)
                        moves.pop()
                        final_num++
                        centre_flag = true
                    }
                }
            })
        }
    }
    final_num = 1;

    let lastPlace = moves.slice(-1)
    let flag = false
    //preventing hit when piece on home element
    homeElements.forEach(element => {
        if (document.getElementById(`S${lastPlace[0]}`) == element) {
            flag = true
        }

    })
    //hitting enemy piece
    if (!centre_flag && !flag && (document.getElementById(`S${lastPlace[0]}`).childNodes[0]) && !(document.getElementById(`S${lastPlace[0]}`).childNodes[0].classList[1] == piece.classList[1])) {
        let enemy_pieces = Array.from(document.getElementById(`S${lastPlace[0]}`).childNodes);
        enemy_pieces.forEach(element => {
            eval(`${element.classList[1]}_block`).forEach(bloc => {
                if (!(bloc.childNodes[0])) { bloc.appendChild(element) }
            })
        })
    }
    // moving piece
    for (let move of moves) {
        let place = document.getElementById(`S${move}`)
        place.appendChild(piece)
    }
    for (let move of final_moves) {
        let place = document.getElementById(move)
        place.appendChild(piece)
    }
    // after piece is moved if dice is not 6 then change turn else don't
    !(dice_num == 6) ? Turn_change() : eval(`btn_${turn_btn[turn]}`).disabled = false

    dice_img.setAttribute("src", " ")

    //win
    if (eval(`${piece.classList[1]}_win`).childNodes.length == 4) {
        btn.forEach(button => {
            button.disabled = true
        })
        pieces.forEach(ele => {
            ele.removeEventListener("click", movement_rule)
        })
        dice.innerHTML = piece.classList[1] + " won"
        dice.style.background = piece.classList[1]
        dice.style.width = "175%"
        dice.style.height = "45%"
        dice.style.borderRadius = "5px"
        dice.style.boxShadow = "0 0 1px black, 0 0 2px black"
    }
}

//function to specify how to move according to the dice number
function movement_rule(piece) {
    if (piece.target.classList[1] == "green") { homeElement = S48 }
    else if (piece.target.classList[1] == "yellow") { homeElement = S9 }
    else if (piece.target.classList[1] == "blue") { homeElement = S22 }
    else if (piece.target.classList[1] == "red") { homeElement = S35 }
    // dice_num = 5
    if (dice_num == 6) {
        if (piece.target.parentElement.classList.contains("square")) {
            piece_move(piece.target, homeElement)
            pieces.forEach(element => {
                element.removeEventListener("click", movement_rule)
            })
        }
        else if (piece.target.parentElement.classList.contains("block")) {
            homeElement.appendChild(piece.target)
            eval(`btn_${turn_btn[turn]}`).disabled = false
        }
        pieces.forEach(element => {
            element.removeEventListener("click", movement_rule)
        })
    }
    else {
        if (piece.target.parentElement.classList.contains("square")) {
            piece_move(piece.target, homeElement)
            pieces.forEach(element => {
                element.removeEventListener("click", movement_rule)
            })
        }
    }
}

//function to create event listeners
function piece_movement(the_pieces, the_block) {
    // to help the players if they are stuck with all pieces in the base blocks
    if ((Number_of_roll >= 20 && Number_of_roll <= 27) && (the_block.every(block => block.childNodes[0]))) {
        if (dice_num == 4) {
            dice_num = 6
        }
        if (dice_num == 5) {
            dice_num = 6
        }
    }
    if ((Number_of_roll >= 31) && (the_block.every(block => block.childNodes[0]))) {
        if (dice_num == 5) {
            dice_num = 6
        }
    }
    //if all the pieces are at the base and dice is not 6 then change turn 
    dice_img.setAttribute("src", `img/dice-${dice_num}.png`)
    let move_flag = false
    if ((the_block.every(block => block.childNodes[0])) && (dice_num != 6)) {
        setTimeout(() => {
            dice_img.setAttribute("src", " ")
        }, 500);
        Turn_change()
    }
    else if (dice_num != 6) {
        the_block.forEach(blocc => {
            if (blocc.childNodes[0] && blocc.parentElement.classList[0].includes("win")) { move_flag = true }
        })
        if (move_flag) { Turn_change() }
    }
    the_pieces.forEach(piece => {
        piece.addEventListener("click", movement_rule)
    })
}
// function for click on the buttons
btn.forEach(the_button => {
    //disable each button and enable the one which has it's turn
    btn.forEach(button => {
        button.disabled = true
    })
    eval(`btn_${turn_btn[turn]}`).disabled = false

    the_button.onclick = () => {

        Number_of_roll++
        dice_num = Math.floor(Math.random() * 60) + 1
        // more chance to get 6 initially for all the players to start their game
        if (Number_of_roll <= 16) {
            if (dice_num <= 9 && dice_num > 0) { dice_num = 1 }
            else if (dice_num <= 18 && dice_num > 9) { dice_num = 2 }
            else if (dice_num <= 27 && dice_num > 18) { dice_num = 3 }
            else if (dice_num <= 36 && dice_num > 27) { dice_num = 4 }
            else if (dice_num <= 45 && dice_num > 36) { dice_num = 5 }
            else if (dice_num <= 60 && dice_num > 45) { dice_num = 6 }
        }
        else {
            if (dice_num <= 10 && dice_num > 0) { dice_num = 1 }
            else if (dice_num <= 20 && dice_num > 10) { dice_num = 2 }
            else if (dice_num <= 30 && dice_num > 20) { dice_num = 3 }
            else if (dice_num <= 40 && dice_num > 30) { dice_num = 4 }
            else if (dice_num <= 50 && dice_num > 40) { dice_num = 5 }
            else if (dice_num <= 60 && dice_num > 50) { dice_num = 6 }
        }
        // after clicking the button disable all buttons
        btn.forEach(button => {
            button.disabled = true
        })

        if (turn == 1) {
            piece_movement(green_pieces, green_block)
        }
        else if (turn == 2) {
            piece_movement(yellow_pieces, yellow_block)
        }
        else if (turn == 3) {
            piece_movement(blue_pieces, blue_block)
        }
        else if (turn == 4) {
            piece_movement(red_pieces, red_block)
        }
    }
})