const validationChecker = {
    registerAllCheckEvent() {
        this.registerIdCheckEvent()
        this.registerPasswordCheckEvent()
        this.registerPassword2CheckEvent()
        this.registerBirthYearCheckEvent()
        this.registerMonthDayCheckEvent()
        this.registerBirthDayCheckEvent()
        this.registerEmailCheckEvent()
        this.registerPhoneCheck()
    },

    checkInputLength(input, start, end) {
        try {
            return start <= input.length && input.length <= end
        } catch (e) {
            return false
        }
    },

    checkInputText(input, regExp) {
        return regExp.test(input)
    },

    checkOverlapId(id) {
        return true
    },

    insertInfoMsg(element, msg, color) {
        const infoMsgTarget = element.getAttribute('data-target')
        const infoMsgField  = document.querySelector(infoMsgTarget)
        infoMsgField.innerHTML = `<span class = "${color}-text">${msg}</span>`
    },

    getLastDay(month) {
        const date = new Date()
        date.setDate(1)
        date.setMonth(month)
        date.setDate(date.getDate() - 1)
        return date.getDate()
    },

    registerIdCheckEvent() {
        const idInputField = document.querySelector('#id-field input[name=id]')

        idInputField.addEventListener('focusout', (e) => {
            const text = e.target.value
            if (text === '') return

            if (!this.checkInputLength(text, 5, 20) || !this.checkInputText(text, /^[a-z0-9\-\_]+$/)) {
                this.insertInfoMsg(e.target, 
                    '5~20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.', 
                    'red')

            } else if (!this.checkOverlapId(text)) {
                this.insertInfoMsg(e.target, '이미 사용중인 아이디입니다.', 'red')
                
            } else {
                this.insertInfoMsg(e.target, '사용 가능한 아이디입니다.', 'green')
            }
        })
    },

    registerPasswordCheckEvent() {
        const passwordInputField = document.querySelector('#password-field input[name=password]')

        passwordInputField.addEventListener('focusout', (e) => {
            const text = e.target.value
            if (text === '') return

            if (!this.checkInputLength(text, 8, 16)) {
                this.insertInfoMsg(e.target, '8자 이상 16자 이하로 입력하세요.', 'red')
                
            } else if (!this.checkInputText(text, /[A-Z]/)) {
                this.insertInfoMsg(e.target, '영문 대문자를 최소 1자 이상 포함하세요.', 'red')
                
            } else if (!this.checkInputText(text, /[0-9]/)) {
                this.insertInfoMsg(e.target, '숫자를 최소 1자 이상 포함하세요.', 'red')
                
            } else if (!this.checkInputText(text, /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/)) {
                this.insertInfoMsg(e.target, '특수문자를 최소 1자 이상 포함하세요.', 'red')
                
            } else {
                this.insertInfoMsg(e.target, '안전한 비밀번호입니다.', 'green')
            }
        })
    },

    registerPassword2CheckEvent() {
        const passwordInputField  = document.querySelector('#password-field input[name=password]')
        const password2InputField = document.querySelector('#password2-field input[name=password2]')

        password2InputField.addEventListener('input', (e) => {
            const text  = e.target.value
            const text2 = passwordInputField.value
            if (text === '') return

            if (text === text2) {
                this.insertInfoMsg(e.target, '비밀번호가 일치합니다.', 'green')
            } else {
                this.insertInfoMsg(e.target, '비밀번호가 일치하지 않습니다.', 'red')
            }
        })
    },

    registerBirthYearCheckEvent() {
        const birthYearInputField = document.querySelector('#birth-field input[name=year]')

        birthYearInputField.addEventListener('focusout', (e) => {
            let year = e.target.value
            if (year === '') return
            
            const currentYear = new Date().getFullYear()
            const lessThan99  = currentYear - 98
            const moreThan15  = currentYear - 14
            year = Number(year)

            if (isNaN(year)) {
                this.insertInfoMsg(e.target, '태어난 년도 4자리를 정확하게 입력하세요.', 'red')

            } else if (lessThan99 > year) {
                this.insertInfoMsg(e.target, '100세 이하만 가입 가능합니다.', 'red')

            } else if (moreThan15 < year) {
                this.insertInfoMsg(e.target, '만 14세 이상만 가입 가능합니다.', 'red')

            } else {
                this.insertInfoMsg(e.target, '', 'green')
            }
        })
    },

    registerMonthDayCheckEvent() {
        const birthMonthInputField = document.querySelector('#birth-field select[name=month]')
        const birthDayInputField   = document.querySelector('#birth-field input[name=day]')

        birthMonthInputField.addEventListener('focusout', (e) => {
            if (e.target.options[e.target.selectedIndex].value !== '월') {
                birthDayInputField.focus()
            }
        })
    },

    registerBirthDayCheckEvent() {
        const birthDayInputField = document.querySelector('#birth-field input[name=day]')
        const birthMonthSelect   = document.querySelector('#birth-field select[name=month]')

        birthDayInputField.addEventListener('focusout', (e) => {
            let day = e.target.value
            if (day === '') return
            
            const month = birthMonthSelect.options[birthMonthSelect.selectedIndex].value
            day = Number(day)

            if (month === '월') {
                this.insertInfoMsg(e.target, '태어난 월을 먼저 선택하세요.', 'red')

            } else if (isNaN(day) || day < 0 || this.getLastDay(month) < day) {
                this.insertInfoMsg(e.target, '태어난 날짜를 다시 확인하세요.', 'red')

            } else {
                this.insertInfoMsg(e.target, '', 'green')
            }
        })
    },

    registerEmailCheckEvent() {
        const emailInputField = document.querySelector('#email-field input[name=email]')

        emailInputField.addEventListener('focusout', (e) => {
            let text = e.target.value
            if (text === '') return

            text = text.toLowerCase()

            if (!this.checkInputText(text, /^[a-z]+[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/)) {
                this.insertInfoMsg(e.target, '이메일 주소를 다시 확인해주세요.', 'red')
            } else {
                this.insertInfoMsg(e.target, '', 'green')
            }
        })
    },

    registerPhoneCheck() {
        const phoneInputField = document.querySelector('#phone-field input[name=phone]')

        phoneInputField.addEventListener('focusout', (e) => {
            const text = e.target.value
            if (text === '') return

            if (!this.checkInputText(text, /^(010)[0-9]{7,8}$/)) {
                this.insertInfoMsg(e.target, '형식에 맞지 않는 번호입니다.', 'red')
            } else {
                this.insertInfoMsg(e.target, '', 'green')
            }
        })
    }
}