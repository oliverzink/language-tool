// const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, l1, td, caption, span, a');
var text = document.querySelectorAll('p');
var checkPageButton = document.getElementById("button1");
checkPageButton.addEventListener('click', function () {
    var s = document.getElementById('pet-select');
    // var x = s.options[s.selectedIndex].value;
    // console.log(x);
    // chrome.storage.sync.set({ 'value': x}, function () {
    //     console.log('Settings saved', x);
    // });
});
function translateText(j, myarray, text, sourceLang, targetLang, apiKey, callback) {
    var url = "https://translation.googleapis.com/language/translate/v2?key=".concat(apiKey);
    var data = {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text',
    };
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var jsonResponse = JSON.parse(xhr.responseText);
            var translatedText = jsonResponse.data.translations[0].translatedText;
            myarray[j] = translatedText;
            callback(null, myarray);
        }
        else if (xhr.readyState === 4) {
            callback("Error ".concat(xhr.status, ": ").concat(xhr.statusText));
        }
    };
    xhr.send(JSON.stringify(data));
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
chrome.storage.sync.set({ 'foo': 'hello', 'bar': 'hi' }, function () {
    console.log('Settings saved');
});
console.log('hi');
// Read it using the storage API
chrome.storage.sync.get(['foo', 'bar'], function (items) {
    console.log(items, "hi");
});
for (var i = 0; i < text.length; i++) {
    var inhtml = text[i].innerHTML;
    var myarray = inhtml.split(" ");
    // let tarray = new Array()
    for (var j = 0; j < myarray.length; j += 7) {
        // const x = randomIntFromInterval(0, myarray.length - 1)
        var textToTranslate = myarray[j];
        var allowed = true;
        if (typeof textToTranslate === "undefined") {
            allowed = false;
        }
        else if (textToTranslate[0] == textToTranslate[0].toUpperCase() || textToTranslate.length > 10) {
            allowed = false;
        }
        var sourceLang = 'en';
        var targetLang = 'es';
        var apiKey = '';
        if (allowed == true) {
            translateText(j, myarray, textToTranslate, sourceLang, targetLang, apiKey, function (error, myarray) {
                if (error) {
                    console.error('Error:', error);
                }
                else {
                    // tarray.push(tran slatedText);
                    // console.log('Trarnslated text:', myarray[j]);
                    //                     // const outstr = myarray.slice(j+1).join(" ");
                    // let instr = "";
                    // if (j > 0){
                    //     instr += myarray.slice(0, j).join(" ");
                    // }
                    // console.log("INSTR", x);
                    // text[i].innerHTML = instr + ' <marker style="background-color:rgba(144,238,144,.5);">' + translatedText + "</marker> " + outstr;
                    // myarray[j] = ' <mark style="background-color:rgba(144,238,144,.5);">' + translatedText + '</mark> ';
                    // "<span class='replies'>5 Replies</span> <span class='comment'>Reply!</span>"
                    // text[i].innerHTML = " <span class='label'></span> "
                    // text[i].innerHTML.replace(textToTranslate, translatedText);
                    // text[i].style['background-color'] = '#90EE90';
                }
                // console.log(myarray[x]);
            });
        }
        // console.log(myarray[j] + "tj");
    }
    // let outhtml = '';
    // console.log(tarray);
    // for (let j = 0; j < myarray.length; j+=7){
    //     console.log('heh');
    //     let k = Math.floor(j/7);
    //     if (j + 7 < tarray.length){
    //         outhtml += tarray[k] + myarray.slice(j, j+7).join(" ");
    //         console.log(outhtml, "hi");
    //     }
    //     else{
    //         outhtml += tarray[k] + myarray.slice(j).join(" ");
    //     }
    // }
    // for (let m = 0; m < myarray.length; m++){
    //     outhtml += myarray[m];
    // }
    var outhtml = myarray.join(" ");
    // console.log(outhtml);
    text[i].innerHTML = outhtml;
}
