const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.hat = this.counter(hat);
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
                if (tiles === hole) {
                    if (item === tiles) {
                        fileH.push([[i], [j]]);
                    }
                } else {
                    if (item === tiles) {
                        fileH.push(i, j);
                    }
                }
            }
        }
        return fileH;
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
        const funcT = (el) => {
            if (el[0][0] === cor[0] && el[1][0] === cors[0]) {
                return true;
            } else {
                return false;
            }
        }

        return holTest.some(funcT);
    }

    game() {
        let field = this.field;

        console.log('Enter your input \n u: up\n d: down\n l: left\n r: right\n');

        this.print();
        let gameFinish = false;

        do {

            let ch = this.counter(pathCharacter);

            let vPos = ch[0];
            let hPos = ch[1];

            let userI = prompt('Enter your input: ');

            switch (userI) {
                case "u":
                    let nexU = field[vPos - 1];
                    if (nexU != undefined) {
                        let i = this.verifyH([vPos - 1], [hPos]);
                        if (i) {
                            console.log("Congrats you find the hat");
                            gameFinish = true;
                        } else {
                            let j = this.verifyF([vPos - 1], [hPos]);
                            if (!j) {
                                field[vPos - 1][hPos] = pathCharacter;
                                field[vPos][hPos] = fieldCharacter;
                                this.print();
                            } else {
                                gameFinish = this.gameOver();
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
                            gameFinish = true;
                        } else {
                            let j = this.verifyF([vPos + 1], [hPos]);
                            if (!j) {
                                field[vPos + 1][hPos] = pathCharacter;
                                field[vPos][hPos] = fieldCharacter;
                                this.print();
                            } else {
                                gameFinish = this.gameOver();
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
                            gameFinish = true;
                        } else {
                            let j = this.verifyF([vPos], [hPos - 1]);
                            if (!j) {
                                field[vPos][hPos - 1] = pathCharacter;
                                field[vPos][hPos] = fieldCharacter;
                                this.print();
                            } else {
                                gameFinish = this.gameOver();
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
                            if (!j) {
                                field[vPos][hPos + 1] = pathCharacter;
                                field[vPos][hPos] = fieldCharacter;
                                this.print();
                            } else {
                                gameFinish = this.gameOver();
                            }
                        }
                    } else {
                        console.log("Outside the field, Try Again");
                    }
                    break;
                default:
                    console.log("Press the correct Key");
                    gameFinish = this.gameOver();
                    break;
            }

        } while (!gameFinish);



    }

    gameOver() {
        let uI = prompt('Game Over fall in a Hole \nPress any key to exit\nPress p to continue the game\n');
        if (uI = 'p') {
            this.game();
        } else {
            return true;
        }
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

    static generateField(width, height, nHoles) {
        let nField = [];
        let holes = 0;

        for (let i = 0; i < height; i++) {
            nField.push([]);
            for (let j = 0; j < width; j++) {
                nField[i].push(fieldCharacter);
            }

        }

        while (holes < nHoles) {
            let x = Math.floor(Math.random() * (width - 1));
            let y = Math.floor(Math.random() * (height - 1));

            let test = nField[x][y];
            if (test != undefined) {
                nField[x][y] = hole;
            }
            holes++;
        }

        let x = Math.floor(Math.random() * (width - 1));
        let y = Math.floor(Math.random() * (height - 1));
        nField[x][y] = hat;

        for (let i = 0; i < 1; i++) {
            let x = Math.floor(Math.random() * (width - 1));
            let y = Math.floor(Math.random() * (height - 1));
            nField[x][y] = pathCharacter;
        }

        return this.field = nField;
    }
}

const myField = new Field([
    ['░', 'O', '░'],
    ['O', '*', '░'],
    ['░', '░', '^'],
]);

const nField = new Field(Field.generateField(5, 5, 6));

console.log(nField.game());