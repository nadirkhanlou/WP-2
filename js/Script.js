function CheckPersianInput(input) {
    var regex = /^[\u0600-\u06FF\s]*$/;
    if (!regex.test(input.value)) {
        alert("لطفا زبان صفحه کلید خود را به فارسی تغییر دهید.");
        input.value = "";
        return false;
    }
    return true;
}

function CheckEnglishInput(input) {
    var regex = /^[A-Za-z]*$/;
    if (!regex.test(input.value)) {
        alert("لطفا زبان صفحه کلید خود را به انگلیسی تغییر دهید.");
        //input.value = "";
        input.value = input.value.substring(0, input.value.length - 1)
        return false;
    }
    return true;
}
function ValidateNameInput(elem) {
    elementName = elem.name;
    errorElementName = elementName.substring(5, elementName.length) + "-message";
    inputText = elem.value;
    if (inputText.length < 3 || inputText.length > 50) {
        if (inputText == "") {
            document.getElementById(errorElementName).innerHTML = "این فیلد نمی‌تواند خالی باشد.";
        } else {
            document.getElementById(errorElementName).innerHTML = "این فیلد نمی‌تواند کمتر از 3 یا بیشتر از 50 حرف باشد.";
        }
        document.getElementById(errorElementName).style = "color: red;";
        elem.style = "border: solid red;";
        return false;
    } else {
        document.getElementById(errorElementName).innerHTML = "";
        elem.style = "border: solid green;";
        return true;
    }
}

function ValidateEmail(elem) {
    elementName = elem.name;
    errorElementName = elementName.substring(5, elementName.length) + "-message";

    // Regular expression provided by Dave Black on https://regexlib.com/
    var regex = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
    if (elem.value == "") {
        document.getElementById(errorElementName).innerHTML = "آدرس ایمیل نمی‌تواند خالی باشد";
        document.getElementById(errorElementName).style = "color: red;";
        elem.style = "border: solid red;";
        return false;
    } else if (!regex.test(elem.value)) {
        document.getElementById(errorElementName).innerHTML = "فرمت آدرس ایمیل وارد شده معتبر نیست";
        document.getElementById(errorElementName).style = "color: red;";
        elem.style = "border: solid red;";
        return false;
    } else {
        document.getElementById(errorElementName).innerHTML = "";
        elem.style = "border: solid green;";
        return true;
    }
}