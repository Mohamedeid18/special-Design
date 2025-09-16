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
    if(element.getAttribute('data-background') === localStorage.getItem('background-option')) {
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
    e.target.parentElement.querySelectorAll('.active').forEach(element => {
      element.classList.remove('active');
    });
    e.target.classList.add('active');
  });
});
// Random Background Option
let backgroundInterval;
const randomBackgrounds = document.querySelectorAll('.setting-box .option-content span');
randomBackgrounds.forEach(span => {
  span.addEventListener('click', (e) => {
    const backgroundOption = e.target.getAttribute('data-background');
    localStorage.setItem('background-option', backgroundOption);
    e.target.parentElement.querySelectorAll('.active').forEach(element => {
      element.classList.remove('active');
    });
    e.target.classList.add('active');
    // Handle Background Option
    if(e.target.getAttribute('data-background')) {
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
  if (window.scrollY + window.innerHeight >= ourSkills.offsetTop + ourSkills.offsetHeight) {
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