import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

// Export floating shapes function for reuse in other pages
export function createFloatingShapes() {
  const shapes = document.querySelectorAll('.floating-shapes .shape-1, .floating-shapes .shape-2, .floating-shapes .shape-3');
  
  shapes.forEach((shape, index) => {
    // Add random movement variation
    const randomDelay = Math.random() * 2;
    const randomDuration = 6 + Math.random() * 4;
    
    shape.style.animationDelay = `${randomDelay}s`;
    shape.style.animationDuration = `${randomDuration}s`;
    
    // Add hover interaction
    shape.addEventListener('mouseenter', () => {
      shape.style.transform = 'scale(1.1)';
      shape.style.opacity = '0.9';
    });
    
    shape.addEventListener('mouseleave', () => {
      shape.style.transform = 'scale(1)';
      shape.style.opacity = '0.7';
    });
  });
}

// Enhanced counter functionality
export function enhancedSetupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
    
    // Add visual feedback
    element.style.transform = 'scale(1.1)'
    setTimeout(() => {
      element.style.transform = 'scale(1)'
    }, 150)
  }
  
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

// Only run the default Vite app code if we're on the main page
if (document.querySelector('#app')) {
  document.querySelector('#app').innerHTML = `
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
      </a>
      <h1>Hello Vite!</h1>
      <div class="card">
        <button id="counter" type="button"></button>
      </div>
      <p class="read-the-docs">
        Click on the Vite logo to learn more
      </p>
      <p style="margin-top: 2rem;">
        <a href="./register.html" style="color: #646cff; text-decoration: none; font-weight: 500;">
          → Check out the CampusG Registration Page
        </a>
      </p>
    </div>
  `

  setupCounter(document.querySelector('#counter'))
}