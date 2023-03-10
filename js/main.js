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

var $gallery = document.querySelector('#gallery');
var $characterDetails = document.querySelector('#character-details');
var $characterDetailContent = document.querySelector('#character-details .content-area');
var $editCharacterContent = document.querySelector('#edit-character .content-area');

var $editCharacter = document.querySelector('#edit-character');

var $raceCheckMark;
var $classCheckMark;

var $photoUrl = document.querySelector('#final-character-adjustments .photoUrl');
var $placeHolderImg = document.querySelector('#placeholder-img');

var $galleryLink = document.querySelector('.gallery-link');

var $characterContentMAINDiv;
var $editCharacterDiv;
var $editButton;
var $backButton;
var $saveButton;
var $deleteButton;

$h1TitleText.addEventListener('click', function (event) {
  $homePage.setAttribute('class', '');
  $characterCreationPage.setAttribute('class', 'hidden');
  $finalCharacterAdjustments.setAttribute('class', 'hidden');
  $gallery.setAttribute('class', 'hidden');
  $characterDetails.setAttribute('class', 'hidden');
  $editCharacter.setAttribute('class', 'hidden');
  if ($editCharacterContent.childNodes.length > 1) {
    $editCharacterContent.removeChild($editCharacterDiv);
    $characterDetailContent.removeChild($characterContentMAINDiv);
  } else if ($characterDetailContent.childNodes.length > 1) {
    $characterDetailContent.removeChild($characterContentMAINDiv);
  }
});

$galleryLink.addEventListener('click', function (event) {
  $gallery.setAttribute('class', '');
  $homePage.setAttribute('class', 'hidden');
  $characterCreationPage.setAttribute('class', 'hidden');
  $finalCharacterAdjustments.setAttribute('class', 'hidden');
  $characterDetails.setAttribute('class', 'hidden');
  $characterDetails.setAttribute('class', 'hidden');
  $editCharacter.setAttribute('class', 'hidden');
  if ($editCharacterContent.childNodes.length > 1) {
    $editCharacterContent.removeChild($editCharacterDiv);
    $characterDetailContent.removeChild($characterContentMAINDiv);
  } else if ($characterDetailContent.childNodes.length > 1) {
    $characterDetailContent.removeChild($characterContentMAINDiv);
  }
});

