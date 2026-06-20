function translateText() {
  let text = document.getElementById("inputText").value;
  let sourceLang = document.getElementById("sourceLang").value;
  let targetLang = document.getElementById("targetLang").value;

  if (text.trim() === "") {
    document.getElementById("outputText").innerText = "Please enter text!";
    return;
  }

  let url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById("outputText").innerText = data.responseData.translatedText;
    })
    .catch(error => {
      document.getElementById("outputText").innerText = "Error: " + error;
    });
}

function copyText() {
  let output = document.getElementById("outputText").innerText;
  navigator.clipboard.writeText(output);
  alert("Copied to clipboard!");
}

function speakText() {
  let output = document.getElementById("outputText").innerText;
  let speech = new SpeechSynthesisUtterance(output);
  speech.lang = document.getElementById("targetLang").value;
  window.speechSynthesis.speak(speech);
}
