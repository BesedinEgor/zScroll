//3d Scroll

let zSpacing = -1000, //расстояние между фреймами
  lastPost = zSpacing / 5, //стартовая позиция при обновлении страницы
  $frames = document.getElementsByClassName('frame'),
  frames = Array.from($frames),
  zVals = [];

window.onscroll = () => {
  const top = document.documentElement.scrollTop,
    delta = lastPost - top;

  lastPost = top;

  frames.forEach((n, i) => {
    zVals.push(i * zSpacing + zSpacing);
    zVals[i] += delta * -5.5; //скорость пролистывания
    const frame = frames[i],
      transform = `translateZ(${zVals[i]}px)`,
      opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0;
    frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`);
  });
};

window.scrollTo(0, 1);

//audio

const soundButton = document.querySelector('.soundbutton'),
  audio = document.querySelector('.audio');

soundButton.addEventListener('click', () => {
  soundButton.classList.toggle('paused');
  audio.paused ? audio.play() : audio.pause();
});

//выключение audio при переходе на другую вкладку
window.onfocus = () =>
  soundButton.classList.contains('paused') ? audio.pause() : audio.play();
window.onblur = () => audio.pause();
