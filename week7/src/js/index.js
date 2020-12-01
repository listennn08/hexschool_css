import '../scss/main.scss';
import AOS from 'aos';

AOS.init();

const doc = document.documentElement;

const second = document.querySelector('#second');
const secondBackground = second.querySelector('.slogan-img .slogan-img');
const secondSubtitle_1 = second.querySelector('.slogan-subtitle.mb-4');
const secondSubtitle_2 = second.querySelector('.slogan-subtitle.mb-5');

const third = document.querySelector('#third');
const thirdBackground = third.querySelector('.slogan-img .slogan-img');
const thirdSubtitle_1 = third.querySelector('.slogan-subtitle.mt-5.mb-4');
const thirdSubtitle_2 = [...third.querySelectorAll('.slogan-subtitle')][1];

const fourth = document.querySelector('#fourth');

window.onscroll = function() {
  if (
    doc.scrollTop >= second.offsetTop
      && doc.scrollTop <= third.offsetTop
  ) {
    const move = (second.offsetTop - doc.scrollTop) * 0.1;
    if (move > -50) {
      secondBackground.style = 
        `background: url('https://github.com/hexschool/webLayoutTraining1st/blob/master/week7/img2.jpg?raw=true') no-repeat left ${50+move}% center / cover`;
      secondSubtitle_1.style = `transform: translateX(${move}px;)`;
      secondSubtitle_2.style = `transform: translateX(${Math.abs(move)}px;)`;
    }
  } else if (
    doc.scrollTop >= third.offsetTop
      && doc.scrollTop <= fourth.offsetTop
  ) {
    const move = (third.offsetTop - doc.scrollTop) * 0.1;
    if (move > -50) {
      thirdBackground.style = `background: url('https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/week7/img3.jpg') no-repeat right ${50 + move}% center / cover`;
      thirdSubtitle_1.style = `transform: translateX(${move}px);`;
      thirdSubtitle_2.style = `transform: translateX(${Math.abs(move)}px);`;
    }
  } else if (
    doc.scrollTop >= fourth.offsetTop
      && doc.scrollTop <= fourth.offsetTop + fourth.clientHeight
  ) {
    const move = (fourth.offsetTop - doc.scrollTop) * 0.05;
    if (move > -30) {
      fourth.style = `background: url('https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/week7/img4.jpg') no-repeat top ${20 + move}% center / cover`;
    }
  }
}