class SpeechSynthesisApp {
    constructor() {
        this.synth = window.speechSynthesis;
        this.textToSpeak = '';
        this.storyOutput = document.getElementById('storyOutput');
        this.speakButton = document.getElementById('speakButton');
        this.resetButton = document.getElementById('resetButton');

        this.init();
    }

    init() {
        document.getElementById('subjectButton').addEventListener('click', () => this.addToStory('subject'));
        document.getElementById('verbButton').addEventListener('click', () => this.addToStory('verb'));
        document.getElementById('adjectiveButton').addEventListener('click', () => this.addToStory('adjective'));
        document.getElementById('objectButton').addEventListener('click', () => this.addToStory('object'));
        document.getElementById('placeButton').addEventListener('click', () => this.addToStory('place'));
        document.getElementById('generateButton').addEventListener('click', () => this.generateStory());
        this.speakButton.addEventListener('click', () => this.speakNow());
        this.resetButton.addEventListener('click', () => this.resetStory());
    }

    addToStory(category) {
        const randomWord = getRandomWord(category);
        this.textToSpeak += randomWord + ' ';
        this.updateStoryOutput();
    }

    generateStory() {
        this.textToSpeak = getRandomWord('subject') + ' ' +
                          getRandomWord('verb') + ' ' +
                          getRandomWord('adjective') + ' ' +
                          getRandomWord('object') + ' ' +
                          getRandomWord('place');
        this.updateStoryOutput();
    }

    updateStoryOutput() {
        this.storyOutput.textContent = this.textToSpeak;
    }

    resetStory() {
        this.textToSpeak = '';
        this.updateStoryOutput();
    }

    speakNow() {
        const utterThis = new SpeechSynthesisUtterance(this.textToSpeak);
        this.synth.speak(utterThis);
    }
}

function getRandomWord(category) {
    const wordArray = wordCategories[category];
    return wordArray[Math.floor(Math.random() * wordArray.length)];
}

const wordCategories = {
    subject: ['The cat', 'A dog', 'Alice', 'Bob', 'The elephant'],
    verb: ['Ran', 'Jumped', 'Slept', 'Ate', 'Chased'],
    adjective: ['Happy', 'Sad', 'Funny', 'Serious', 'Crazy'],
    object: ['A ball', 'A book', 'A banana', 'A computer', 'A car'],
    place: ['In the park', 'At the beach', 'In the mountains', 'At home', 'In a cave', 'In the city']
};

const app = new SpeechSynthesisApp();
