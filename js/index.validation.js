const validationChecker = {
    registerAllCheckEvent() {
        this.registerIdCheckEvent()
        this.registerPasswordCheckEvent()
        this.registerPasswordCheckEvent2()
        this.registerBirthYearCheckEvent()
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

    insertInfoMsg(field, msg, color) {
        field.innerHTML = `<span class = "${color}-text">${msg}</span>`
    },

    registerIdCheckEvent() {
        const idInputField = document.querySelector('#id-field input[name=id]')

        idInputField.addEventListener('focusout', (e) => {
            const text = e.target.value
            if (text === '') return

            const infoMsgTarget = e.target.getAttribute('data-target')
            const infoMsgField  = document.querySelector(infoMsgTarget)

            if (!this.checkInputLength(text, 5, 20) || !this.checkInputText(text, /^[a-z0-9\-\_]+$/)) {
                this.insertInfoMsg(infoMsgField, 
                    '5~20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.', 
                    'red')
                return
            } 

            if (!this.checkOverlapId(text)) {
                this.insertInfoMsg(infoMsgField, '이미 사용중인 아이디입니다.', 'red')
                return
            }

            this.insertInfoMsg(infoMsgField, '사용 가능한 아이디입니다.', 'green')
        })
    },

    registerPasswordCheckEvent() {
        const passwordInputField = document.querySelector('#password-field input[name=password]')

        passwordInputField.addEventListener('focusout', (e) => {
            const text = e.target.value
            if (text === '') return

            const infoMsgTarget = e.target.getAttribute('data-target')
            const infoMsgField  = document.querySelector(infoMsgTarget)

            if (!this.checkInputLength(text, 8, 16)) {
                this.insertInfoMsg(infoMsgField, '8자 이상 16자 이하로 입력하세요.', 'red')
                return
            }

            if (!this.checkInputText(text, /[A-Z]/)) {
                this.insertInfoMsg(infoMsgField, '영문 대문자를 최소 1자 이상 포함하세요.', 'red')
                return
            }

            if (!this.checkInputText(text, /[0-9]/)) {
                this.insertInfoMsg(infoMsgField, '숫자를 최소 1자 이상 포함하세요.', 'red')
                return
            }

            if (!this.checkInputText(text, /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/)) {
                this.insertInfoMsg(infoMsgField, '특수문자를 최소 1자 이상 포함하세요.', 'red')
                return
            }

            this.insertInfoMsg(infoMsgField, '안전한 비밀번호입니다.', 'green')
        })
    },

    registerPassword2CheckEvent() {
        const passwordInputField  = document.querySelector('#password-field input[name=password]')
        const password2InputField = document.querySelector('#password2-field input[name=password2]')

        password2InputField.addEventListener('input', (e) => {
            const text  = e.target.value
            const text2 = passwordInputField.value
            if (text === '') return

            const infoMsgTarget = e.target.getAttribute('data-target')
            const infoMsgField  = document.querySelector(infoMsgTarget)

            if (text === text2) {
                this.insertInfoMsg(infoMsgField, '비밀번호가 일치합니다.', 'green')
            } else {
                this.insertInfoMsg(infoMsgField, '비밀번호가 일치하지 않습니다.', 'red')
            }
        })
    },

    registerBirthYearCheckEvent() {
        const birthYearInputField  = document.querySelector('#birth-field input[name=year]')

        birthYearInputField.addEventListener('focusout', (e) => {
            const year = e.target.value
            if (year === '') return

            const infoMsgTarget = e.target.getAttribute('data-target')
            const infoMsgField  = document.querySelector(infoMsgTarget)
            
            const currentYear = new Date().getFullYear()
            const lessThan99  = currentYear - 98
            const moreThan15  = currentYear - 14
            year = Number(year)

            if (isNaN(year) || lessThan99 > year) {
                this.insertInfoMsg(infoMsgField, '태어난 년도 4자리를 정확하게 입력하세요.', 'red')
                return
            }

            if (moreThan15 < year) {
                this.insertInfoMsg(infoMsgField, '만 14세 이상만 가입 가능합니다.', 'red')
                return
            }
        })
    }
}