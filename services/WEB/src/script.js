// public/script.js

async function addAndConvertText() {

  var input        = document.getElementById('inputText');
  var inputToUpper = document.getElementById('inputTextToUpper');
  var output       = document.getElementById('output');

  if (inputToUpper.value.trim() !== '') {
    try {
 //     const response = await fetch('/toupper', {
        const response = await fetch('http://localhost:3000/toupper', {
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
// public/script.js

function addPersonEvent(event) {

    event.preventDefault();

    const name      = document.getElementById('name').value;
    const givenName = document.getElementById('givenName').value;
    const birthday  = document.getElementById('birthday').value;

    console.log("Elements found : ",name,givenName);

    fetch("http://localhost:3000/api/people" ,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, givenName, birthday }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Person added successfully!');
        console.log(data);
    })
    .catch(error => {
        console.error('Error adding person:', error);
        alert('Failed to add a person.'+error);
    });

}


function searchPersonEvent(event) {
    event.preventDefault();
    const query = document.getElementById('searchQuery').value;

    encodedURI = encodeURIComponent(query)
    console.log(encodedURI)
    URLstring=""
    if( encodedURI == '' ){
      URLstring=`http://localhost:3000/api/people`
    }else{
      URLstring=`http://localhost:3000/api/people?name=${encodedURI}`
    }
    console.log(URLstring)
    fetch(URLstring)
    .then(response => response.json())
    .then(data => {
        const results = document.getElementById('results');
        results.innerHTML = '';  // Clear previous results
        data.forEach(person => {
            const li = document.createElement('li');
            li.textContent = `Name: ${person.givenName} ${person.name}, Birthday: ${person.birthday}`;
            results.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error searching for people:');
//        alert('Failed to search for people.');
    });
}

document.getElementById('addPersonForm').addEventListener('submit', addPersonEvent );

document.getElementById('searchPeopleForm').addEventListener('submit', searchPersonEvent ) ;

