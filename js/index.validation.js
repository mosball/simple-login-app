const validationChecker = {
    registerAllCheckEvent() {
        this.registerCheckEvent('#id-field input[name=id]')
        this.registerCheckEvent('#password-field input[name=password]')
        this.registerCheckEvent('#password2-field input[name=password2]')
        this.registerCheckEvent('#birth-field input[name=year]')
        this.registerCheckEvent('#birth-field select[name=month]')
        this.registerCheckEvent('#birth-field input[name=day]')
        this.registerCheckEvent('#email-field input[name=email]')
        this.registerCheckEvent('#phone-field input[name=phone]')
    },

    insertInfoMsg(element, msg, css) {
        const infoMsgTarget    = element.getAttribute('data-target')
        const infoMsgField     = document.querySelector(infoMsgTarget)

        infoMsgField.innerHTML = `<span class = "${css}">${msg}</span>`
    },

    getFieldText(field) {
        return field.tagName === 'INPUT' ?
        field.value :
        field.options[field.selectedIndex].value
    },

    getCheckFunction(name) {
        switch (name) {
            case 'id'       : return this.checkId
            case 'password' : return this.checkPassword
            case 'password2': return this.checkPassword2
            case 'year'     : return this.checkBirthYear
            case 'month'    : return this.checkBirthMonth
            case 'day'      : return this.checkBirthDay.bind(this)
            case 'email'    : return this.checkEmail
            case 'phone'    : return this.checkPhone
        }
    },

    registerCheckEvent(cssSelector) {
        const someInputField = document.querySelector(cssSelector)

        someInputField.addEventListener('focusout', (e) => {
            const text  = this.getFieldText(e.target)
            const check = this.getCheckFunction(e.target.getAttribute('name'))

            check(text, (result) => {
                if (!result) return
                this.insertInfoMsg(e.target, result.msg, result.css)
            })
        })
    },

    checkId(id, callback) {
        const checkList = [
            {
                condition: id === '',
                msg      : '',
                css      : ''
            },
            {
                condition: !/^[a-z0-9\-\_]{5,20}$/.test(id),
                msg      : '5~20자의 영문 소문자, 숫자와 특수기호(_)(-)만 사용 가능합니다.',
                css      : 'red-text'
            },
            {
                condition: false, 
                msg      : '이미 사용중인 아이디입니다.',
                css      : 'red-text'
            },
            {
                condition: true,
                msg      : '사용 가능한 아이디입니다.',
                css      : 'green-text'
            },
        ]

        //아이디 중복 검사

        callback(checkList.find(e => e.condition === true))
    },

    checkPassword(password, callback) {
        const checkList = [
            {
                condition: password === '',
                msg      : '',
                css      : ''
            },
            {
                condition: password.length < 8 || 16 < password.length,
                msg      : '8자 이상 16자 이하로 입력하세요.',
                css      : 'red-text'
            },
            {
                condition: !/[A-Z]/.test(password), 
                msg      : '영문 대문자를 최소 1자 이상 포함하세요.',
                css      : 'red-text'
            },
            {
                condition: !/[0-9]/.test(password), 
                msg      : '숫자를 최소 1자 이상 포함하세요.',
                css      : 'red-text'
            },
            {
                condition: !/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/.test(password), 
                msg      : '특수문자를 최소 1자 이상 포함하세요.',
                css      : 'red-text'
            },
            {
                condition: true,
                msg      : '안전한 비밀번호입니다.',
                css      : 'green-text'
            },
        ]

        callback(checkList.find(e => e.condition === true))
    },

    checkPassword2(password2, callback) {
        const checkList = [
            {
                condition: password2 === '',
                msg      : '',
                css      : ''
            },
            {
                condition: document.querySelector('#password-field input[name=password]').value !== password2,
                msg      : '비밀번호가 일치하지 않습니다.',
                css      : 'red-text'
            },
            {
                condition: true,
                msg      : '비밀번호가 일치합니다.',
                css      : 'green-text'
            },
        ]

        callback(checkList.find(e => e.condition === true))
    },

    checkBirthYear(year, callback) {
        year = year !== '' ? Number(year) : year

        const currentYear = new Date().getFullYear()
        const lessThan99  = currentYear - 98
        const moreThan15  = currentYear - 14

        const checkList = [
            {
                condition: year === '',
                msg      : '',
                css      : ''
            },
            {
                condition: isNaN(year),
                msg      : '태어난 년도 4자리를 정확하게 입력하세요.',
                css      : 'red-text'
            },
            {
                condition: lessThan99 > year,
                msg      : '100세 이하만 가입 가능합니다.',
                css      : 'red-text'
            },
            {
                condition: moreThan15 < year,
                msg      : '만 14세 이상만 가입 가능합니다.',
                css      : 'red-text'
            },
            {
                condition: true,
                msg      : '',
                css      : ''
            },
        ]

        callback(checkList.find(e => e.condition === true))
    },

    checkBirthMonth(text, callback) {
        if (text !== '월') {
            document.querySelector('#birth-field input[name=day]').focus()
        }

        callback(null)
    },

    checkBirthDay(day, callback) {
        day = Number(day)

        const monthText = this.getFieldText(document.querySelector('#birth-field select[name=month]'))
        const lastDay   = this.getLastDay(monthText)
        const checkList = [
            {
                condition: day === '',
                msg      : '',
                css      : ''
            },
            {
                condition: monthText === '월',
                msg      : '태어난 월을 먼저 선택하세요.',
                css      : 'red-text'
            },
            {
                condition: isNaN(day) || day < 0 || lastDay < day,
                msg      : '태어난 날짜를 다시 확인하세요.',
                css      : 'red-text'
            },
            {
                condition: true,
                msg      : '',
                css      : ''
            },
        ]

        callback(checkList.find(e => e.condition === true))
    },

    getLastDay(month) {
        const date = new Date()
        date.setDate(1)
        date.setMonth(month)
        date.setDate(date.getDate() - 1)
        return date.getDate()
    },

    checkEmail(email, callback) {
        email = email.toLowerCase()

        const checkList = [
            {
                condition: email === '',
                msg      : '',
                css      : ''
            },
            {
                condition: !/^[a-z]+[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email),
                msg      : '이메일 주소를 다시 확인해주세요.',
                css      : 'red-text'
            },
            {
                condition: true,
                msg      : '',
                css      : ''
            },
        ]

        callback(checkList.find(e => e.condition === true))
    },

    checkPhone(phone, callback) {
        const checkList = [
            {
                condition: phone === '',
                msg      : '',
                css      : ''
            },
            {
                condition: !/^(010)[0-9]{7,8}$/.test(phone),
                msg      : '형식에 맞지 않는 번호입니다.',
                css      : 'red-text'
            },
            {
                condition: true,
                msg      : '',
                css      : ''
            },
        ]

        callback(checkList.find(e => e.condition === true))
    }
}