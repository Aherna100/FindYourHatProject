const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.hat = this.playerHat(hat);
        this.holes = this.counter(hole);
    }

    print() {
        let obj = this.field;
        for (let i = 0; i < obj.length; i++) {
            console.log(obj[i].join(''));
        }
    }

    counter(tiles) {
        let field = this.field;
        let fileH = [];
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                let item = field[i][j];
                if (item === tiles) {
                    fileH.push([[i], [j]]);
                }
            }
        }
        return fileH;
    }

    playerHat(obj) {
        let field = this.field;
        let loc = [];
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                let bus = field[i][j];
                if (obj === bus) {
                    loc.push(i, j)
                }
            }
        } return loc;
    }

    verifyH(cor, cors) {
        let obj = cor.concat(cors);
        let hatTest = this.hat;
        if (obj[0] === hatTest[0] && obj[1] === hatTest[1]) {
            return true;
        } else {
            return false;
        }
    }

    verifyF(cor, cors) {
        let holTest = this.holes;

        for (let i = 0; i < holTest.length; i++) {
            let iObj = holTest[i];
            if (cor[0] === iObj[0][0] && cors[0] === iObj[1][0]) {
                return false;
            } else {
                return true;
            }
        }
    }

    game() {
        let field = this.field;

        this.print();

        let gameFinish = false;

        do {

            let ch = this.playerHat(pathCharacter);

            let vPos = ch[0];
            let hPos = ch[1];

            let userI = prompt('Enter your input ');

            switch (userI) {
                case "u":
                    let nexU = field[vPos - 1];
                    if (nexU != undefined) {
                        let i = this.verifyH([vPos - 1], [hPos]);
                        if (i) {
                            console.log("Congrats you find the hat");
                            return gameFinish = true;
                        } else {
                            let j = this.verifyF([vPos - 1], [hPos]);
                            if (j) {
                                field[vPos - 1][hPos] = pathCharacter;
                                field[vPos][hPos] = fieldCharacter;
                                this.print();
                            } else {
                                this.gameOver();
                            }
                        }
                    } else {
                        console.log("Outside the field, Try Again");
                    }
                    break;
                case "d":
                    let nexD = field[vPos + 1];
                    if (nexD != undefined) {
                        let i = this.verifyH([vPos + 1], [hPos]);
                        if (i) {
                            console.log("Congrats you find the hat");
                            return gameFinish = true;
                        } else {
                            let j = this.verifyF([vPos + 1], [hPos]);
                            if (j) {
                                field[vPos + 1][hPos] = pathCharacter;
                                field[vPos][hPos] = fieldCharacter;
                                this.print();
                            } else {
                                this.gameOver();
                            }
                        }
                    } else {
                        console.log("Outside the field, Try Again");
                    }
                    break;
                case "l":
                    let nexL = field[hPos - 1];
                    if (nexL != undefined) {
                        let i = this.verifyH([vPos], [hPos - 1]);
                        if (i) {
                            console.log("Congrats you find the hat");
                            return gameFinish = true;
                        } else {
                            let j = this.verifyF([vPos], [hPos - 1]);
                            if (j) {
                                field[vPos][hPos - 1] = pathCharacter;
                                field[vPos][hPos] = fieldCharacter;
                                this.print();
                            } else {
                                this.gameOver();
                            }
                        }
                    } else {
                        console.log("Outside the field, Try Again");
                    }
                    break;
                case "r":
                    let nexR = field[hPos + 1];
                    if (nexR != undefined) {
                        let i = this.verifyH([vPos], [hPos + 1]);
                        if (i) {
                            console.log("Congrats you find the hat");
                            gameFinish = true;
                        } else {
                            let j = this.verifyF([vPos], [hPos + 1]);
                            if (j) {
                                field[vPos][hPos + 1] = pathCharacter;
                                field[vPos][hPos] = fieldCharacter;
                                this.print();
                            } else {
                                this.gameOver();
                            }
                        }
                    } else {
                        console.log("Outside the field, Try Again");
                    }
                    break;

                    break;
                default:
                    break;
            }

        } while (!gameFinish);



    }

    gameOver() {
        console.log('Game Over \nPress any key to exit');
    }

    movement(userInput) {
        let field = this.field;
        const ch = this.counter(pathCharacter);

        let hPosi = ch[0][0];
        let vPosi = ch[1][0];

        if (userInput === 'u') {
            if (field[hPosi[0] - 1][vPosi] != undefined && field[hPosi[0] - 1][vPosi] != hole) {
                field[hPosi][vPosi] = '░';
                field[hPosi[0] - 1][vPosi] = '*';
                return true;
            } else {
                this.gameOver('out');
            }

        } else if (userInput === 'd') {
            if (field[hPosi[0] + 1][vPosi] != undefined && field[hPosi[0] + 1][vPosi] != hole) {
                field[hPosi][vPosi] = '░';
                field[hPosi[0] + 1][vPosi] = '*';
                return true;
            } else {
                this.gameOver('out');
            }
        } else if (userInput === 'l') {

            if (field[hPosi][vPosi[0] - 1] != undefined && field[hPosi][vPosi[0] - 1] != hole) {
                field[hPosi][vPosi] = '░';
                field[hPosi][vPosi[0] - 1] = '*';
                return true;
            }
            else {
                this.gameOver('out');
            }
        } else if (userInput === 'r') {

            if (field[hPosi][vPosi[0] + 1] != undefined && field[hPosi][vPosi[0] + 1] != hole) {
                field[hPosi][vPosi] = '░';
                field[hPosi][vPosi[0] + 1] = '*';
                return true;
            } else if (field[hPosi][vPosi[0] + 1] === hole) {
                this.gameOver('fall');
                return false;
            } else {
                this.gameOver('out');
                return false;
            }
        } else {
            this.startOver(userInput);
        }
    }
}

const myField = new Field([
    ['*', '░', '░'],
    ['░', 'O', '░'],
    ['O', '^', '░'],
]);

console.log(myField.game());