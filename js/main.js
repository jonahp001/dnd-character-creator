var $startButton = document.querySelector('.start-button');
var $homePage = document.querySelector('#home-page');
var $characterCreationPage = document.querySelector('#character-creation-page');
var $h1TitleText = document.querySelector('h1');

var $selectARace = document.querySelector('#select-a-race');
var $raceCaret = document.querySelector('#race-caret');
var $raceIcons = document.querySelector('#race-icons');

var $selectAClass = document.querySelector('#select-a-class');
var $classCaret = document.querySelector('#class-caret');
var $classIcons = document.querySelector('#class-icons');

var $xMarks = document.querySelectorAll('#race .fa-square-xmark');
var $xMarkRaceModals = document.querySelectorAll('.pic-wrapper .modal-bg');

var $racePicWrapper = document.querySelectorAll('#race .pic-wrapper');

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

$selectAClass.addEventListener('click', function (event) {
  if (event.target.getAttribute('class') === 'character-h2') {
    $selectAClass.setAttribute('class', 'character-h2-expanded');
    $classCaret.setAttribute('class', 'fa-solid fa-caret-down');
    $classIcons.setAttribute('class', 'pic-section');
  } else if (event.target.getAttribute('class') === 'character-h2-expanded') {
    $selectAClass.setAttribute('class', 'character-h2');
    $classCaret.setAttribute('class', 'fa-solid fa-caret-left');
    $classIcons.setAttribute('class', 'pic-section hidden');
  }
});

// var $racePicWrapperArray = Array.from($racePicWrapper);
// console.log($racePicWrapperArray);

$racePicWrapper.forEach(race => {
  race.addEventListener('dblclick', function (event) {
    race.childNodes[5].setAttribute('class', 'modal-bg');
    ajaxRequest(race);
  });
});

// console.log($xMarks[0].parentElement.parentElement);

for (var xMark of $xMarks) {
  xMark.addEventListener('click', function (event) {
    for (var i = 0; i < $xMarks.length; i++) {
      if (event.target.parentElement.parentElement === $xMarkRaceModals[i]) {
        $xMarkRaceModals[i].setAttribute('class', 'modal-bg hidden');
      }
    }
  });
}

// $xMark.addEventListener('click', function (event) {
//   $dragonbornModal.setAttribute('class', 'modal-bg hidden');
// });

// var $picWrapper = document.querySelectorAll('#race .pic-wrapper');

var $picContainerImg = document.querySelectorAll('.pic-container img');
var $picContainer = document.querySelectorAll('.pic-container');

// for (var picWrapper of $picWrapper) {
//   picWrapper.addEventListener('dblclick', function (event) {
//     picWrapper.setAttribute('class', 'modal-bg');
//     ajaxRequest($dragonborn);
//   });
// }

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

var $raceCharacteristics = document.querySelectorAll('.pic-wrapper .race-characteristics');
// var $raceH5 = document.querySelectorAll('.race-characteristics h5');
// console.log($raceCharacteristics);
// console.log($raceCharacteristics[4].id);
// console.log($raceCharacteristics[4].childNodes.length);
// console.log($raceCharacteristics[4].children.length);

// console.log($dragonborn);

function ajaxRequest(raceName) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.open5e.com/races/');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.response.results);
    // console.log(xhr.response.results[0].name);
    // console.log($raceH5);
    // console.log($raceH5[0]);
    for (var i = 0; i < xhr.response.results.length; i++) {
      if (xhr.response.results[i].name === raceName.getAttribute('id') && $raceCharacteristics[i].childNodes.length <= 1) {
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
        var $newDiv1 = document.createElement('div');
        var $newDiv2 = document.createElement('div');
        // var $traits = document.createElement('h5');
        // $traits.textContent = 'Traits:';
        // var $traitsInfo = document.createElement('p');
        // $traitsInfo.textContent = xhr.response.results[i].traits;
        for (var j = 0; j < $raceCharacteristics.length; j++) {
          // console.log($raceCharacteristics[0].id);
          // console.log(xhr.response.results[0].slug);
          if (xhr.response.results[i].slug === $raceCharacteristics[j].id) {
            $raceCharacteristics[j].appendChild($newDiv1);
            $raceCharacteristics[j].appendChild($newDiv2);
            $newDiv1.appendChild($age);
            $newDiv1.appendChild($ageInfo);
            $newDiv1.appendChild($size);
            $newDiv1.appendChild($sizeInfo);
            $newDiv1.appendChild($languages);
            $newDiv1.appendChild($languagesInfo);
            $newDiv2.appendChild($alignment);
            $newDiv2.appendChild($alignmentInfo);
            $newDiv2.appendChild($asi);
            $newDiv2.appendChild($asiInfo);
            // $raceCharacteristics.appendChild($traits);
            // $raceCharacteristics.appendChild($traitsInfo);
          }
        }
      }
    }
  });
  xhr.send();
}
