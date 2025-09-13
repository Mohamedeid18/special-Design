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
