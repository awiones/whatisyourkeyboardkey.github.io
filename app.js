document.addEventListener('keydown', function (event) {
  const keyCodeDisplay = document.querySelector('.key-code');
  const keyHistory = document.getElementById('key-history');

  keyCodeDisplay.textContent = `You pressed key: "${event.key}"\nThis is the code: ${event.keyCode}`;
  
  const newHistoryItem = document.createElement('li');
  newHistoryItem.classList.add('list-group-item');
  newHistoryItem.textContent = `Key: "${event.key}", Code: ${event.keyCode}`;
  
  if (keyHistory.children.length === 1 && keyHistory.children[0].textContent === 'No key presses recorded yet.') {
    keyHistory.innerHTML = '';
  }
  keyHistory.insertBefore(newHistoryItem, keyHistory.firstChild);
  
  if (keyHistory.children.length > 10) {
    keyHistory.removeChild(keyHistory.lastChild);
  }

  keyCodeDisplay.style.color = '#007bff';
  keyCodeDisplay.style.transition = 'color 0.3s ease, transform 0.3s ease';
  keyCodeDisplay.style.transform = 'scale(1.1)';

  setTimeout(() => {
    keyCodeDisplay.style.color = '#333';
    keyCodeDisplay.style.transform = 'scale(1)';
  }, 500);
});

const darkModeSwitch = document.getElementById('dark-mode-switch');
darkModeSwitch.addEventListener('change', function () {
  document.body.classList.toggle('dark-mode');
  const textElements = document.querySelectorAll('.key-code, .list-group-item');

  if (document.body.classList.contains('dark-mode')) {
    textElements.forEach(element => {
      element.style.color = '#fff';
    });
  } else {
    textElements.forEach(element => {
      element.style.color = '#000';
    });
  }
});

const clearHistoryButton = document.getElementById('clear-history');
clearHistoryButton.addEventListener('click', function () {
  const keyHistory = document.getElementById('key-history');
  keyHistory.innerHTML = '<li class="list-group-item">No key presses recorded yet.</li>';
});

const draggableBox = document.getElementById('key-history-box');
let offsetX = 0, offsetY = 0;
let offsetLeft = 130, offsetRight = -170, offsetTop = 75, offsetBottom = 10;

function updateBoxBoundaries() {
  const boxWidth = draggableBox.offsetWidth;
  const boxHeight = draggableBox.offsetHeight;
  
  const maxLeft = window.innerWidth - boxWidth - 20; 
  const maxTop = window.innerHeight - boxHeight - 20; 
  
  const newLeft = Math.max(20 + offsetLeft, Math.min(draggableBox.offsetLeft, maxLeft - offsetRight));
  const newTop = Math.max(20 + offsetTop, Math.min(draggableBox.offsetTop, maxTop - offsetBottom));
  
  draggableBox.style.left = `${newLeft}px`;
  draggableBox.style.top = `${newTop}px`;
}

draggableBox.addEventListener('mousedown', function (e) {
  offsetX = e.clientX - draggableBox.offsetLeft;
  offsetY = e.clientY - draggableBox.offsetTop;
  
  document.onmousemove = function (e) {
    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    const maxLeft = window.innerWidth - draggableBox.offsetWidth - 20;
    const maxTop = window.innerHeight - draggableBox.offsetHeight - 20;
    
    newLeft = Math.max(20 + offsetLeft, Math.min(newLeft, maxLeft - offsetRight));
    newTop = Math.max(20 + offsetTop, Math.min(newTop, maxTop - offsetBottom));
    
    draggableBox.style.left = `${newLeft}px`;
    draggableBox.style.top = `${newTop}px`;
  };
  
  document.onmouseup = function () {
    document.onmousemove = null;
    document.onmouseup = null;
  };
});

window.addEventListener('resize', updateBoxBoundaries);
