window.onload = function () {
    // year = /([۱][۳]([۱-۸][۰-۹]|[۹][۰]))/;
    // first_sixth_months = /([۰][۱-۶]([۰][۱-۹]|[۱-۲][۰-۹]|[۳][۰-۱]))/;
    // second_sixth_months = /(([۰][۷-۹]|[۱][۰-۱])([۰][۱-۹]|[۱-۲][۰-۹]|[۳][۰]))/;
    // twelfth_month = /[۱][۲]([۰][۱-۹]|[۱-۲][۰-۹])/;
    // regex = /(([۱][۳]([۱-۸][۰-۹]|[۹][۰])))([۰][۱-۶]([۰][۱-۹]|[۱-۲][۰-۹]|[۳][۰-۱])|([۰][۷-۹]|[۱][۰-۱])([۰][۱-۹]|[۱-۲][۰-۹]|[۳][۰])|[۱][۲]([۰][۱-۹]|[۱-۲][۰-۹]))/;
    $(":input").inputmask();

    $("#form-test").inputmask({
        mask: "j",
        placeholder: "",
        definitions: {
            'j': { //basic year
                validator: "(19|20)\\d{2}",
                cardinality: 4,
                prevalidator: [
                  { validator: "[12]", cardinality: 1 },
                  { validator: "(19|20)", cardinality: 2 },
                  { validator: "(19|20)\\d", cardinality: 3 }
                ]
              },
        }
    });

    // Input mask for phone number
    $("#form-phone-number").inputmask({
        mask: "۰\\۹99 999 9999",
        onBeforeWrite: function (event, buffer, caretPos, opts) {   // Display Persian digits instead of English
            for (let i=0; i<buffer.length; i++) {
                if (/[0-9]/.test(buffer[i])) {
                    buffer[i] = buffer[i].toPersianDigits();
                }
            }
        }
    });

    // Input mask for ssn
    $("#form-ssn").inputmask({
        mask: "999-999999-9",
        onBeforeWrite: function (event, buffer, caretPos, opts) {   // Display Persian digits instead of English
            for (let i=0; i<buffer.length; i++) {
                if (/[0-9]/.test(buffer[i])) {
                    buffer[i] = buffer[i].toPersianDigits();
                }
            }
        }
    });

    // Input mask for birth date
    document.getElementById("form-birth-date").addEventListener('input', function(e) {
        console.log("listener: ", e.target.value);
        e.target.value = e.target.value.toPersianDigits();
    });

    $("#form-birth-date").inputmask({
        mask: "۱۳ab/cd/ef",
        onBeforeWrite: function (event, buffer, caretPos, opts) {   // Display Persian digits instead of English
            for (let i=0; i<buffer.length; i++) {
                if (/[0-9]/.test(buffer[i])) {
                    buffer[i] = buffer[i].toPersianDigits();
                }
            }
        },
        definitions: {
            'a': {
                validator: function (chrs, buffer, pos, strict, opts) {
                    return /[1-9]/.test(chrs);
                    }
            },
            'b': {
                validator: function (chrs, buffer, pos, strict, opts) {
                    console.log(buffer['buffer']);
                    return buffer['buffer'][2] != '9' ? /[0-9]/.test(chrs) : /0/.test(chrs);
                }
            },
            'c': {
                validator: function (chrs, buffer, pos, strict, opts) {
                    return /[0-1]/.test(chrs);
                }
            },
            'd': {
                validator: function (chrs, buffer, pos, strict, opts) {
                    return buffer['buffer'][5] != '1' ? /[1-9]/.test(chrs) : /[0-2]/.test(chrs);
                }
            },
            'e': {
                validator: function (chrs, buffer, pos, strict, opts) {
                    // The twelfth month has 29 days
                    return !/(12)/.test(buffer['buffer'][5]+buffer['buffer'][6]) ?  /[0-3]/.test(chrs) : /[0-2]/.test(chrs);
                }
            },
            'f': {
                validator: function (chrs, buffer, pos, strict, opts) {
                if(/(0)[1-6]/.test(buffer['buffer'][5]+buffer['buffer'][6])) { // First six months have 31 days
                    return /0/.test(buffer['buffer'][8]) ? /[1-9]/.test(chrs) : (/3/.test(buffer['buffer'][8]) ? /[0-1]/.test(chrs) : /[1-9]/.test(chrs));
                } else { // Second six months have 30 days (except for twelvth which has 29)
                    return /0/.test(buffer['buffer'][8]) ? /[1-9]/.test(chrs) : (/3/.test(buffer['buffer'][8]) ? /0/.test(chrs) : /[1-9]/.test(chrs));
                    }
                }
            }
        }
    });

    String.prototype.toPersianDigits= function() {
        let id = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        return this.replace(/[0-9]/g, function(w){
         return id[+w]
        });
    }
}

