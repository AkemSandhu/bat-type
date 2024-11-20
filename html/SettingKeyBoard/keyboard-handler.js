var mode = 'enter'
const head = document.getElementById('head')
const Current = document.getElementById('Current')
const New = document.getElementById('New')

const Keys = localStorage.getItem('Keys')
var soundBase = ['Grave', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Zero', 'Hyphen', 'Equal', 'Backspace', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'Open Bracket', 'Close Bracket', 'Pipe', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Semicolon', "Single Quote", 'Double  Quote', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Comma', 'Dot', 'Slash', 'Asterisk', 'Addition', 'Exclamation', 'At', 'Pound', 'Dollar Sign', 'Percent', 'Carat', 'And', 'Left Bracket', 'Right Bracket', 'Underscore', 'Open Brace', 'Close Brace', 'Backslash', 'Colon', 'Less Than', 'Greater Than', 'Question Mark', 'Tilde', 'Space bar', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
if (localStorage.getItem('soundBase')!=null){
    soundBase = localStorage.getItem('soundBase');
    console.log('get')
}


document.addEventListener("DOMContentLoaded", function () {
    console.log(101)
});

document.addEventListener("keydown", e =>{
    if (mode == 'enter'){
        let utterance = new SpeechSynthesisUtterance("Choose a key to change it's audio or press escape to leave");
        speechSynthesis.speak(utterance);
        utterance.onend = () => {
            mode = 'selection'; // Change mode to 'selection' after the utterance ends
        };
    }
    if (e.key === "Escape") {
        window.location.href = "https://www.example.com"; // Replace with your specific URL
    }
})

if ('speechSynthesis' in window) {
    
    console.log('supported')
    document.addEventListener('keydown', e => {
        console.log(mode)
        if (mode == 'selection'){
            console.log(e.key)
            const speech = new SpeechSynthesisUtterance(soundBase[Keys.indexOf(e.key)]);
            speech.rate = 1.2
            if (soundBase[Keys.indexOf(e.key)] != 'undefined') {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
            speech.lang = "en-US";
            window.speechSynthesis.speak(speech);
            console.log('speaking')
            speech.onend = ()=>{
                mode = 'changing'
                
            }
            }
    }
    if (mode == 'changing'){
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        let utterance = new SpeechSynthesisUtterance("press enter to start recodring");
        speechSynthesis.speak(utterance);
        utterance.onend = () =>{
            mode = 'record'
        }
    }
    if (e.key == 'enter'){
        if (mode == 'record'){

            let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            let isListening = false;

            // Set up the recognition event handlers
            recognition.onresult = (event) => {
                console.log(event.results)
                
            };

            recognition.onend = () => {
                isListening = false; // Mark listening as false when recognition ends
            };

            if (isListening) {
                recognition.stop(); // Stop recognition if it's currently listening
            } else {
                recognition.start(); // Start recognition if it's not listening
                isListening = true; // Mark it as listening
            }
        }
    }
    
  })
  // Speech Synthesis supported 🎉
} else {
  // Speech Synthesis Not Supported 😣
  alert("Sorry, your browser doesn't support text to speech!");
}


