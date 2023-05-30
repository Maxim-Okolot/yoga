(function () {
  let preview = document.querySelector('.i-practice-preview');
  let labelsList = document.querySelector('.i-practice-labels');
  let optionsWrap = document.querySelectorAll('.i-practice-options__wrap');
  let btnsNext = document.querySelectorAll('.i-practice-options .btn-next');
  let btnBack = document.querySelector('.i-practice__back');
  let breadcrumb = document.querySelector('.i-practice-breadcrumb');

  let currentSteep = 1;


  let nextSteep = (val) => {
    preview.classList.remove(`steep-${currentSteep}`);
    currentSteep++;
    preview.classList.add(`steep-${currentSteep}`);

    let li = document.createElement('li'),
      cloneLi = li.cloneNode(true);

    li.classList.add('i-practice-labels__item');
    li.innerText = val;
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

})();