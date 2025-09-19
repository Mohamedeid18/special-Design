//scroll to top button
let mybutton = document.querySelector('.scroll-to-top');
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.documentElement.scrollTop > 500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
mybutton.addEventListener('click', function(){
  // document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
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
if(localStorage.getItem('background-option') !== null) {
  document.querySelectorAll('.setting-box .option-content span').forEach(element => {
    element.classList.remove('active');
    if(element.dataset.background === localStorage.getItem('background-option')) {
      element.classList.add('active');
    }
  });
}
// Toggle Settings Box
document.querySelector('.setting-box .toggle-setting i').addEventListener('click', function() {
  this.classList.toggle('fa-spin');
  document.querySelector('.setting-box').classList.toggle('switch-setting-box');
});
// Change Theme Color
const colorOptions = document.querySelectorAll('.colors-list .color-option');
colorOptions.forEach(li => {
  li.addEventListener('click', (e)=> {
    const selectedColor = e.target.getAttribute('data-color');
    document.documentElement.style.setProperty('--main-color', selectedColor);
    localStorage.setItem('color-option', selectedColor);
    handleActive(e);
  });
});
// Random Background Option
let backgroundInterval;
const randomBackgrounds = document.querySelectorAll('.setting-box .option-content span');
randomBackgrounds.forEach(span => {
  span.addEventListener('click', (e) => {
    const backgroundOption = e.target.dataset.background;
    localStorage.setItem('background-option', backgroundOption);
    handleActive(e);
    // Handle Background Option
    if(e.target.dataset.background === 'Yes') {
      randomBackgroundsFunc(localStorage.getItem('background-option'));
    } else {
      randomBackgroundsFunc(localStorage.getItem('background-option'));
    }
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
function randomBackgroundsFunc(x) {
  if( x ==='Yes') {
  backgroundInterval = setInterval(() => {
  const randomIndex = Math.floor(Math.random() * landingPageBackgrounds.length);
  landingPage.style.backgroundImage = landingPageBackgrounds[randomIndex];
}, 5000);
  }else {
    clearInterval(backgroundInterval);
  }
}
randomBackgroundsFunc(localStorage.getItem('background-option'));
// End Landing Page Background Image
// Skills Animation
const ourSkills = document.querySelector('.skills');
const skillProgressSpans = document.querySelectorAll('.skill-progress span');
window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight >= ourSkills.offsetTop + ourSkills.offsetHeight -20) {
    skillProgressSpans.forEach(span => {
      span.style.width = span.dataset.progress;
    });
  }
});
// End Skills Animation
// Create Popup With The Image
(function () {
  const overlays = document.querySelectorAll('.gallery .gallery-overlay');
// Get Associated Image
  function getAssociatedImage(overlay) {
    let prev = overlay.previousElementSibling;
    while (prev && prev.tagName !== 'IMG') {
      prev = prev.previousElementSibling;
    }
    if (prev && prev.tagName === 'IMG') return prev;
    if (overlay.parentElement) {
      const img = overlay.parentElement.querySelector('img');
      if (img) return img;
    }
    return null;
  }
// Click On Overlay
  overlays.forEach(overlayEl => {
    overlayEl.addEventListener('click', () => {
      const images = Array.from(document.querySelectorAll('.gallery img'));
      let currentImg = getAssociatedImage(overlayEl);
      if (!currentImg) {
        console.warn('No image found for this overlay.');
        return;
      }
// Find Index of Current Image
      let idx = images.indexOf(currentImg);
      if (idx === -1) {
        idx = images.findIndex(i => i.src === (currentImg.src || ''));
        if (idx === -1) { console.warn('Image not found in gallery images list'); return; }
      }
// Create Overlay
      const dark = document.createElement('div');
      dark.className = 'overlay-popup';
      document.body.appendChild(dark);
// Popup Box
      const popup = document.createElement('div');
      popup.className = 'popup-box';
// Popup Image
      const popupImg = document.createElement('img');
      popupImg.src = images[idx].src;
      popup.appendChild(popupImg);
// Previous Button
      const prevBtn = document.createElement('span');
      prevBtn.className = 'prev-popup';
      prevBtn.textContent = '<';
      popup.appendChild(prevBtn);
// Next Button
      const nextBtn = document.createElement('span');
      nextBtn.className = 'next-popup';
      nextBtn.textContent = '>';
      popup.appendChild(nextBtn);
// Close Button
      const closeBtn = document.createElement('span');
      closeBtn.className = 'close-popup';
      closeBtn.textContent = 'X';
      popup.appendChild(closeBtn);
      document.body.appendChild(popup);
// Show Image Function
      function showIndex(i) {
        idx = (i + images.length) % images.length; 
        popupImg.src = images[idx].src;
      }
// Next & Previous Buttons
      prevBtn.addEventListener('click', () => showIndex(idx - 1));
      nextBtn.addEventListener('click', () => showIndex(idx + 1));
// Close Popup
      function removePopup() {
        popup.remove();
        dark.remove();
      }
      closeBtn.addEventListener('click', removePopup);
      dark.addEventListener('click', removePopup);
    });
  });
})();
// select All Bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
//select All Links
const allLinks = document.querySelectorAll('.landing-area .links a');
function scrollToSection(elements) {
  elements.forEach(ele => {
    ele.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({ behavior: 'smooth' });
    });
  });
}
scrollToSection(allBullets);
scrollToSection(allLinks);
// Handle Active State
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll('.active').forEach(element => {
    element.classList.remove('active');
  });
  ev.target.classList.add('active');
}
// Bullets Option
let bulletsContainer = document.querySelector('.nav-bullets');
const bulletsSpans = document.querySelectorAll('.setting-box .bullets-option span');
if(localStorage.getItem('bullets-option') !== null) {
  bulletsSpans.forEach(span => {
    span.classList.remove('active');
  });
  if(localStorage.getItem('bullets-option') === 'show') {
    bulletsContainer.style.display = 'block';
    document.querySelector('.bullets-option .yes').classList.add('active');
  } else {
    bulletsContainer.style.display = 'none';
    document.querySelector('.bullets-option .no').classList.add('active');
  }
}
bulletsSpans.forEach(span => {
  span.addEventListener('click', (e) => {
    if(span.dataset.display === 'show') {
      bulletsContainer.style.display = 'block';
    } else {
      bulletsContainer.style.display = 'none';
    }
    handleActive(e);
    localStorage.setItem('bullets-option', span.dataset.display);

  });
});