function CheckPersianInput(elem) {
    let elementId = elem.id;
    let messageElementId = elementId.substring(5, elementId.length) + "-message";
    let inputText = elem.value;

    let regex = /^[\u200c\u0600-\u06FF\s]*$/;
    if (!regex.test(inputText)) {
        document.getElementById(messageElementId).innerHTML = "فقط حروف فارسی مجاز هستند.";
        document.getElementById(messageElementId).style = "color: orange";
        elem.style = "border: solid orange;";
        let firstViolationIdx = inputText.search(/[^\u0600-\u06FF\s]/)
        // alert(inputText.substring(0, firstViolationIdx));
        elem.value = inputText.substring(0, firstViolationIdx);
    } else {
        document.getElementById(messageElementId).innerHTML = "";
        document.getElementById(messageElementId).style = "";
        elem.style = "";  
    }
}

function CheckEnglishInput(elem) {
    let elementId = elem.id;
    let messageElementId = elementId.substring(5, elementId.length) + "-message";
    let inputText = elem.value;

    let regex = /^[A-Za-z]*$/;
    if (!regex.test(inputText)) {
        document.getElementById(messageElementId).innerHTML = "فقط حروف انگلیسی مجاز هستند.";
        document.getElementById(messageElementId).style = "color: orange";
        let firstViolationIdx = inputText.search(/[^A-Za-z]/)
        elem.value = inputText.substring(0, firstViolationIdx);
    } else {
        document.getElementById(messageElementId).innerHTML = "";
        document.getElementById(messageElementId).style = "";
        elem.style = "";  
    }
}
function ValidateNameInput(elem) {
    let elementId = elem.id;
    let messageElementId = elementId.substring(5, elementId.length) + "-message";
    let inputText = elem.value;

    if (inputText.length < 3 || inputText.length > 50) {
        if (inputText == "") {
            document.getElementById(messageElementId).innerHTML = "این فیلد نمی‌تواند خالی باشد.";
        } else {
            document.getElementById(messageElementId).innerHTML = "این فیلد نمی‌تواند کمتر از ۳ یا بیشتر از ۵۰ حرف باشد.";
        }
        document.getElementById(messageElementId).style = "color: red;";
        elem.style = "border: solid red;";
    } else {
        document.getElementById(messageElementId).innerHTML = "";
        elem.style = "border: solid green;";
    }
}

function ValidateEmail(elem) {
    let elementId = elem.id;
    let messageElementId = elementId.substring(5, elementId.length) + "-message";
    let inputText = elem.value;

    // Regular expression provided by Dave Black on https://regexlib.com/
    let regex = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
    if (inputText == "") {
        document.getElementById(messageElementId).innerHTML = "آدرس ایمیل نمی‌تواند خالی باشد";
        document.getElementById(messageElementId).style = "color: red;";
        elem.style = "border: solid red;";
    } else if (!regex.test(inputText)) {
        document.getElementById(messageElementId).innerHTML = "فرمت آدرس ایمیل وارد شده معتبر نیست";
        document.getElementById(messageElementId).style = "color: red;";
        elem.style = "border: solid red;";
    } else {
        document.getElementById(messageElementId).innerHTML = "";
        elem.style = "border: solid green;";
    }
}

