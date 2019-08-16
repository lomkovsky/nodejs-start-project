//alert('app.js loaded');

const weatherForm = document.querySelector('form');
const search =document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    console.log(location);
    const url = 'http://localhost:3000/weather?address=' + location;
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data);
            const temp = data.temperature;
            console.log(temp);
        };
    });
});
})