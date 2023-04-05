 
 const msg = new SpeechSynthesisUtterance();

/*  The SpeechSynthesisUtterance interface of the Web Speech API represents a speech request. 
It contains the content the speech service should read and information about how to read it 
(e.g. language, pitch and volume.)  

The Web Speech API enables you to incorporate voice data into web apps. 
The Web Speech API has two parts: 
SpeechSynthesis (Text-to-Speech), and SpeechRecognition (Asynchronous Speech Recognition.)
*/


  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');
  msg.text = document.querySelector('[name="text"]').value;

  function populateVoices() {
    voices = this.getVoices();                //Returns a list of SpeechSynthesisVoice objects representing all the available voices on the current device.
    voicesDropdown.innerHTML = voices
      .filter(voice => voice.lang.includes('en'))            //filtering english language voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    //voice property of the SpeechSynthesisUtterance interface gets and sets the voice that will be used to speak the utterance.

    toggle();
  }

  function toggle(startOver = true) {
    speechSynthesis.cancel();                         //Removes all utterances from the utterance queue.
    if (startOver) {
      speechSynthesis.speak(msg);                 //Adds an utterance to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.
    }
  }

  function setOption() {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
  }

  speechSynthesis.addEventListener('voiceschanged', populateVoices);  
  /*  Fired when the list of SpeechSynthesisVoice objects that would be returned by 
  the SpeechSynthesis.getVoices() method has changed.     */
  
  voicesDropdown.addEventListener('change', setVoice);
  //The change event is fired for <input>, <select>, and <textarea> elements when the user modifies the element's value
 
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', toggle);
  stopButton.addEventListener('click', () => toggle(false));