function CheckPhoneNumberLength(elem) {
    let elementId = elem.id;
    let messageElementId = elementId.substring(5, elementId.length) + "-message";
    let inputText = elem.value;
    if (elem.value.length != 11 + 2) { // 2 spaces in the text format
        document.getElementById(messageElementId).innerHTML = "شماره تلفن باید ۱۱ رقمی باشد.";
        document.getElementById(messageElementId).style = "color: red;";
        elem.style = "border: solid red;";
    } else {
        document.getElementById(messageElementId).innerHTML = "";
        elem.style = "border: solid green;";
    }
}

function CheckSSNLength(elem) {
    let elementId = elem.id;
    let messageElementId = elementId.substring(5, elementId.length) + "-message";
    let inputText = elem.value;
    if (elem.value.length != 10 + 2) { // 2 dashes ('-') in the text format
        document.getElementById(messageElementId).innerHTML = "کد ملی باید ۱۰ رقمی باشد.";
        document.getElementById(messageElementId).style = "color: red;";
        elem.style = "border: solid red;";
    } else {
        document.getElementById(messageElementId).innerHTML = "";
        elem.style = "border: solid green;";
    }
}

function CheckPassword(elem) {
    let elementId = elem.id;
    let messageElementId = elementId.substring(5, elementId.length) + "-message";
    let inputText = elem.value;

    regex = /[a-zA-Z0-9\=\*\$\#\!\+\-]{8,24}/;
    if (inputText.length < 8) {
        document.getElementById(messageElementId).innerHTML = "کلمه عبور باید حداقل به طول ۸ حرف باشد.";
        document.getElementById(messageElementId).style = "color: orange;";
        elem.style = "border: solid orange;";
    } else if (inputText.length < 25) {
        if (!regex.test(inputText)) { // Password does not meet the requirements
            document.getElementById(messageElementId).innerHTML = "کلمه عبور تنها می‌تواند شامل اعداد و حروف انگلیسی و =*$#!+- باشد.";
            document.getElementById(messageElementId).style = "color: red;";
            elem.style = "border: solid red;";
        } else {
            document.getElementById(messageElementId).innerHTML = "";
            elem.style = "border: solid green;";
        }
    } else {
        document.getElementById(messageElementId).innerHTML = "کلمه عبور باید حداکثر به طول ۲۴ حرف باشد.";
        document.getElementById(messageElementId).style = "color: red;";
        elem.style = "border: solid red;";
    }
}

function CheckPasswordConfirm(elem) {
    let elementId = elem.id;
    let messageElementId = elementId.substring(5, elementId.length) + "-message";
    let inputText = elem.value;
    
    let originalPassword = document.getElementById("form-password").value;
    if (inputText != originalPassword) {
        document.getElementById(messageElementId).innerHTML = "کلمه عبور ورودی با ورودی بالا هم‌خوانی ندارد.";
        document.getElementById(messageElementId).style = "color: red;";
        elem.style = "border: solid red;";
    } else {
        document.getElementById(messageElementId).innerHTML = "";
        elem.style = "border: solid green;";
    }
}

function ValidateAddress(elem) {
    let elementId = elem.id;
    let messageElementId = elementId.substring(5, elementId.length) + "-message";
    let inputText = elem.value;

    let regex = /^[\u200c\u0600-\u06FF\s۰-۹0-9]{0,250}$/;
    if (!regex.test(inputText)) {
        document.getElementById(messageElementId).innerHTML = "آدرس تنها می‌تواند شامل حروف و اعداد فارسی و اعداد انگلیسی حداکثر به طول ۲۵۰ حرف باشد.";
        document.getElementById(messageElementId).style = "color: red;";
        elem.style = "border: solid red;";
    } else {
        document.getElementById(messageElementId).innerHTML = "";
        elem.style = "border: solid green;";
    }

}