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

var $inputAbilityScores = document.querySelector('#input-ability-scores');
var $abilityScoreCaret = document.querySelector('#ability-score-caret');
var $abilityScoreContent = document.querySelector('#ability-score-content');

var $xMarks = document.querySelectorAll('#character-creation-page .fa-square-xmark');
var $xMarkModals = document.querySelectorAll('.pic-wrapper .modal-bg');

var $racePicWrapper = document.querySelectorAll('#race .pic-wrapper');
var $classPicWrapper = document.querySelectorAll('#class .pic-wrapper');

var $submitButton = document.querySelector('#character-creation-page form');

var $raceCheckMark;
var $classCheckMark;

var $photoUrl = document.querySelector('#final-character-adjustments .photoUrl');
var $placeHolderImg = document.querySelector('#placeholder-img');

$startButton.addEventListener('click', function (event) {
  $homePage.setAttribute('class', 'hidden');
  $characterCreationPage.setAttribute('class', '');
});

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

$inputAbilityScores.addEventListener('click', function (event) {
  if (event.target.getAttribute('class') === 'character-h2') {
    $inputAbilityScores.setAttribute('class', 'character-h2-expanded');
    $abilityScoreCaret.setAttribute('class', 'fa-solid fa-caret-down');
    $abilityScoreContent.setAttribute('class', '');
  } else if (event.target.getAttribute('class') === 'character-h2-expanded') {
    $inputAbilityScores.setAttribute('class', 'character-h2');
    $abilityScoreCaret.setAttribute('class', 'fa-solid fa-caret-left');
    $abilityScoreContent.setAttribute('class', 'hidden');
  }
});

$racePicWrapper.forEach(race => {
  race.addEventListener('dblclick', function (event) {
    race.childNodes[5].setAttribute('class', 'modal-bg');
    ajaxRequestRace(race);
  });
});

$classPicWrapper.forEach(className => {
  className.addEventListener('dblclick', function (event) {
    className.childNodes[5].setAttribute('class', 'modal-bg');
    ajaxRequestClass(className);
  });
});

for (var xMark of $xMarks) {
  xMark.addEventListener('click', function (event) {
    for (var i = 0; i < $xMarks.length; i++) {
      if (event.target.parentElement.parentElement === $xMarkModals[i]) {
        $xMarkModals[i].setAttribute('class', 'modal-bg hidden');
      }
    }
  });
}

var $racePicContainerImg = document.querySelectorAll('#race .pic-container img');
var $racePicContainer = document.querySelectorAll('#race .pic-container');

for (var racePicContainerImg of $racePicContainerImg) {
  racePicContainerImg.addEventListener('click', function (event) {
    for (var i = 0; i < $racePicContainerImg.length; i++) {
      if (event.target === $racePicContainer[i].childNodes[1]) {
        for (var j = 0; j < $racePicContainer.length; j++) {
          if ($racePicContainer[j].childNodes[3] !== undefined) {
            $racePicContainer[j].childNodes[3].remove();
            $racePicContainer[j].childNodes[1].setAttribute('class', '');
          }
        }
        event.target.setAttribute('class', 'selected-modal');
        var $checkMark = document.createElement('i');
        $checkMark.setAttribute('class', 'fa-regular fa-circle-check');
        $checkMark.setAttribute('id', 'race-check-mark');
        $racePicContainer[i].appendChild($checkMark);
      }
    }
    $raceCheckMark = document.querySelector('#race-check-mark');
  });
}

var $classPicContainerImg = document.querySelectorAll('#class .pic-container img');
var $classPicContainer = document.querySelectorAll('#class .pic-container');

for (var classPicContainerImg of $classPicContainerImg) {
  classPicContainerImg.addEventListener('click', function (event) {
    for (var i = 0; i < $classPicContainerImg.length; i++) {
      if (event.target === $classPicContainer[i].childNodes[1]) {
        for (var j = 0; j < $classPicContainer.length; j++) {
          if ($classPicContainer[j].childNodes[3] !== undefined) {
            $classPicContainer[j].childNodes[3].remove();
            $classPicContainer[j].childNodes[1].setAttribute('class', '');
          }
        }
        event.target.setAttribute('class', 'selected-modal');
        var $checkMark = document.createElement('i');
        $checkMark.setAttribute('class', 'fa-regular fa-circle-check');
        $checkMark.setAttribute('id', 'class-check-mark');
        $classPicContainer[i].appendChild($checkMark);
      }
    }
    $classCheckMark = document.querySelector('#class-check-mark');
  });
}

