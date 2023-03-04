var $startButton = document.querySelector('.start-button');
var $homePage = document.querySelector('#home-page');
var $characterCreationPage = document.querySelector('#character-creation-page');
var $h1TitleText = document.querySelector('h1');

var $selectARace = document.querySelector('#select-a-race');
var $raceCaret = document.querySelector('#race-caret');
var $raceIcons = document.querySelector('#race-icons');

var $dragonborn = document.querySelector('#Dragonborn');
var $dragonbornModal = document.querySelector('#dragonborn-modal');
// the following subject to change..
var $xMark = document.querySelector('.fa-square-xmark');

// function ajaxRequest() {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://api.open5e.com/races/');
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     console.log(xhr.status);
//     console.log(xhr.response);
//     console.log(xhr.response.results);
//     console.log(xhr.response.results[4].age);
//   });
//   xhr.send();
// }

// ajaxRequest();

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

$dragonborn.addEventListener('dblclick', function (event) {
  $dragonbornModal.setAttribute('class', 'modal-bg');
  ajaxRequest($dragonborn);
});

$xMark.addEventListener('click', function (event) {
  $dragonbornModal.setAttribute('class', 'modal-bg hidden');
});

var $picContainerImg = document.querySelectorAll('.pic-container img');
var $picContainer = document.querySelectorAll('.pic-container');

// $picContainerImg.addEventListener('click', function (event) {
//   console.log(event.target);
//   $picContainerImg.setAttribute('class', 'selected-race-modal');
//   var $checkMark = document.createElement('i');
//   $checkMark.setAttribute('class', 'fa-regular fa-circle-check');
//   if (document.querySelector('.pic-container i') === null) {
//     $picContainer.appendChild($checkMark);
//   }
// });

for (var picContainerImg of $picContainerImg) {
  picContainerImg.addEventListener('click', function (event) {
    for (var i = 0; i < $picContainerImg.length; i++) {
      if (event.target === $picContainer[i].childNodes[1]) {
        for (var j = 0; j < $picContainer.length; j++) {
          if ($picContainer[j].childNodes[3] !== undefined) {
            $picContainer[j].childNodes[3].remove();
            $picContainer[j].childNodes[1].setAttribute('class', '');
          }
        }
        event.target.setAttribute('class', 'selected-race-modal');
        var $checkMark = document.createElement('i');
        $checkMark.setAttribute('class', 'fa-regular fa-circle-check');
        $picContainer[i].appendChild($checkMark);
      }
    }
  });
}

var $raceCharacteristics = document.querySelector('.pic-wrapper .race-characteristics');

function ajaxRequest(raceName) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.open5e.com/races/');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.results.length; i++) {
      if (xhr.response.results[i].name === raceName.getAttribute('id') && document.querySelector('.race-characteristics h5') === null) {
        var $age = document.createElement('h5');
        $age.textContent = 'Age:';
        var $ageInfo = document.createElement('p');
        $ageInfo.textContent = xhr.response.results[i].age;
        var $size = document.createElement('h5');
        $size.textContent = 'Size:';
        var $sizeInfo = document.createElement('p');
        $sizeInfo.textContent = xhr.response.results[i].size;
        var $languages = document.createElement('h5');
        $languages.textContent = 'Languages:';
        var $languagesInfo = document.createElement('p');
        $languagesInfo.textContent = xhr.response.results[i].languages;
        var $alignment = document.createElement('h5');
        $alignment.textContent = 'Alignment:';
        var $alignmentInfo = document.createElement('p');
        $alignmentInfo.textContent = xhr.response.results[i].alignment;
        var $asi = document.createElement('h5');
        $asi.textContent = 'Ability Score Increase:';
        var $asiInfo = document.createElement('p');
        $asiInfo.textContent = xhr.response.results[i].asi_desc;
        var $traits = document.createElement('h5');
        $traits.textContent = 'Traits:';
        var $traitsInfo = document.createElement('p');
        $traitsInfo.textContent = xhr.response.results[i].traits;
        $raceCharacteristics.appendChild($age);
        $raceCharacteristics.appendChild($ageInfo);
        $raceCharacteristics.appendChild($size);
        $raceCharacteristics.appendChild($sizeInfo);
        $raceCharacteristics.appendChild($languages);
        $raceCharacteristics.appendChild($languagesInfo);
        $raceCharacteristics.appendChild($alignment);
        $raceCharacteristics.appendChild($alignmentInfo);
        $raceCharacteristics.appendChild($asi);
        $raceCharacteristics.appendChild($asiInfo);
        // $raceCharacteristics.appendChild($traits);
        // $raceCharacteristics.appendChild($traitsInfo);
      }
    }
  });
  xhr.send();
}
