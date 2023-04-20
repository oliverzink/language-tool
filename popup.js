console.log('HEIEJEJJE');

document.addEventListener('DOMContentLoaded', function(){
    console.log('HEIEJEJJE');

    var checkPageButton = document.getElementById("button1");
    checkPageButton.addEventListener('click', function(){
        console.log('HEIEJEJJE');

        var s = document.getElementById('pet-select');
        var x = s.options[s.selectedIndex].value;
        console.log(x);
        console.log('HEIEJEJJE');
        chrome.storage.sync.set({ 'value': x}, function () {
            console.log('Settings saved', x);
        });
        
    }, false);
}, false);