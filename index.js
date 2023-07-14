let word = document.querySelector('.word');

let words_list = ["javascript", "python", "computer", "technology", "software", "programming", "application", "algorithm"];
let random_index = Math.floor(Math.random() * 8);
let random_word = words_list[random_index];
let press_word = [];

let head = document.querySelector('.head');
let body = document.querySelector('.body');
let left_hand = document.querySelector('.left_hand');
let right_hand = document.querySelector('.right_hand');
let left_leg = document.querySelector('.left_leg');
let right_leg = document.querySelector('.right_leg');
let wrong_letter_count = 0;

let game_over = document.querySelector('.game_over');
let game_over_content = document.querySelector('.game_over_content');

function hangman_start() {
    for (let i = 0; i < random_word.split("").length; i++) {
        word.innerHTML += ` <span class="letter"></span>`
    }
}

window.addEventListener("keydown", event => {
    let letter = document.querySelectorAll('.letter');
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        if (random_word.includes(event.key)) {
            if (!press_word.includes(event.key)) {
                press_word.push(event.key);
                random_word.split("").forEach((element, i) => {
                    if (event.key === element) {
                        letter[i].innerHTML = `${event.key}`
                        letter[i].classList.add('correct_guess_color');
                    }
                })
            }
            let correct_guess_color = document.querySelectorAll('.correct_guess_color');
            if (correct_guess_color.length === random_word.split("").length) {
                showNotification("w");
            };
        } else {
            wrong_letter();
        }
    }
})
function wrong_letter() {
    wrong_letter_count += 1;
    switch (wrong_letter_count) {
        case 1:
            head.classList.add('display_feature');
            break;
        case 2:
            body.classList.add('display_feature');
            break;
        case 3:
            left_hand.classList.add('display_feature');
            break;
        case 4:
            right_hand.classList.add('display_feature');
            break;
        case 5:
            left_leg.classList.add('display_feature');
            break;
        case 6:
            right_leg.classList.add('display_feature');
            showNotification("l");
    }
}
function showNotification(state) {
    game_over.style.display = "block";
    if (state === "w") {
        let p = document.createElement("p");
        let text_content = document.createTextNode("You Won! Game Will Restart Soon")
        p.appendChild(text_content);
        game_over_content.appendChild(p)

    } else if (state === "l") {
        let p = document.createElement("p");
        let text_content = document.createTextNode("You Lost! Game Will Restart Soon")
        p.appendChild(text_content);
        game_over_content.appendChild(p)
    }
    setTimeout(() => {
        reset()

    }, 3000);
}
function reset() {
    game_over.style.display = "none";
    head.classList.remove('display_feature');
    body.classList.remove('display_feature');
    left_hand.classList.remove('display_feature');
    right_hand.classList.remove('display_feature');
    left_leg.classList.remove('display_feature');
    right_leg.classList.remove('display_feature');
    game_over_content.innerHTML = ""
    document.querySelectorAll(".letter").forEach(e => e.remove());
    press_word = [];
    wrong_letter_count = 0;
    random_index = Math.floor(Math.random() * 5);
    random_word = words_list[random_index];
    hangman_start();
}
hangman_start();