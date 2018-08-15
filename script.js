const bank = [
    'fool',
    'thing',
    'food',
    'lunch'
]

let gameInstance = {
    attemptsRemaining: 2,
    word: '',
    wordInArray: [],
    inProcessWordArray: [],
    wrongLetters: [],
    gamesWon: 0
}

onLoad = () => {
    gameInstance.word = bank[Math.floor(Math.random() * bank.length)]
    console.log('*-*-*-* Chosen Word:', gameInstance.word, '*-*-*-*')
    printToDom(gameInstance.attemptsRemaining, '.attempts-remaining', 'string')
    printToDom(gameInstance.wrongLetters, '.wrong-letters', 'string')
    generateBlankArray(gameInstance.word)
}

generateBlankArray = (word) => {
    gameInstance.wordInArray = gameInstance.word.split('')
    for (let i = 0; i < gameInstance.wordInArray.length; i++) {
        gameInstance.inProcessWordArray[i] = '_'
    }
    printToDom(gameInstance.inProcessWordArray, '.word', 'array')
}

document.onkeyup = (event) => {
    printToDom('', '.failure', 'string')
    checkWordForLetter(event.key)
}

checkWordForLetter = (letter) =>{
    let letterFound = false
    for(let i = 0; i < gameInstance.wordInArray.length; i++){
        if(letter === gameInstance.wordInArray[i]){
            letterFound = true
            gameInstance.inProcessWordArray[i] = letter
        }
    }
    if(!letterFound){
        gameInstance.attemptsRemaining = gameInstance.attemptsRemaining - 1;
        gameInstance.wrongLetters.push(letter);
        printToDom(gameInstance.attemptsRemaining, '.attempts-remaining', 'string');
        printToDom(gameInstance.wrongLetters, '.wrong-letters', 'string');
        checkEndFailure()
    }
    printToDom(gameInstance.inProcessWordArray, '.word', 'array')
    checkEndWin()
}

checkEndFailure = () => {
    if(gameInstance.attemptsRemaining === 0){
        printToDom('You are terrible at this.  I guess try again...', '.failure', 'string')
        reloadGame()
    }
}

checkEndWin = () => {
    if(gameInstance.inProcessWordArray.indexOf('_') < 0){
        gameInstance.gamesWon += 1
        let countdown = 4;
        let interval = setInterval(function(){
            printToDom("Oh boy now you're going to get an ego " + --countdown, '.failure', 'string')

            if(countdown <= 0){
                clearInterval(interval)
                reloadGame()
            }
        }, 1000)
        printToDom(gameInstance.gamesWon, '.wins', 'string')
    }
}

reloadGame = () => {
    gameInstance = {
        ...gameInstance,
        attemptsRemaining: 2,
        word: '',
        inProcessWordArray: [],
        wordInArray: [],
        wrongLetters: [],
    }
    onLoad()
}

printToDom = (input, element, type) => {
    switch(type) {
        case 'array':
            document.querySelector(element).innerHTML = input.join(' ')
            break;
        case 'string':
            document.querySelector(element).innerHTML = input
    }
}

onLoad()

