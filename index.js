const innerCard = document.querySelector('.inner-card');
const qrImage = document.querySelector('img');
const qrText = document.querySelector('input');
const btn = document.querySelector('button');
const qrCard = document.querySelector('.Qr-card');

const qrScanner = document.querySelector('.qr-scanner');
const qrScanner2 = document.querySelector('.qr-scanner2');


btn.addEventListener('click', (e) => {
  e.preventDefault();

  const inputValue = qrText.value;

  if (inputValue.length > 0) {
    btn.innerText = 'GENERATING QR CODE...'
    setTimeout(() => {
      qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputValue}`;
      qrCard.classList.add('active');
      btn.innerText = 'GENERATE'
    }, 2000);
    
    qrText.value = '';
  } else {
    qrText.classList.add('animate')
    setTimeout(() => {
      qrText.classList.remove('animate');
    }, 1000);
  }

});

qrScanner.addEventListener('click', () => {
  innerCard.style.transform = 'rotateY(-180deg)';
});

qrScanner2.addEventListener('click', () => {
  innerCard.style.transform = 'rotateY(0deg)';
});

const scanner = new Html5QrcodeScanner('reader', {
  qrbox: {
    width: 250,
    height: 250
  },
  fps: 20
});

scanner.render(success, error);

function success(result) {
  const resultElement = document.getElementById('result');
  const linkElement = document.createElement('a');
  linkElement.href = result;
  linkElement.textContent = result;

  resultElement.innerHTML = '';
  resultElement.appendChild(document.createElement('h2')).textContent = 'Success!';
  resultElement.appendChild(document.createElement('p')).appendChild(linkElement);

  scanner.clear();
  const readerElement = document.getElementById('reader');
  readerElement.parentNode.removeChild(readerElement);
}

function error(err) {
  console.error(err);
}
