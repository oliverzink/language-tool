console.log('hello worldee');
const text = document.querySelectorAll('p');

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

for (let i=0; i < text.length; i++){
    let inhtml = text[i].innerHTML;
    let myarray = inhtml.split(" ");
    text[i].innerHTML = "testing" + myarray.slice(1).join(" ");
}