window.onload = function () {
    String.prototype.toPersianDigits= function(){
        var id = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        return this.replace(/[0-9]/g, function(w){
         return id[+w]
        });
    }

    document.getElementsByName("form-phone-number")[0].addEventListener('input', function (e) {
        let x = e.target.value.toPersianDigits().replace(/[^۰-۹]/g, '').match(/([۰-۹]{0,4})([۰-۹]{0,3})([۰-۹]{0,4})/);
        e.target.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '');
    });

    document.getElementsByName("form-ssn")[0].addEventListener('input', function (e) {
        let x = e.target.value.toPersianDigits().replace(/[^۰-۹]/g, '').match(/([۰-۹]{0,3})([۰-۹]{0,6})([۰-۹]{0,1})/);
        e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}
// document.getElementsByName("form-phone-number")[0].elem.addEventListener('input', function (e) {
//     var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
//     e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
// });

function CheckPersianInput(elem) {
    let elementName = elem.name;
    let messageElementName = elementName.substring(5, elementName.length) + "-message";
    let inputText = elem.value;

    let regex = /^[\u0600-\u06FF\s]*$/;
    if (!regex.test(inputText)) {
        document.getElementById(messageElementName).innerHTML = "فقط حروف فارسی مجاز هستند.";
        document.getElementById(messageElementName).style = "color: orange";
        elem.style = "border: solid orange;";
        let firstViolationIdx = inputText.search(/[^\u0600-\u06FF\s]/)
        // alert(inputText.substring(0, firstViolationIdx));
        elem.value = inputText.substring(0, firstViolationIdx);
        return false;
    } else {
        document.getElementById(messageElementName).innerHTML = "";
        document.getElementById(messageElementName).style = "";
        elem.style = "";  
        return true;
    }
}

function CheckEnglishInput(elem) {
    let elementName = elem.name;
    let messageElementName = elementName.substring(5, elementName.length) + "-message";
    let inputText = elem.value;

    let regex = /^[A-Za-z]*$/;
    if (!regex.test(inputText)) {
        document.getElementById(messageElementName).innerHTML = "فقط حروف انگلیسی مجاز هستند.";
        document.getElementById(messageElementName).style = "color: orange";
        let firstViolationIdx = inputText.search(/[^A-Za-z]/)
        elem.value = inputText.substring(0, firstViolationIdx);
        return false;
    } else {
        document.getElementById(messageElementName).innerHTML = "";
        document.getElementById(messageElementName).style = "";
        elem.style = "";  
        return true;
    }
}
function ValidateNameInput(elem) {
    let elementName = elem.name;
    let messageElementName = elementName.substring(5, elementName.length) + "-message";
    let inputText = elem.value;

    if (inputText.length < 3 || inputText.length > 50) {
        if (inputText == "") {
            document.getElementById(messageElementName).innerHTML = "این فیلد نمی‌تواند خالی باشد.";
        } else {
            document.getElementById(messageElementName).innerHTML = "این فیلد نمی‌تواند کمتر از 3 یا بیشتر از 50 حرف باشد.";
        }
        document.getElementById(messageElementName).style = "color: red;";
        elem.style = "border: solid red;";
        return false;
    } else {
        document.getElementById(messageElementName).innerHTML = "";
        elem.style = "border: solid green;";
        return true;
    }
}

function ValidateEmail(elem) {
    let elementName = elem.name;
    let messageElementName = elementName.substring(5, elementName.length) + "-message";
    let inputText = elem.value;

    // Regular expression provided by Dave Black on https://regexlib.com/
    let regex = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
    if (inputText == "") {
        document.getElementById(messageElementName).innerHTML = "آدرس ایمیل نمی‌تواند خالی باشد";
        document.getElementById(messageElementName).style = "color: red;";
        elem.style = "border: solid red;";
        return false;
    } else if (!regex.test(inputText)) {
        document.getElementById(messageElementName).innerHTML = "فرمت آدرس ایمیل وارد شده معتبر نیست";
        document.getElementById(messageElementName).style = "color: red;";
        elem.style = "border: solid red;";
        return false;
    } else {
        document.getElementById(messageElementName).innerHTML = "";
        elem.style = "border: solid green;";
        return true;
    }
}

function KeepPhoneNumberPrefix(elem) {
    let inputText = elem.value;
    if (inputText.substring(0,2) != "۰۹"){

        elem.value = "۰۹" + inputText.substring(1, inputText.length);
        elem.setSelectionRange(2, 2);
    }
}