// Toggle Settings Box
if(localStorage.getItem('color-option') !== null) {
  document.documentElement.style.setProperty('--main-color', localStorage.getItem('color-option'));
  document.querySelectorAll('.colors-list li').forEach(element => {
    element.classList.remove('active');
    if(element.getAttribute('data-color') === localStorage.getItem('color-option')) {
    element.classList.add('active');
  }
  });

}
document.querySelector('.setting-box .toggle-setting i').addEventListener('click', function() {
  this.classList.toggle('fa-spin');
  document.querySelector('.setting-box').classList.toggle('switch-setting-box');
});
const colorOptions = document.querySelectorAll('.colors-list .color-option');
colorOptions.forEach(li => {
  li.addEventListener('click', (e)=> {
    const selectedColor = e.target.getAttribute('data-color');
    document.documentElement.style.setProperty('--main-color', selectedColor);
    localStorage.setItem('color-option', selectedColor);
    e.target.parentElement.querySelectorAll('.active').forEach(element => {
      element.classList.remove('active');
    });

    e.target.classList.add('active');
  });
});

// Change Landing Page Background Image
const landingPage = document.querySelector('.landing-page');
const landingPageBackgrounds = [
  'url("image/0.jpg")',
  'url("image/1.jpg")',
  'url("image/2.jpg")',
  'url("image/3.jpg")',
  'url("image/4.jpg")',
];
setInterval(() => {
  const randomIndex = Math.floor(Math.random() * landingPageBackgrounds.length);
  landingPage.style.backgroundImage = landingPageBackgrounds[randomIndex];
}, 5000);
