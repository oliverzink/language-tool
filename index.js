console.log('hello worldee');
var text = document.querySelectorAll('p');
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
for (var i = 0; i < text.length; i++) {
    var inhtml = text[i].innerHTML;
    var myarray = inhtml.split(" ");
    text[i].innerHTML = "testing" + myarray.slice(1).join(" ");
}
