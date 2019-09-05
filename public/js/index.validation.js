const validationChecker = {
    fieldValidationManager: {
        id: {
            target: '#id-field > .join-form-box-input',
            status: [false],
            msg   : '아이디를 확인해주세요.'
        },
        password: {
            target: '#password-field > .join-form-box-input',
            status: [false],
            msg   : '비밀번호를 확인해주세요.'
        },
        password2: {
            target: '#password2-field > .join-form-box-input',
            status: [false],
            msg   : '비밀번호가 일치하지 않습니다.'
        },
        name: {
            target: '#name-field > .join-form-box-input',
            status: [false],
            msg   : '이름을 입력해주세요.'
        },
        birth: {
            target: '#birth-field > .join-form-box-input',
            status: [false, false, false],
            msg   : '생년월일을 확인해주세요.'
        },
        gender: {
            target: '#gender-field > .join-form-box-input',
            status: [false],
            msg   : '성별을 입력해주세요.'
        },
        email: {
            target: '#email-field > .join-form-box-input',
            status: [false],
            msg   : '이메일을 확인해주세요.'
        },
        phone: {
            target: '#phone-field > .join-form-box-input',
            status: [false],
            msg   : '휴대전화를 확인해주세요.'
        },
        interest: {
            target: '#interest-field > .join-form-box-input',
            status: [false],
            msg   : '관심사를 입력해주세요..'
        },
        rules: {
            target: '#rules > .join-form-box-title',
            status: [false],
            msg   : '약관에 동의해주세요.'
        }
    },

    registerAllCheckEvent() {
        this.registerCheckEvent('#id-field input[name=id]')
        this.registerCheckEvent('#password-field input[name=password]')
        this.registerCheckEvent('#password2-field input[name=password2]')
        this.registerCheckEvent('#name-field input[name=name]')
        this.registerCheckEvent('#birth-field input[name=year]')
        this.registerCheckEvent('#birth-field select[name=month]')
        this.registerCheckEvent('#birth-field input[name=day]')
        this.registerCheckEvent('#gender-field select[name=gender]')
        this.registerCheckEvent('#email-field input[name=email]')
        this.registerCheckEvent('#phone-field input[name=phone]')
        this.registerCheckEvent('#interest-field input[name=interest]')
        this.registerJoinButtonClickEvent()
    },

    insertInfoMsg(element, msg, status) {
        const infoMsgTarget = element.getAttribute('data-target')
        const infoMsgField  = document.querySelector(infoMsgTarget)

        infoMsgField.innerHTML = `<span class = "${status ? 'green-text' : 'red-text'}">${msg}</span>`
    },

    /**
     * 인자로 넘어온 field에 따라서 유효성을 체크할 요소를 반환
     * @field : HTML Element
     */
    getFieldItem(field) {
        if (field.tagName !== 'INPUT') {
            return field.options[field.selectedIndex].value

        } else if (field.getAttribute('name') === 'interest') {
            return field.parentElement.querySelectorAll('.interest-box')

        } else {
            return field.value
        }
    },

    getCheckFunction(name) {
        switch (name) {
            case 'id'       : return this.checkId
            case 'password' : return this.checkPassword
            case 'password2': return this.checkPassword2
            case 'name'     : return this.checkName
            case 'year'     : return this.checkBirthYear
            case 'month'    : return this.checkBirthMonth
            case 'day'      : return this.checkBirthDay.bind(this)
            case 'gender'   : return this.checkGender
            case 'email'    : return this.checkEmail
            case 'phone'    : return this.checkPhone
            case 'interest' : return this.checkInterest
        }
    },

    registerCheckEvent(cssSelector) {
        const someInputField = document.querySelector(cssSelector)

        someInputField.addEventListener('focusout', (e) => {
            const itemToCheck = this.getFieldItem(e.target)
            const checkItem   = this.getCheckFunction(e.target.getAttribute('name'))

            checkItem(itemToCheck).then(result => {
                const fieldId = e.target.parentNode.parentNode.id.replace('-field', '')

                this.changeFieldValidationStatus(fieldId, result.status, e.target.getAttribute('name'))
                this.insertInfoMsg(e.target, result.msg, result.status)

            }).catch(err => {
                console.log(err)
            })
        })
    },

    changeFieldValidationStatus(id, status, targetName) {
        if (id === 'birth') {
            const index = targetName === 'year' ? 0 : targetName === 'month' ? 1 : 2
            this.fieldValidationManager[id].status[index] = status
        } else {
            this.fieldValidationManager[id].status[0] = status
        }
    },

    checkId(id) {
        return new Promise((resolve, reject) => {
            const checkList = [
                {
                    condition: id === '',
                    msg      : '',
                    status   : false
                },
                {
                    condition: !/^[a-z0-9\-\_]{5,20}$/.test(id),
                    msg      : '5~20자의 영문 소문자, 숫자와 특수기호(_)(-)만 사용 가능합니다.',
                    status   : false
                },
                {
                    condition: false, 
                    msg      : '이미 사용중인 아이디입니다.',
                    status   : false
                },
                {
                    condition: true,
                    msg      : '사용 가능한 아이디입니다.',
                    status   : true
                },
            ]
    
            //아이디 중복 검사
    
            resolve(checkList.find(e => e.condition === true))
        })
    },

    checkPassword(password) {
        return new Promise((resolve, reject) => {
            const checkList = [
                {
                    condition: password === '',
                    msg      : '',
                    status   : false
                },
                {
                    condition: password.length < 8 || 16 < password.length,
                    msg      : '8자 이상 16자 이하로 입력해주세요.',
                    status   : false
                },
                {
                    condition: !/[A-Z]/.test(password), 
                    msg      : '영문 대문자를 최소 1자 이상 포함하세요.',
                    status   : false
                },
                {
                    condition: !/[0-9]/.test(password), 
                    msg      : '숫자를 최소 1자 이상 포함하세요.',
                    status   : false
                },
                {
                    condition: !/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/.test(password), 
                    msg      : '특수문자를 최소 1자 이상 포함하세요.',
                    status   : false
                },
                {
                    condition: true,
                    msg      : '안전한 비밀번호입니다.',
                    status   : true
                },
            ]
    
            resolve(checkList.find(e => e.condition === true))
        })
    },

    checkPassword2(password2) {
        return new Promise((resolve, reject) => {
            const checkList = [
                {
                    condition: password2 === '',
                    msg      : '',
                    status   : false
                },
                {
                    condition: document.querySelector('#password-field input[name=password]').value !== password2,
                    msg      : '비밀번호가 일치하지 않습니다.',
                    status   : false
                },
                {
                    condition: true,
                    msg      : '비밀번호가 일치합니다.',
                    status   : true
                },
            ]
    
            resolve(checkList.find(e => e.condition === true))
        })
    },

    checkName(name) {
        return new Promise((resolve, reject) => {
            const checkList = [
                {
                    condition: name === '',
                    msg      : '',
                    status   : false
                },
                {
                    condition: true,
                    msg      : '',
                    status   : true
                },
            ]

            resolve(checkList.find(e => e.condition === true))
        })
    },

    checkBirthYear(year) {
        return new Promise((resolve, reject) => {
            year = year !== '' ? Number(year) : year
    
            const currentYear = new Date().getFullYear()
            const lessThan99  = currentYear - 98
            const moreThan15  = currentYear - 14
    
            const checkList = [
                {
                    condition: year === '',
                    msg      : '',
                    status   : false
                },
                {
                    condition: isNaN(year),
                    msg      : '태어난 년도 4자리를 정확하게 입력해주세요.',
                    status   : false
                },
                {
                    condition: lessThan99 > year,
                    msg      : '100세 이하만 가입 가능합니다.',
                    status   : false
                },
                {
                    condition: moreThan15 < year,
                    msg      : '만 14세 이상만 가입 가능합니다.',
                    status   : false
                },
                {
                    condition: true,
                    msg      : '',
                    status   : true
                },
            ]
    
            resolve(checkList.find(e => e.condition === true))
        })
    },

    checkBirthMonth(month) {
        return new Promise((resolve, reject) => {
            const flag = month !== '월'
            if (flag) {
                document.querySelector('#birth-field input[name=day]').focus()
            }
    
            resolve({
                msg      : '',
                status   : flag
            })
        })
    },

    checkBirthDay(day) {
        return new Promise((resolve, reject) => {
            day = day !== '' ? Number(day) : day
    
            const monthText = this.getFieldItem(document.querySelector('#birth-field select[name=month]'))
            const lastDay   = this.getLastDay(monthText)
            const checkList = [
                {
                    condition: day === '',
                    msg      : '',
                    status   : false
                },
                {
                    condition: monthText === '월',
                    msg      : '태어난 월을 먼저 선택하세요.',
                    status   : false
                },
                {
                    condition: isNaN(day) || day < 0 || lastDay < day,
                    msg      : '태어난 날짜를 다시 확인해주세요.',
                    status   : false
                },
                {
                    condition: true,
                    msg      : '',
                    status   : true
                },
            ]
    
            resolve(checkList.find(e => e.condition === true))
        })
    },

    getLastDay(month) {
        const date = new Date()
        date.setDate(1)
        date.setMonth(month)
        date.setDate(date.getDate() - 1)
        return date.getDate()
    },

    checkGender(gender) {
        return new Promise((resolve, reject) => {
            resolve({
                msg      : '',
                status   : gender !== '성별'
            })
        })
    },

    checkEmail(email) {
        return new Promise((resolve, reject) => {
            email = email.toLowerCase()
    
            const checkList = [
                {
                    condition: email === '',
                    msg      : '',
                    status   : false
                },
                {
                    condition: !/^[a-z]+[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email),
                    msg      : '이메일 주소를 다시 확인해주세요.',
                    status   : false
                },
                {
                    condition: true,
                    msg      : '',
                    status   : true
                },
            ]
    
            resolve(checkList.find(e => e.condition === true))
        })
    },

    checkPhone(phone) {
        return new Promise((resolve, reject) => {
            const checkList = [
                {
                    condition: phone === '',
                    msg      : '',
                    status   : false
                },
                {
                    condition: !/^(010)[0-9]{7,8}$/.test(phone),
                    msg      : '형식에 맞지 않는 번호입니다.',
                    status   : false
                },
                {
                    condition: true,
                    msg      : '',
                    status   : true
                },
            ]
    
            resolve(checkList.find(e => e.condition === true))      
        })
    },

    checkInterest(interests) {
        return new Promise((resolve, reject) => {
            const checkList = [
                {
                    condition: interests.length === 0,
                    msg      : '',
                    status   : false
                },
                {
                    condition: interests.length < 3,
                    msg      : '3개 이상의 관심사를 입력해주세요.',
                    status   : false
                },
                {
                    condition: true,
                    msg      : '',
                    status   : true
                },
            ]
    
            resolve(checkList.find(e => e.condition === true))
        })
    },

    registerJoinButtonClickEvent() {
        const joinButton = document.querySelector('#join-btn')

        joinButton.addEventListener('click', (e) => {
            document.querySelectorAll('.invalid-tooltip').forEach(tooltip => {
                tooltip.remove()
            })

            const invalidFields = this.getInvalidFields()

            if (invalidFields.length > 0) {
                invalidFields.forEach(field => {
                    this.createTooltip(field.target, field.msg)
                })
            } else {
                //가입하기
                const name = document.querySelector('#name-field input[name=name]').value
                location.href = `?name=${name}`
            }
        })
    },

    getInvalidFields() {
        const fieldValidations = Object.values(this.fieldValidationManager)
        return fieldValidations.filter(e1 => e1.status.some(e2 => e2 === false))
    },

    createTooltip(targetElement, msg) {
        const target   = document.querySelector(targetElement)
        const position = this.getOffset(target)
        const tooltip  = document.createElement('div')
        
        tooltip.classList.add("invalid-tooltip");
        tooltip.innerHTML  = msg
        tooltip.style.top  = -5
        tooltip.style.right = position.left - 65
        target.parentNode.appendChild(tooltip)

        setTimeout(() => {
            tooltip.remove()
        }, 5000)
    },

    getOffset(element) {
        var rect = element.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop

        return { 
            top: rect.top + scrollTop, 
            left: rect.left + scrollLeft 
        }
    }
}