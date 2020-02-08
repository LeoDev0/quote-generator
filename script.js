const bodyElement = document.querySelector('body');
const randomBtn = document.getElementById('random-quote');
const authorBtn = document.getElementById('author-quote');
const quoteElement = document.querySelector('.quote q');
const authorElement = document.querySelector('.author');
const containerDiv = document.getElementsByClassName('container')[1];
const selectElem = document.querySelector('select');

// https://cors-anywhere.herokuapp.com/

function generateQuote() {
  fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      quoteElement.innerHTML = data.content;
      authorElement.innerHTML = "- " + data.author;
    })
    .catch(function(error) {
      console.warn(error);
    });
}

generateQuote();
randomBtn.addEventListener('click', generateQuote);


function getQuotesFromAuthor(id) {
  var preApi = 'https://api.quotable.io/authors/';
  var api = preApi + id + '/';
  fetch(api)
  .then(response => response.json())
  .then(data => {
    for (var i = 0; i < data.quotes.length; i++) {
      var pElem = document.createElement('p');
      var qElem = document.createElement('q');
      var text = document.createTextNode(data.quotes[i].content);
      qElem.appendChild(text);
      pElem.setAttribute('class', 'quotes-from-author');
      pElem.appendChild(qElem);
      containerDiv.appendChild(pElem);

      var hrElem = document.createElement('hr');
      hrElem.setAttribute('class', 'hr-for-author-quotes');
      containerDiv.appendChild(hrElem);
    }
  })
  .catch(function(error) {
    console.warn(error);
  });
}

function removeQuotes() {
  var pElem = document.querySelectorAll('p.quotes-from-author');
  var hrElem = document.getElementsByClassName('hr-for-author-quotes');
  for (var i = 0; i < pElem.length; i++) {
    pElem[i].parentNode.removeChild(pElem[i]);
  }

  while (containerDiv.contains(hrElem[0])) {
    hrElem[0].parentNode.removeChild(hrElem[0]);
  }
}

// Gera as citações do author selecionado e apaga as citações anteriormente renderizadas
authorBtn.addEventListener('click', function() {
  if (containerDiv.contains(document.getElementsByClassName('quotes-from-author')[0])) {
    removeQuotes();
  }

  var authorId = selectElem.value;
  getQuotesFromAuthor(authorId);
});


// Gera as tags <option> dentro do <select> com os nomes e id dos autores
fetch('https://api.quotable.io/authors/')
  .then(response => response.json())
  .then(data => {
    for (var i = 0; i < data.results.length; i++) {
      var optionElem = document.createElement('option');
      var authorName = document.createTextNode(data.results[i].name);
      optionElem.appendChild(authorName);
      optionElem.setAttribute('value', data.results[i]._id);
      selectElem.appendChild(optionElem);
    }
  });
