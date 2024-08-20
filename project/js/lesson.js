// PHONE BLOCK 

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_span');

const regExp = /\+996 [2579]\d{2}-\d{2}-\d{2}-\d{2}/;

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneSpan.textContent = 'Valid phone number!';
        phoneSpan.style.color = 'green';
    } else {
        phoneSpan.textContent = 'Invalid phone number!';
        phoneSpan.style.color = 'red';
    }
};

const tapContentBlocks = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelectorAll('.tab_content_item');
const tabParent = document.querySelector('.tab_content_items');

const hidetTapContentBlocks = () => {
    tapContentBlocks.forEach((item) => {
        item.style.display = 'none';
    });
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (index = 0) => {
    tapContentBlocks[index].style.display = 'block';
    tabItems[index].classList.add('tab_content_item_active');
};

hidetTapContentBlocks();
showTabContent();

tabParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((item, index) => {
            if (event.target === item) {
                hidetTapContentBlocks();
                showTabContent(index);
            }
        });
    }
};

let currentTabIndex = 0;

const changeTabContent = () => {
    currentTabIndex = (currentTabIndex + 1) % tapContentBlocks.length;
    hidetTapContentBlocks();
    showTabContent(currentTabIndex);
};

setInterval(changeTabContent, 4000);


// //converter
const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const euroInput = document.querySelector('#eur');

const converter = (element, targetElements) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/converter.json");
        request.setRequestHeader("Content-type", "application/json");
        request.send();
        request.onload = () => {
            const data = JSON.parse(request.response);
            if (element.id === 'som') {
                targetElements.usd.value = (element.value / data.usd).toFixed(2);
                targetElements.eur.value = (element.value / data.eur).toFixed(2);
            }
            if (element.id === 'usd') {
                targetElements.som.value = (element.value * data.usd).toFixed(2);
                targetElements.eur.value = (element.value * data.usd / data.eur).toFixed(2);
            }
            if (element.id === 'eur') {
                targetElements.som.value = (element.value * data.eur).toFixed(2);
                targetElements.usd.value = (element.value * data.eur / data.usd).toFixed(2);
            }
        };
    };
};

converter(somInput, { usd: usdInput, eur: euroInput });
converter(usdInput, { som: somInput, eur: euroInput });
converter(euroInput, { som: somInput, usd: usdInput });




const cardBlock = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')

let cardId = 1; 
const TOTAL_CARDS = 200; 


const updateCard = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
        .then(response => response.json())
        .then(data => {
            cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <p>${data.id}</p>
            `;
        });
};


updateCard(cardId);

btnNext.onclick = () => {
    cardId = (cardId % TOTAL_CARDS) + 1; 
    updateCard(cardId);
};


btnPrev.onclick = () => {
    cardId = (cardId - 2 + TOTAL_CARDS) % TOTAL_CARDS + 1;
    updateCard(cardId);
};


// 2

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