$startButton.addEventListener('click', function (event) {
  $homePage.setAttribute('class', 'hidden');
  $characterCreationPage.setAttribute('class', '');
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
        for (var j = 0; j < $raceCharacteristics.length; j++) {
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

function toggleNoEntries() {
  var $noEntryText = document.querySelectorAll('.no-entry-text');
  for (var noEntryTexts of $noEntryText) {
    if (data.entries.length > 0) {
      noEntryTexts.classList.add('hidden');
    } else {
      noEntryTexts.classList.remove('hidden');
    }
  }
}

$photoUrl.addEventListener('input', function (event) {
  $placeHolderImg.setAttribute('src', event.target.value);
  if ($placeHolderImg.getAttribute('src') === '') {
    $placeHolderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

$finalCharacterAdjustments.addEventListener('submit', function (event) {
  event.preventDefault();

  var charName = event.target.elements[0].value;
  var charImg = event.target.elements[1].value;
  var charDesc = event.target.elements[2].value;

  data.entries[0].character_name = charName;
  data.entries[0].character_img = charImg;
  data.entries[0].character_description = charDesc;

  data.nextEntryId++;

  event.target.reset();

  $picSectionGallery.prepend(newCharacterImgGallery(data.entries[0]));
  $picSectionHomePage.prepend(newCharacterImgHomePage(data.entries[0]));

  if (data.entries.length > 0) {
    toggleNoEntries();
  }

  $finalCharacterAdjustments.setAttribute('class', 'hidden');
  $gallery.setAttribute('class', '');
});

var $picSectionGallery = document.querySelector('#gallery .pic-section');
function newCharacterImgGallery(entry) {
  var $picWrapperDiv = document.createElement('div');
  $picWrapperDiv.setAttribute('class', 'pic-wrapper');
  $picWrapperDiv.setAttribute('data-entry-id', entry.EntryId);
  var $characterH5 = document.createElement('h5');
  $characterH5.textContent = entry.character_name;
  $picWrapperDiv.appendChild($characterH5);
  var $picContainerDiv = document.createElement('div');
  $picContainerDiv.setAttribute('class', 'pic-container');
  $picWrapperDiv.appendChild($picContainerDiv);
  var $characterImage = document.createElement('img');
  $characterImage.setAttribute('src', entry.character_img);
  $characterImage.setAttribute('data-entry-id', entry.EntryId);
  $picContainerDiv.appendChild($characterImage);

  return $picWrapperDiv;
}

var $picSectionHomePage = document.querySelector('#home-page .pic-section');
function newCharacterImgHomePage(entry) {
  var $picWrapperDivHP = document.createElement('div');
  $picWrapperDivHP.setAttribute('class', 'pic-wrapper');
  $picWrapperDivHP.setAttribute('data-entry-id', entry.EntryId);
  var $characterH5HP = document.createElement('h5');
  $characterH5HP.textContent = entry.character_name;
  $picWrapperDivHP.appendChild($characterH5HP);
  var $picContainerDivHP = document.createElement('div');
  $picContainerDivHP.setAttribute('class', 'pic-container');
  $picWrapperDivHP.appendChild($picContainerDivHP);
  var $characterImageHP = document.createElement('img');
  $characterImageHP.setAttribute('src', entry.character_img);
  $characterImageHP.setAttribute('data-entry-id', entry.EntryId);
  $picContainerDivHP.appendChild($characterImageHP);

  return $picWrapperDivHP;
}

var $editCharacterButton;

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $picSectionGallery.append(newCharacterImgGallery(data.entries[i]));
    $picSectionHomePage.append(newCharacterImgHomePage(data.entries[i]));
  }

  // data.editing = null;

  if (data.entries.length > 0) {
    toggleNoEntries();
  }

  var $galleryPicWrapper = document.querySelectorAll('#gallery .pic-wrapper');

  $galleryPicWrapper.forEach(img => {
    img.addEventListener('click', function (event) {
      for (var i = 0; i < data.entries.length; i++) {
        if (data.entries[i].EntryId.toString() === event.target.getAttribute('data-entry-id') && $characterDetails.childNodes[1].childNodes.length < 2) {
          $gallery.setAttribute('class', 'hidden');
          $characterDetails.setAttribute('class', '');
          $characterDetailContent.appendChild(renderEntry(data.entries[i]));
        } else if (data.entries[i].EntryId.toString() === event.target.getAttribute('data-entry-id')) {
          $gallery.setAttribute('class', 'hidden');
          $characterDetails.setAttribute('class', '');
        }
      }
      $editCharacterButton = document.querySelector('.edit-button');
      $editCharacterButton.addEventListener('click', function (event) {
        for (var i = 0; i < data.entries.length; i++) {
          if (data.entries[i].EntryId.toString() === event.target.parentNode.getAttribute('data-entry-id') && $editCharacter.childNodes[1].childNodes.length < 2) {
            $characterDetails.setAttribute('class', 'hidden');
            $editCharacter.setAttribute('class', '');
            $editCharacterContent.appendChild(renderEntryForEdit(data.entries[i]));
          } else if (data.entries[i].EntryId.toString() === event.target.parentNode.getAttribute('data-entry-id')) {
            $characterDetails.setAttribute('class', 'hidden');
            $editCharacter.setAttribute('class', '');
          }
        }
        $backButton = document.querySelector('.back-button');
        $backButton.addEventListener('click', function (event) {
          $editCharacter.setAttribute('class', 'hidden');
          $characterDetails.setAttribute('class', '');
        });
      });
    });
  });

  var $homepagePicWrapper = document.querySelectorAll('#home-page .pic-wrapper');

  $homepagePicWrapper.forEach(img => {
    img.addEventListener('click', function (event) {
      for (var i = 0; i < data.entries.length; i++) {
        if (data.entries[i].EntryId.toString() === event.target.getAttribute('data-entry-id') && $characterDetails.childNodes[1].childNodes.length < 2) {
          $homePage.setAttribute('class', 'hidden');
          $characterDetails.setAttribute('class', '');
          $characterDetailContent.appendChild(renderEntry(data.entries[i]));
        } else if (data.entries[i].EntryId.toString() === event.target.getAttribute('data-entry-id')) {
          $homePage.setAttribute('class', 'hidden');
          $characterDetails.setAttribute('class', '');
        }
      }
      $editCharacterButton = document.querySelector('.edit-button');
      $editCharacterButton.addEventListener('click', function (event) {
        for (var i = 0; i < data.entries.length; i++) {
          if (data.entries[i].EntryId.toString() === event.target.parentNode.getAttribute('data-entry-id') && $editCharacter.childNodes[1].childNodes.length < 2) {
            $characterDetails.setAttribute('class', 'hidden');
            $editCharacter.setAttribute('class', '');
            $editCharacterContent.appendChild(renderEntryForEdit(data.entries[i]));
          } else if (data.entries[i].EntryId.toString() === event.target.parentNode.getAttribute('data-entry-id')) {
            $characterDetails.setAttribute('class', 'hidden');
            $editCharacter.setAttribute('class', '');
          }
        }
        $backButton = document.querySelector('.back-button');
        $backButton.addEventListener('click', function (event) {
          $editCharacter.setAttribute('class', 'hidden');
          $characterDetails.setAttribute('class', '');
        });
      });
    });
  });

});

function renderEntry(entry) {
  $characterContentMAINDiv = document.createElement('div');
  $characterContentMAINDiv.setAttribute('data-entry-id', entry.EntryId);

  var $characterContentDiv = document.createElement('div');
  $characterContentDiv.setAttribute('class', 'character-content');
  $characterContentMAINDiv.appendChild($characterContentDiv);

  var $centeredRowDiv = document.createElement('div');
  $centeredRowDiv.setAttribute('class', 'centered-row column-half');
  $characterContentDiv.appendChild($centeredRowDiv);

  var $characterNameH2 = document.createElement('h2');
  $characterNameH2.textContent = entry.character_name;
  $centeredRowDiv.appendChild($characterNameH2);
  var $characterImg = document.createElement('img');
  $characterImg.setAttribute('src', entry.character_img);
  $centeredRowDiv.appendChild($characterImg);
  var $characterImgUrl = document.createElement('p');
  $characterImgUrl.textContent = entry.character_img;
  $centeredRowDiv.appendChild($characterImgUrl);

  var $characterCharacteristicsDiv = document.createElement('div');
  $characterCharacteristicsDiv.setAttribute('class', 'column-half');
  $characterContentDiv.appendChild($characterCharacteristicsDiv);

  var $abilityScoreMainDiv = document.createElement('div');
  $characterCharacteristicsDiv.appendChild($abilityScoreMainDiv);

  var $abilityScoreH4 = document.createElement('h4');
  $abilityScoreH4.textContent = 'Ability Score:';
  $abilityScoreMainDiv.appendChild($abilityScoreH4);
  var $abilityScoreDirectParentDiv = document.createElement('div');
  $abilityScoreDirectParentDiv.setAttribute('class', 'character-ability-score row');
  $abilityScoreMainDiv.appendChild($abilityScoreDirectParentDiv);

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
  $p1.textContent = entry.ability_scores.STR;
  $p2.textContent = entry.ability_scores.DEX;
  $p3.textContent = entry.ability_scores.CON;
  $p4.textContent = entry.ability_scores.INT;
  $p5.textContent = entry.ability_scores.WIS;
  $p6.textContent = entry.ability_scores.CHA;
  $abilityScoreDirectParentDiv.appendChild($div1);
  $div1.appendChild($h5Element1);
  $div1.appendChild($p1);
  $abilityScoreDirectParentDiv.appendChild($div2);
  $div2.appendChild($h5Element2);
  $div2.appendChild($p2);
  $abilityScoreDirectParentDiv.appendChild($div3);
  $div3.appendChild($h5Element3);
  $div3.appendChild($p3);
  $abilityScoreDirectParentDiv.appendChild($div4);
  $div4.appendChild($h5Element4);
  $div4.appendChild($p4);
  $abilityScoreDirectParentDiv.appendChild($div5);
  $div5.appendChild($h5Element5);
  $div5.appendChild($p5);
  $abilityScoreDirectParentDiv.appendChild($div6);
  $div6.appendChild($h5Element6);
  $div6.appendChild($p6);

  var $raceMainDiv = document.createElement('div');
  $raceMainDiv.setAttribute('class', 'character-info');
  $characterCharacteristicsDiv.appendChild($raceMainDiv);
  var $raceH4 = document.createElement('h4');
  $raceH4.textContent = 'Race:';
  $raceMainDiv.appendChild($raceH4);
  var $raceNameDiv = document.createElement('div');
  $raceMainDiv.appendChild($raceNameDiv);
  var $pRace = document.createElement('p');
  $pRace.textContent = entry.race;
  $raceNameDiv.appendChild($pRace);

  var $classMainDiv = document.createElement('div');
  $classMainDiv.setAttribute('class', 'character-info');
  $characterCharacteristicsDiv.appendChild($classMainDiv);
  var $classH4 = document.createElement('h4');
  $classH4.textContent = 'Class';
  $classMainDiv.appendChild($classH4);
  var $classNameDiv = document.createElement('div');
  $classMainDiv.appendChild($classNameDiv);
  var $pClass = document.createElement('p');
  $pClass.textContent = entry.class;
  $classNameDiv.appendChild($pClass);

  var $characterDescriptionDiv = document.createElement('div');
  $characterDescriptionDiv.setAttribute('class', 'centered-row');
  $characterCharacteristicsDiv.appendChild($characterDescriptionDiv);
  var $descriptionH4 = document.createElement('h4');
  $descriptionH4.textContent = 'Description:';
  $characterDescriptionDiv.appendChild($descriptionH4);
  var $descriptionText = document.createElement('p');
  $descriptionText.textContent = entry.character_description;
  $characterDescriptionDiv.appendChild($descriptionText);

  $editButton = document.createElement('button');
  $editButton.setAttribute('class', 'edit-button centered-row');
  // $editButton.setAttribute('type', 'submit');
  $editButton.textContent = 'EDIT';
  $characterContentMAINDiv.appendChild($editButton);

  return $characterContentMAINDiv;
}

function renderEntryForEdit(entry) {
  $editCharacterDiv = document.createElement('div');
  $editCharacterDiv.setAttribute('data-entry-id', entry.EntryId);

  var $characterContentDiv = document.createElement('div');
  $characterContentDiv.setAttribute('class', 'character-content');
  $editCharacterDiv.appendChild($characterContentDiv);

  var $centeredRowDiv = document.createElement('div');
  $centeredRowDiv.setAttribute('class', 'centered-row column-half');
  $characterContentDiv.appendChild($centeredRowDiv);

  var $characterNameH2 = document.createElement('input');
  $characterNameH2.defaultValue = entry.character_name;
  $centeredRowDiv.appendChild($characterNameH2);
  var $characterImg = document.createElement('img');
  $characterImg.setAttribute('src', entry.character_img);
  $centeredRowDiv.appendChild($characterImg);
  var $characterImgUrl = document.createElement('input');
  $characterImgUrl.defaultValue = entry.character_img;
  $centeredRowDiv.appendChild($characterImgUrl);

  var $characterCharacteristicsDiv = document.createElement('div');
  $characterCharacteristicsDiv.setAttribute('class', 'column-half');
  $characterContentDiv.appendChild($characterCharacteristicsDiv);

  var $abilityScoreMainDiv = document.createElement('div');
  $characterCharacteristicsDiv.appendChild($abilityScoreMainDiv);

  var $abilityScoreH4 = document.createElement('h4');
  $abilityScoreH4.textContent = 'Ability Score:';
  $abilityScoreMainDiv.appendChild($abilityScoreH4);
  var $abilityScoreDirectParentDiv = document.createElement('div');
  $abilityScoreDirectParentDiv.setAttribute('class', 'character-ability-score row');
  $abilityScoreMainDiv.appendChild($abilityScoreDirectParentDiv);

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
  var $input1 = document.createElement('input');
  $input1.setAttribute('type', 'text');
  var $input2 = document.createElement('input');
  $input2.setAttribute('type', 'text');
  var $input3 = document.createElement('input');
  $input3.setAttribute('type', 'text');
  var $input4 = document.createElement('input');
  $input4.setAttribute('type', 'text');
  var $input5 = document.createElement('input');
  $input5.setAttribute('type', 'text');
  var $input6 = document.createElement('input');
  $input6.setAttribute('type', 'text');
  $h5Element1.textContent = 'STR';
  $h5Element2.textContent = 'DEX';
  $h5Element3.textContent = 'CON';
  $h5Element4.textContent = 'INT';
  $h5Element5.textContent = 'WIS';
  $h5Element6.textContent = 'CHA';
  $input1.defaultValue = entry.ability_scores.STR;
  $input2.defaultValue = entry.ability_scores.DEX;
  $input3.defaultValue = entry.ability_scores.CON;
  $input4.defaultValue = entry.ability_scores.INT;
  $input5.defaultValue = entry.ability_scores.WIS;
  $input6.defaultValue = entry.ability_scores.CHA;
  $abilityScoreDirectParentDiv.appendChild($div1);
  $div1.appendChild($h5Element1);
  $div1.appendChild($input1);
  $abilityScoreDirectParentDiv.appendChild($div2);
  $div2.appendChild($h5Element2);
  $div2.appendChild($input2);
  $abilityScoreDirectParentDiv.appendChild($div3);
  $div3.appendChild($h5Element3);
  $div3.appendChild($input3);
  $abilityScoreDirectParentDiv.appendChild($div4);
  $div4.appendChild($h5Element4);
  $div4.appendChild($input4);
  $abilityScoreDirectParentDiv.appendChild($div5);
  $div5.appendChild($h5Element5);
  $div5.appendChild($input5);
  $abilityScoreDirectParentDiv.appendChild($div6);
  $div6.appendChild($h5Element6);
  $div6.appendChild($input6);

  var $raceMainDiv = document.createElement('div');
  $raceMainDiv.setAttribute('class', 'character-info');
  $characterCharacteristicsDiv.appendChild($raceMainDiv);
  var $raceH4 = document.createElement('h4');
  $raceH4.textContent = 'Race:';
  $raceMainDiv.appendChild($raceH4);
  var $raceNameDiv = document.createElement('div');
  $raceMainDiv.appendChild($raceNameDiv);
  var $pRace = document.createElement('input');
  $pRace.defaultValue = entry.race;
  $raceNameDiv.appendChild($pRace);

  var $classMainDiv = document.createElement('div');
  $classMainDiv.setAttribute('class', 'character-info');
  $characterCharacteristicsDiv.appendChild($classMainDiv);
  var $classH4 = document.createElement('h4');
  $classH4.textContent = 'Class';
  $classMainDiv.appendChild($classH4);
  var $classNameDiv = document.createElement('div');
  $classMainDiv.appendChild($classNameDiv);
  var $pClass = document.createElement('input');
  $pClass.defaultValue = entry.class;
  $classNameDiv.appendChild($pClass);

  var $characterDescriptionDiv = document.createElement('div');
  $characterDescriptionDiv.setAttribute('class', 'centered-row');
  $characterCharacteristicsDiv.appendChild($characterDescriptionDiv);
  var $descriptionH4 = document.createElement('h4');
  $descriptionH4.textContent = 'Description:';
  $characterDescriptionDiv.appendChild($descriptionH4);
  var $descriptionText = document.createElement('textarea');
  $descriptionText.textContent = entry.character_description;
  $characterDescriptionDiv.appendChild($descriptionText);

  var $buttonDiv = document.createElement('div');
  $buttonDiv.setAttribute('class', 'flex');
  $editCharacterDiv.appendChild($buttonDiv);

  var $editButtonDiv = document.createElement('div');
  $editButtonDiv.setAttribute('class', 'pic-wrapper');
  $editButton = document.createElement('button');
  $editButton.setAttribute('class', 'back-button edit-button');
  // $editButton.setAttribute('type', 'submit');
  $editButton.textContent = 'BACK';
  $editButtonDiv.appendChild($editButton);
  $buttonDiv.appendChild($editButtonDiv);

  var $deleteButtonDiv = document.createElement('div');
  $deleteButtonDiv.setAttribute('class', 'pic-wrapper');
  $deleteButton = document.createElement('button');
  $deleteButton.setAttribute('class', 'delete-button edit-button');
  // $editButton.setAttribute('type', 'submit');
  $deleteButton.textContent = 'DELETE';
  $deleteButtonDiv.appendChild($deleteButton);
  $buttonDiv.appendChild($deleteButtonDiv);

  var $saveButtonDiv = document.createElement('div');
  $saveButtonDiv.setAttribute('class', 'pic-wrapper');
  $saveButton = document.createElement('button');
  $saveButton.setAttribute('class', 'save-button edit-button');
  $saveButton.setAttribute('type', 'submit');
  $saveButton.textContent = 'SAVE';
  $saveButtonDiv.appendChild($saveButton);
  $buttonDiv.appendChild($saveButtonDiv);

  return $editCharacterDiv;
}
