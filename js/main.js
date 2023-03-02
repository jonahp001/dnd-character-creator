var $startButton = document.querySelector('.start-button');
var $homePage = document.querySelector('#home-page');
var $characterCreationPage = document.querySelector('#character-creation-page');
var $h1TitleText = document.querySelector('h1');

var $selectARace = document.querySelector('#select-a-race');
var $raceCaret = document.querySelector('#race-caret');
var $raceIcons = document.querySelector('#race-icons');

$startButton.addEventListener('click', function (event) {
  $homePage.setAttribute('class', 'hidden');
  $characterCreationPage.setAttribute('class', '');
});

// CODE BELOW SUBJECT TO CHANGE
$h1TitleText.addEventListener('click', function (event) {
  $homePage.setAttribute('class', '');
  $characterCreationPage.setAttribute('class', 'hidden');
});

$selectARace.addEventListener('click', function (event) {
  if (event.target.getAttribute('class') === 'character-h2') {
    $selectARace.setAttribute('class', 'character-h2-expanded');
    $raceCaret.setAttribute('class', 'fa-solid fa-caret-down');
    $raceIcons.setAttribute('class', 'pic-section');
  } else if (event.target.getAttribute('class') === 'character-h2-expanded') {
    $selectARace.setAttribute('class', 'character-h2');
    $raceCaret.setAttribute('class', 'fa-solid fa-caret-left');
    $raceIcons.setAttribute('class', 'pic-section hidden');
  }
});
