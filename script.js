(function () {

  let preview = document.querySelector('.i-practice-preview'),
    labelsList = document.querySelector('.i-practice-labels'),
    optionsWrap = document.querySelectorAll('.i-practice-options__wrap'),
    btnsNext = document.querySelectorAll('.i-practice-options .btn-next'),
    btnBack = document.querySelector('.i-practice__back'),
    breadcrumb = document.querySelector('.i-practice-breadcrumb'),
    btnOpenSettingVolume = document.querySelector('.i-practice__settings-volume-btn'),
    btnOpenSettingVolumeWrap = document.querySelector('.i-practice__settings-volume'),
    btnOpenSelectMusic = document.querySelector('.settings-volume__btn-music'),
    btnCloseSelectMusic = document.querySelector('.settings-volume__music-close'),
    btnCheckMusic = document.querySelector('.settings-volume__music-status');

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

    cloneLi.setAttribute('data-steep', currentSteep);

    breadcrumb.append(cloneLi);

    for (let i = 0; i < optionsWrap.length; i++) {
      optionsWrap[i].classList.add('hide');
      i === currentSteep - 1 ? optionsWrap[i].classList.remove('hide') : optionsWrap[i].classList.add('hide');
    }

    let breadcrumbItem = document.querySelectorAll('.i-practice-breadcrumb__item');

    for (let i = 2; i < breadcrumbItem.length - 1; i++) {
      breadcrumbItem[i].addEventListener('click', () => {
        let targetSteep = breadcrumbItem[i].getAttribute('data-steep');

        for (let className of preview.classList) {
          if (className.indexOf('steep-') > -1) {
            preview.classList.remove(className);
          }
        }

        preview.classList.add(`steep-${targetSteep}`);

        while (breadcrumbItem[i].nextElementSibling) {
          breadcrumbItem[i].nextElementSibling.remove();
        }

        let x = i - 2;

        while (x < labelsList.children.length) {
          labelsList.children[x].remove();
          x++;
        }

        let removeActiveAsan = (elems) => {
          for (let el of elems) {
            el.classList.remove('active');
          }
        }

        removeActiveAsan(document.querySelectorAll('.i-practice-program__item'));
        removeActiveAsan(document.querySelectorAll('.i-practice-player-list__item'));

        currentSteep = targetSteep;
      })
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
        i === currentSteep - 1 ? optionsWrap[i].classList.remove('hide') : optionsWrap[i].classList.add('hide');
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
    elem.previousElementSibling.style.width = (elem.value / 30 * 100) + '%';
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
      } else {
        btnCheckMusic.querySelector('span').innerText = 'Включить музыку';
      }

      btnCheckMusic.classList.toggle('music-on');
    })

    let navWrap = document.querySelector('.i-practice-nav-wrap');
    let practiceContent = document.querySelector('.i-practice-content');


    let changeParent = (width) => {
      if (width < 768 && !btnOpenSettingVolumeWrap.parentElement.classList.contains('i-practice-nav-wrap')) {
        navWrap.append(btnOpenSettingVolumeWrap);
        navWrap.prepend(btnBack);
      } else {
        if (width >= 768 && btnOpenSettingVolumeWrap.parentElement.classList.contains('i-practice-nav-wrap')) {
          preview.append(btnOpenSettingVolumeWrap);
          practiceContent.prepend(btnBack);
        }
      }

      let btnsPlayTablet = document.querySelectorAll('.tablet-play');

      if (width <= 1023 && width > 767 && !btnsPlayTablet[0]) {


        let programItems = document.querySelectorAll('.i-practice-program__item');

        for (let item of programItems) {
          let btnClone = document.querySelector('#btn-play').cloneNode(true);
          btnClone.classList.add('tablet-play');
          btnClone.removeAttribute('id');

          btnClone.addEventListener('click', startAsan);
          item.append(btnClone);
        }
      } else {

        if ((width > 1023 && btnsPlayTablet[0]) || (width < 768 && btnsPlayTablet[0])) {
          for (let btn of btnsPlayTablet) {
            btn.remove();
          }
        }
      }
    }

    changeParent(window.innerWidth);


    window.addEventListener('resize', () => {
      changeParent(window.innerWidth);
    })
  })

  btnOpenSettingVolume.addEventListener('click', () => {
    btnOpenSettingVolumeWrap.classList.toggle('open');
  })

  btnOpenSelectMusic.addEventListener('click', () => {
    btnOpenSettingVolumeWrap.classList.toggle('select-music');
  })

  btnCloseSelectMusic.addEventListener('click', () => {
    btnOpenSettingVolumeWrap.classList.toggle('select-music');
  })

  let programList = document.querySelector('.i-practice-program');
  let programItem = programList.querySelectorAll('.i-practice-program__item');

  let addEventActive = (elems) => {
    for (let item of elems) {
      item.addEventListener('click', () => {

        for (let elem of elems) {
          elem.classList.remove('active');
        }

        item.classList.add('active');
        preview.classList.add('start-active');

      })
    }
  }

  addEventActive(programItem);

  let observer = new MutationObserver(mutations => {
    programItem = programList.querySelectorAll('.i-practice-program__item');

    addEventActive(programItem);

  })

  observer.observe(programList, {
    childList: true
  });


  let boxImgPreview = document.querySelectorAll('.i-practice-program__img');

  for (let boxPreview of boxImgPreview) {
    boxPreview.addEventListener('click', () => {
      let sliderPreviewWrap = document.querySelector('.i-practice-program-preview__wrap');
      let listSlider = document.querySelector('.i-practice-program-preview__list');

      let createSlider = () => {
        let images = boxPreview.querySelectorAll('img');

        for (let img of images) {
          let li = document.createElement('li');
          li.classList.add('swiper-slide');
          let imgElement = document.createElement('img');
          imgElement.src = img.dataset.srcet;

          li.append(imgElement);
          listSlider.append(li);
        }


        let wrapSlider = document.querySelector('.i-practice-program-preview');
        wrapSlider.classList.remove('hide');

        let swiperPreview = new Swiper(sliderPreviewWrap, {
          navigation: {
            nextEl: ".i-practice-program-preview__next",
            prevEl: ".i-practice-program-preview__prev",
          },
        });
      }

      if (!sliderPreviewWrap.classList.contains('swiper-initialized')) {
        createSlider();
      } else {
        for (let child of listSlider.children) {
          child.remove();
        }

        createSlider();
      }

      window.addEventListener('click', (event) => {
        if (!event.target.classList.contains('i-practice-program-preview') && !event.target.closest('.i-practice-program-preview')
          && !event.target.classList.contains('i-practice-program__img') && !event.target.closest('.i-practice-program__img')) {
          let wrapSlider = document.querySelector('.i-practice-program-preview');
          wrapSlider.classList.add('hide');
        }
      })

    })
  }


  let btnStart = document.querySelector('.i-practice__start');


  let startAsan = () => {
    let currentProgram = document.querySelector('.i-practice-pagination span mark:first-child').innerHTML;
    let lengthProgram = document.querySelector('.i-practice-pagination span mark:last-child').innerHTML;
    nextSteep(currentProgram, lengthProgram);

    let swiper = new Swiper(".i-practice-player-slider", {
      pagination: {
        el: ".i-practice-player-slider__pagination",
      },
      navigation: {
        nextEl: ".i-practice-player-slider__next",
        prevEl: ".i-practice-player-slider__prev",
      },
    });

    let playItem = document.querySelectorAll('.i-practice-player-list__item');

    for (let i = 0; i < playItem.length; i++) {
      playItem[i].addEventListener('click', () => {
        for (let item of playItem) {
          item.classList.remove('active');
        }

        playItem[i].classList.add('active');
      })
    }
  }

  btnStart.addEventListener('click', startAsan);


  let programBtnPrev = document.querySelector('.i-practice-pagination__btn-prev'),
    programBtnNext = document.querySelector('.i-practice-pagination__btn-next');

  let programPagination = document.querySelectorAll('.i-practice-pagination mark');

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

  let btnPlayAsan = document.querySelector('.i-practice-player__play-btn');


  let playAsan = () => {
    btnPlayAsan.classList.toggle('pause');
  }

  btnPlayAsan.addEventListener('click', playAsan);


  // var file = "https://raw.githubusercontent.com/Maxim-Okolot/yoga/master/json/asanas.json";
  //
  //
  //
  // var xmlhttp = new XMLHttpRequest();
  // xmlhttp.onreadystatechange = function() {
  //   if (this.readyState == 4 && this.status == 200) {
  //     var myObj = JSON.parse(this.responseText);
  //     console.log(myObj);
  //   }
  // };
  // xmlhttp.open("GET", file, true);
  // xmlhttp.send();
})();