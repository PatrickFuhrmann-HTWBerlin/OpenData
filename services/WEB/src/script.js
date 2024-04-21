// public/script.js

// public/script.js

const BASE_URI = "/forward/api/people"

const msgfield = document.getElementById('message') ;

// create the header of the tabl
const table = document.getElementById('data-table');

/*
    // Optionally, recreate the header if needed
    const header = table.createTHead();
    const row = header.insertRow(0);
    let cell;

    // Assuming we know the headers or they are passed in some way
    const headers = ['given Name', 'Name', 'Birthday']; 
    headers.forEach(headerText => {
        cell = row.insertCell();
        cell.textContent = headerText;
    });
*/


function setMessage(msg){
    msgfield.innerHTML = msg ;
}
function clearMessage(){
  setMessage("")
} 

function addPersonEvent( event ) {

    event.preventDefault();

    clearMessage() ;

    const name      = document.getElementById('add.name').value;
    const givenName = document.getElementById('add.givenName').value;
    const birthday  = document.getElementById('add.birthday').value;

    const account_details = JSON.stringify( { name, givenName, birthday } ) 

    console.log( "Account to be inserted : ", account_details )

    fetch( BASE_URI , 
          {
            method:  'POST', 
            headers: { 'Content-Type': 'application/json' } ,
            body:    account_details 
          } ,
    )
    .then(response => {
       ret = response.json()
       console.log("Response : "+ret)
       return ret 
    } )
    .then(data => {
        setMessage(JSON.stringify(data));
        console.log(data);
    })
    .catch(error => {
        console.error('Error adding person:', error);
        setMessage('Failed to add a person.'+error);
    });

}

function renderList(data){

  const results = document.getElementById('results');
  results.innerHTML = '';  // Clear previous results
  data.forEach(person => {
      const li = document.createElement('li');
      li.textContent = `Name: ${person.givenName} ${person.name}, Birthday: ${person.birthday}`;
      results.appendChild(li);
  });
}
function clearTable( ){
    const table = document.getElementById('data-table');
    let rowCount = table.rows.length;

    // Start at 1 to skip the header row
    for (let i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }   
}
function renderTable(data){

  const results = document.getElementById('data-table');
  
  clearTable()

  data.forEach(person => {
      const tr = document.createElement('tr');
      var td = document.createElement('td') ;
      td.textContent = person.givenName ;
      tr.appendChild(td);      
      td = document.createElement('td') ;
      td.textContent = person.name ;
      tr.appendChild(td);      
      td = document.createElement('td') ;
      td.textContent = person.birthday.substring(0,10) ; ;
      tr.appendChild(td);
      results.appendChild(tr);
  });
}
function searchPersonEvent(event) {
    event.preventDefault();

    clearMessage() ;
    clearTable()

    const name      = document.getElementById('search.name').value;
    const givenName = document.getElementById('search.givenName').value;
    const birthday  = document.getElementById('search.birthday').value;

    var query = ""
    if( name != "" )query = "name="+name + "&"
    if( givenName != '' )query = query + "givenName="+givenName + "&"
    if( birthday != '' )query = query + "birthday="+birthday

    // encodedURI = encodeURIComponent(query)

    // console.log(query)
    // console.log(encodedURI)
    
    URLstring=""
    if( query == '' ){
      URLstring=BASE_URI
    }else{
      URLstring=`${BASE_URI}?${query}`
    }
    console.log(URLstring)
    fetch(URLstring)
    .then(response => response.json())
    .then( data => renderTable(data) )
    .catch(error => {
        console.error('Error searching for people:',error);
//        alert('Failed to search for people.');
    });
}
function removePersonEvent(event) {
  event.preventDefault();

  const name      = document.getElementById('remove.name').value;
  const givenName = document.getElementById('remove.givenName').value;
  const birthday  = document.getElementById('remove.birthday').value;

  var query = ""
  if( name != "" )query = "name="+name + "&"
  if( givenName != '' )query = query + "givenName="+givenName + "&"
  if( birthday != '' )query = query + "birthday="+birthday

  // encodedURI = encodeURIComponent(query)

  console.log(query)
  // console.log(encodedURI)
  
  URLstring=`${BASE_URI}?${query}`
  
  console.log(URLstring)
  fetch(   URLstring, 
           { method:  'DELETE' }
       )
  .then(response => {
            return response.json() 
         }
       )
  .then( 
         data => setMessage(JSON.stringify(data))
       )
  .catch(error => {
      console.error('Error searching for people:',error);
//        alert('Failed to search for people.');
  });
}
document.getElementById('addPersonForm').addEventListener('submit', addPersonEvent );
document.getElementById('searchPeopleForm').addEventListener('submit', searchPersonEvent ) ;
document.getElementById('removePersonForm').addEventListener('submit', removePersonEvent ) ;


