var text = document.querySelectorAll('h1, h2, h3, h4, h5, p, l1, td, caption, span, a');
// const text = document.querySelectorAll('p');
function translateText(x, outbit, text, sourceLang, targetLang, apiKey, callback) {
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
            // console.log(jsonResponse);
            // const translatedText = jsonResponse.data.translations.translatedText;
            var translatedText = jsonResponse.data.translations[0].translatedText;
            // for (let i=0; i < tarray.length; i++){
            //     console.log('hi');
            //     console.log(tarray[i]);
            // }
            // console.log(translatedText);
            // html.innerHTML = translatedText;
            callback(null, translatedText);
        }
        else if (xhr.readyState === 4) {
            callback("Error ".concat(xhr.status, ": ").concat(xhr.statusText));
        }
    };
    // console.log(JSON.stringify(data));
    xhr.send(JSON.stringify(data));
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var _loop_1 = function (i) {
    var inhtml = text[i].innerHTML;
    var myarray = inhtml.split(" ");
    // for (let j =0; j < 7; j++){
    var x = randomIntFromInterval(0, myarray.length - 1);
    var textToTranslate = myarray[x];
    var allowed = true;
    if (textToTranslate == null || textToTranslate.length > 10) {
        allowed = false;
    }
    else if (!textToTranslate.match(/^[a-z]+$/)) {
        allowed = false;
    }
    // if (textToTranslate[0] == textToTranslate[0].toUpperCase() || textToTranslate.length > 10){
    //   allowed = false;
    // }
    var sourceLang = 'en';
    var targetLang = 'es';
    var apiKey = 'KEY RETRACTED because it is my personal api key';
    // let styles = '';
    if (allowed == true) {
        translateText(x, myarray[x], textToTranslate, sourceLang, targetLang, apiKey, function (error, translatedText) {
            if (error) {
                console.error('Error:', error);
            }
            else {
                myarray[x] = translatedText;
                console.log('Translated text:', translatedText);
                var outstr = myarray.slice(x + 1).join(" ");
                var instr = "";
                if (x > 0) {
                    instr += myarray.slice(0, x).join(" ");
                }
                // styles = `
                //   mark.comment{
                //     display: none;
                //   }
                //   mark.replies{
                //     display: inline;
                //   }
                //   mark:hover .replies{
                //     display: none;
                //   }
                //   mark:hover{
                //     display: none;
                // }
                // `
                // console.log(styles);
                // let styleSheet = document.createElement("style");
                // styleSheet.innerText = styles;
                // document.head.appendChild(styleSheet);
                // console.log(styleSheet);
                console.log("INSTR", x);
                // text[i].innerHTML = outstr;
                text[i].innerHTML = instr + ' <marker style="background-color:rgba(144,238,144,.5);">' + translatedText + "</marker> " + outstr;
                // myarray[x] = ' <mark style="background-color:rgba(144,238,144,.5);">' + translatedText+"</mark> ";
                // "<span class='replies'>5 Replies</span> <span class='comment'>Reply!</span>"
                // text[i].innerHTML = " <span class='label'></span> "
                // text[i].innerHTML.replace(textToTranslate, translatedText);
                // text[i].style['background-color'] = '#90EE90';
            }
            console.log(myarray[x]);
        });
    }
    console.log(myarray[x]);
};
for (var i = 0; i < text.length; i++) {
    _loop_1(i);
}
