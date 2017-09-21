$(document).ready(function() {
    var MOV_INDEX;

    makeBoard();
    setMover();
    resetMovIndex();

});

var MOVES = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
}

var CUR_DIR = MOVES.DOWN;

var CUR_POS = 4;


/* left = 37
up = 38
right = 39
down = 40 */

function makeBoard() {
    var board = $('.wrapper');

    for (var i = 0; i < 32 * 4; i++) {
        board.append(`<div class="${ i==CUR_POS ? 'cell lord-down-0':'cell' }" id=${i}></div>`);
    }

}


function resetMovIndex() {
    MOV_INDEX = 0;
}


function setMover() {
    $(document).keydown(moveHandler);
}

// keyboard key handing logic.
function moveHandler(e) {
    switch (e.which) {
        case 38:
            move(MOVES.UP);
            break;
        case 40:
            move(MOVES.DOWN);
            break;
        case 37:
            move(MOVES.LEFT)
            break;
        case 39:
            move(MOVES.RIGHT);
            break;
        default:
            console.log('wrong key press');
            break;
    }
}

function move(direction) {
    document.getElementById(CUR_POS).className = 'cell';
    addClass(direction)


}


function addClass(direction) {

    switch (direction) {

        case MOVES.UP:
            if (CUR_DIR === MOVES.UP) {
                var className = `cell lord-up-${MOV_INDEX+1}`;
                MOV_INDEX += 1;
                if (MOV_INDEX === 4)
                    resetMovIndex();
                document.getElementById((CUR_POS - 8)).className = className;
            } else {
                resetMovIndex();
                CUR_DIR = MOVES.UP;
                document.getElementById((CUR_POS - 8)).className = `cell lord-up-${MOV_INDEX}`;
            }
            CUR_POS -= 8;
            break;

        case MOVES.DOWN:
            if (CUR_DIR === MOVES.DOWN) {
                var className = `cell lord-down-${MOV_INDEX+1}`;
                MOV_INDEX += 1;
                if (MOV_INDEX === 4)
                    resetMovIndex();
                document.getElementById((CUR_POS + 8)).className = className;
            } else {
                resetMovIndex();
                CUR_DIR = MOVES.DOWN;
                document.getElementById((CUR_POS + 8)).className = `cell lord-down-${MOV_INDEX}`;
            }
            CUR_POS += 8;
            break;

        case MOVES.LEFT:
            if (CUR_DIR === MOVES.LEFT) {
                var className = `cell lord-left-${MOV_INDEX+1}`;
                MOV_INDEX += 1;
                if (MOV_INDEX === 4)
                    resetMovIndex();
                document.getElementById((CUR_POS - 1)).className = className;
            } else {
                resetMovIndex();
                CUR_DIR = MOVES.LEFT;
                document.getElementById((CUR_POS - 1)).className = `cell lord-left-${MOV_INDEX}`;
            }
            CUR_POS -= 1;
            break;


        case MOVES.RIGHT:
            if (CUR_DIR === MOVES.RIGHT) {
                var className = `cell lord-right-${MOV_INDEX+1}`;
                MOV_INDEX += 1;
                if (MOV_INDEX === 4)
                    resetMovIndex();
                document.getElementById((CUR_POS + 1)).className = className;
            } else {
                resetMovIndex();
                CUR_DIR = MOVES.RIGHT;
                document.getElementById((CUR_POS + 1)).className = `cell lord-right-${MOV_INDEX}`;
            }
            CUR_POS += 1;
            break;
    }

}