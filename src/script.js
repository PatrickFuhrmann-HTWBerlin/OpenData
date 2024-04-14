// public/script.js
async function addAndConvertText() {
  var input = document.getElementById('inputText');
  var inputToUpper = document.getElementById('inputTextToUpper');
  var output = document.getElementById('output');

  if (inputToUpper.value.trim() !== '') {
    try {
      const response = await fetch('/toupper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputToUpper.value })
      });
      const data = await response.json();
      if (response.ok) {
        output.value += data.result + '\n';
        inputToUpper.value = ''; // Clear the input field after adding
      } else {
        console.error('Error from server:', data);
      }
    } catch (error) {
      console.error('Failed to convert text:', error);
    }
  }

  if (input.value.trim() !== '') {
    output.value += input.value + '\n';
    input.value = ''; // Clear the input field after adding
  }
}
