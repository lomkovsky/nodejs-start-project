const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');
const messageThree = document.querySelector('#messageThree');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Please wait...';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    const url = '/weather?address=' + location;
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        } else {
            console.log(data);
            messageOne.textContent = 'For plase named ' + data.place + ' timezone ' + data.timezome;
            messageTwo.textContent = 'Current temperature is ' + data.temperature + ' celsius degrees';
            messageThree.textContent = 'Forecast is ' + data.forecast;
        };
    });
});
});