var $raceCharacteristics = document.querySelectorAll('.pic-wrapper .race-characteristics');

function ajaxRequestRace(raceName) {
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

var $classCharacteristics = document.querySelectorAll('.pic-wrapper .class-characteristics');

function ajaxRequestClass(className) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.open5e.com/classes/');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.results.length; i++) {
      if (xhr.response.results[i].name === className.getAttribute('id') && $classCharacteristics[i].childNodes.length <= 1) {
        var $equipment = document.createElement('h5');
        $equipment.textContent = 'Equipment:';
        var $equipmentInfo = document.createElement('p');
        $equipmentInfo.textContent = xhr.response.results[i].equipment;
        var $spellcastAbil = document.createElement('h5');
        $spellcastAbil.textContent = 'Spellcasting Ability:';
        var $spellcastAbilInfo = document.createElement('p');
        $spellcastAbilInfo.textContent = xhr.response.results[i].spellcasting_ability;
        var $hitDice = document.createElement('h5');
        $hitDice.textContent = 'Hit Dice:';
        var $hitDiceInfo = document.createElement('p');
        $hitDiceInfo.textContent = xhr.response.results[i].hit_dice;
        var $hp1stLevel = document.createElement('h5');
        $hp1stLevel.textContent = 'HP at 1st Level:';
        var $hp1stLevelInfo = document.createElement('p');
        $hp1stLevelInfo.textContent = xhr.response.results[i].hp_at_1st_level;
        var $hpHigherLevels = document.createElement('h5');
        $hpHigherLevels.textContent = 'HP at Higher Levels:';
        var $hpHigherLevelsInfo = document.createElement('p');
        $hpHigherLevelsInfo.textContent = xhr.response.results[i].hp_at_higher_levels;
        var $weaponProf = document.createElement('h5');
        $weaponProf.textContent = 'Weapon Proficiency:';
        var $weaponProfInfo = document.createElement('p');
        $weaponProfInfo.textContent = xhr.response.results[i].prof_weapons;
        var $armorProf = document.createElement('h5');
        $armorProf.textContent = 'Armor Proficiency:';
        var $armorProfInfo = document.createElement('p');
        $armorProfInfo.textContent = xhr.response.results[i].prof_armor;
        var $skillProf = document.createElement('h5');
        $skillProf.textContent = 'Skill Proficiency:';
        var $skillProfInfo = document.createElement('p');
        $skillProfInfo.textContent = xhr.response.results[i].prof_skills;
        var $savingThrowProf = document.createElement('h5');
        $savingThrowProf.textContent = 'Saving Throw Proficiency:';
        var $savingThrowProfInfo = document.createElement('p');
        $savingThrowProfInfo.textContent = xhr.response.results[i].prof_saving_throws;
        var $newDiv1 = document.createElement('div');
        var $newDiv2 = document.createElement('div');
        for (var j = 0; j < $classCharacteristics.length; j++) {
          if (xhr.response.results[i].slug === $classCharacteristics[j].id) {
            $classCharacteristics[j].appendChild($newDiv1);
            $classCharacteristics[j].appendChild($newDiv2);
            $newDiv1.appendChild($equipment);
            $newDiv1.appendChild($equipmentInfo);
            $newDiv1.appendChild($spellcastAbil);
            $newDiv1.appendChild($spellcastAbilInfo);
            $newDiv1.appendChild($hitDice);
            $newDiv1.appendChild($hitDiceInfo);
            $newDiv1.appendChild($hp1stLevel);
            $newDiv1.appendChild($hp1stLevelInfo);
            $newDiv2.appendChild($weaponProf);
            $newDiv2.appendChild($weaponProfInfo);
            $newDiv2.appendChild($armorProf);
            $newDiv2.appendChild($armorProfInfo);
            $newDiv2.appendChild($skillProf);
            $newDiv2.appendChild($skillProfInfo);
            $newDiv2.appendChild($savingThrowProf);
            $newDiv2.appendChild($savingThrowProfInfo);
          }
        }
      }
    }
  });
  xhr.send();
}

