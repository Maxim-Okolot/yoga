(function () {
  let preview = document.querySelector('.i-practice-preview');
  let labelsList = document.querySelector('.i-practice-labels');
  let optionsWrap = document.querySelectorAll('.i-practice-options__wrap');
  let btnsNext = document.querySelectorAll('.i-practice-options .btn-next');
  let btnBack = document.querySelector('.i-practice__back');
  let breadcrumb = document.querySelector('.i-practice-breadcrumb');

  let currentSteep = 1;


  let nextSteep = (val, lengthProgram) => {
    preview.classList.remove(`steep-${currentSteep}`);
    currentSteep++;
    preview.classList.add(`steep-${currentSteep}`);

    let li = document.createElement('li'),
      cloneLi = li.cloneNode(true);

    li.classList.add('i-practice-labels__item');

    currentSteep == 5 ? li.innerText = `КОМПЛЕКС ${val} из ${lengthProgram}` : li.innerText = val;

    labelsList.append(li);

    cloneLi.classList.add('i-practice-breadcrumb__item');

    switch (currentSteep) {
      case 2:
        cloneLi.innerText = ' / Выбор длительности  ';
        break;
      case 3:
        cloneLi.innerText = ' / Выбор упражнений  ';
        break;
      case 4:
        cloneLi.innerText = ' / Подборка асан  ';
        break;
      case 5:
        cloneLi.innerText = ` / Комплекс  ${val}`;
    }

    breadcrumb.append(cloneLi);

    for (let i = 0; i < optionsWrap.length; i++) {
      optionsWrap[i].classList.add('hide');
      i === currentSteep - 1 ?  optionsWrap[i].classList.remove('hide') :  optionsWrap[i].classList.add('hide');
    }
  }

  let backSteep = () => {
    if (currentSteep > 1) {
      labelsList.children[labelsList.children.length - 1].remove();

      preview.classList.remove(`steep-${currentSteep}`);
      currentSteep--;
      preview.classList.add(`steep-${currentSteep}`);

      for (let i = 0; i < optionsWrap.length; i++) {
        optionsWrap[i].classList.add('hide');
        i === currentSteep - 1 ?  optionsWrap[i].classList.remove('hide') :  optionsWrap[i].classList.add('hide');
      }

      breadcrumb.children[breadcrumb.children.length - 1].remove();
    }
  }

  for (let btn of btnsNext) {
    btn.addEventListener('click', () => {
      nextSteep(btn.innerText);

    })
  }

  btnBack.addEventListener('click', backSteep);

  let checkbox = document.querySelectorAll('.settings-volume__input'),
    rangeInputVolume = document.querySelectorAll('.settings-volume__range-input'),
    playlistInput = document.querySelectorAll('.settings-volume__playlist-input');

  let valueRange = (elem) => {
    elem.previousElementSibling.style.width = (elem.value / 30 * 100 ) + '%';
    elem.parentElement.previousElementSibling.innerText = elem.value;
  }

  let musicPlayer = document.querySelector('#player-music'),
    playerVoice = document.querySelector('#player-voice');


  window.addEventListener('DOMContentLoaded', () => {
    for (let check of checkbox) {
      check.addEventListener('change', () => {
        check.checked ? check.nextElementSibling.innerText = 'Вкл.' : check.nextElementSibling.innerText = 'Выкл.';
      })
    }

    for (let range of rangeInputVolume) {
      range.addEventListener('input', () => {

        if (range.classList.contains('range-voice')) {
          playerVoice.volume = (range.value / range.max).toFixed(2);
        } else {
          musicPlayer.volume = (range.value / range.max).toFixed(2);
        }

        valueRange(range);
      })

      valueRange(range);
    }

    for (let i = 0; i < playlistInput.length; i++) {
      playlistInput[i].addEventListener('change', () => {
        musicPlayer.src = musicPlayer.src.slice(0, -5) + i + '.mp3';

        if (!btnCheckMusic.classList.contains('music-on')) {
          musicPlayer.play();
        }
      })
    }

    btnCheckMusic.addEventListener('click', () => {
      if (btnCheckMusic.classList.contains('music-on')) {
        btnCheckMusic.querySelector('span').innerText = 'Выключить музыку';
        musicPlayer.play();
      } else {
        btnCheckMusic.querySelector('span').innerText = 'Включить музыку';
        musicPlayer.pause();
      }

      btnCheckMusic.classList.toggle('music-on');
    })

  })

  let btnOpenSettingVolume = document.querySelector('.i-practice__settings-volume-btn'),
    btnOpenSelectMusic = document.querySelector('.settings-volume__btn-music');
    btnCloseSelectMusic = document.querySelector('.settings-volume__music-close'),
    btnCheckMusic = document.querySelector('.settings-volume__music-status');

  btnOpenSettingVolume.addEventListener('click', () => {
    document.querySelector('.i-practice__settings-volume').classList.toggle('open');
  })

  btnOpenSelectMusic.addEventListener('click', () => {
    document.querySelector('.i-practice__settings-volume').classList.toggle('select-music');
  })

  btnCloseSelectMusic.addEventListener('click', () => {
    document.querySelector('.i-practice__settings-volume').classList.toggle('select-music');
  })

  let programItem = document.querySelectorAll('.i-practice-program__item');

  for (let item of programItem) {
    item.addEventListener('click', () => {

      for (let elem of programItem) {
        elem.classList.remove('active');
      }

      item.classList.add('active');
      document.querySelector('.i-practice-preview').classList.add('start-active');

    })
  }

  let btnStart = document.querySelector('.i-practice__start');

  btnStart.addEventListener('click', () => {
    let currentProgram = document.querySelector('.i-practice-pagination span mark:first-child').innerHTML;
    let lengthProgram = document.querySelector('.i-practice-pagination span mark:last-child').innerHTML;
    nextSteep(currentProgram, lengthProgram);
  })

  var swiper = new Swiper(".i-practice-player-slider", {
    pagination: {
      el: ".i-practice-player-slider__pagination",
    },
    navigation: {
      nextEl: ".i-practice-player-slider__next",
      prevEl: ".i-practice-player-slider__prev",
    },
  });

  let programBtnPrev = document.querySelector('.i-practice-pagination__btn-prev'),
    programBtnNext = document.querySelector('.i-practice-pagination__btn-next');

  let programPagination = document.querySelectorAll('.i-practice-pagination mark');

    let changeProgram = () => {
      if (current < last) {
        programPagination[0].innerText = current++;
      }

    }

  programBtnPrev.addEventListener('click', () => {
    if (+programPagination[0].innerText > 1) {
      programPagination[0].innerText = +programPagination[0].innerText - 1;
    }
  })

  programBtnNext.addEventListener('click', () => {
    if (+programPagination[0].innerText < +programPagination[1].innerText) {
      programPagination[0].innerText = +programPagination[0].innerText + 1;
    }
  })


})();