var $finalCharacterAdjustments = document.querySelector('#final-character-adjustments');
var $characterAbilityScore = document.querySelector('#character-ability-score');
var $characterRace = document.querySelector('#character-race');
var $characterClass = document.querySelector('#character-class');

$submitButton.addEventListener('submit', function (event) {
  event.preventDefault();

  var raceName = $raceCheckMark.parentNode.parentNode.childNodes[1].textContent;
  var className = $classCheckMark.parentNode.parentNode.childNodes[1].textContent;
  var abilityScores = {};

  var str = event.target.elements[0].value;
  var dex = event.target.elements[1].value;
  var con = event.target.elements[2].value;
  var int = event.target.elements[3].value;
  var wis = event.target.elements[4].value;
  var cha = event.target.elements[5].value;
  abilityScores.STR = str;
  abilityScores.DEX = dex;
  abilityScores.CON = con;
  abilityScores.INT = int;
  abilityScores.WIS = wis;
  abilityScores.CHA = cha;

  var characterObj = {};

  characterObj.race = raceName;
  characterObj.class = className;
  characterObj.ability_scores = abilityScores;

  characterObj.EntryId = data.nextEntryId;

  data.nextEntryId++;

  data.entries.unshift(characterObj);

  var $div1 = document.createElement('div');
  var $div2 = document.createElement('div');
  var $div3 = document.createElement('div');
  var $div4 = document.createElement('div');
  var $div5 = document.createElement('div');
  var $div6 = document.createElement('div');
  var $h5Element1 = document.createElement('h5');
  var $h5Element2 = document.createElement('h5');
  var $h5Element3 = document.createElement('h5');
  var $h5Element4 = document.createElement('h5');
  var $h5Element5 = document.createElement('h5');
  var $h5Element6 = document.createElement('h5');
  var $p1 = document.createElement('p');
  var $p2 = document.createElement('p');
  var $p3 = document.createElement('p');
  var $p4 = document.createElement('p');
  var $p5 = document.createElement('p');
  var $p6 = document.createElement('p');
  $h5Element1.textContent = 'STR';
  $h5Element2.textContent = 'DEX';
  $h5Element3.textContent = 'CON';
  $h5Element4.textContent = 'INT';
  $h5Element5.textContent = 'WIS';
  $h5Element6.textContent = 'CHA';
  $p1.textContent = str;
  $p2.textContent = dex;
  $p3.textContent = con;
  $p4.textContent = int;
  $p5.textContent = wis;
  $p6.textContent = cha;

  $characterAbilityScore.appendChild($div1);
  $div1.appendChild($h5Element1);
  $div1.appendChild($p1);
  $characterAbilityScore.appendChild($div2);
  $div2.appendChild($h5Element2);
  $div2.appendChild($p2);
  $characterAbilityScore.appendChild($div3);
  $div3.appendChild($h5Element3);
  $div3.appendChild($p3);
  $characterAbilityScore.appendChild($div4);
  $div4.appendChild($h5Element4);
  $div4.appendChild($p4);
  $characterAbilityScore.appendChild($div5);
  $div5.appendChild($h5Element5);
  $div5.appendChild($p5);
  $characterAbilityScore.appendChild($div6);
  $div6.appendChild($h5Element6);
  $div6.appendChild($p6);

  var $pRace = document.createElement('p');
  var $pClass = document.createElement('p');
  $pRace.textContent = raceName;
  $pClass.textContent = className;

  $characterRace.appendChild($pRace);
  $characterClass.appendChild($pClass);

  event.target.reset();

  $characterCreationPage.setAttribute('class', 'hidden');
  $finalCharacterAdjustments.setAttribute('class', '');

});

$photoUrl.addEventListener('input', function (event) {
  $placeHolderImg.setAttribute('src', event.target.value);
  if ($placeHolderImg.getAttribute('src') === '') {
    $placeHolderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});
