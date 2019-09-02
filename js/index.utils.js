const utils = {
    registerAllUtilsEvents() {
        this.registerInputFocusEvent()
        this.registerShowBtnClickEvent()
        this.registerAddInterestEvent()
        this.registerRemoveInterestEvent()
        this.registerModifyInterestEvent()
    },

    registerInputFocusEvent() {
        const inputs = document.querySelectorAll('.join-form-box-input > *')
        const focusStyle = '1px solid #5a96ff'
        const focusOutStyle = '1px solid #e0e0e0'

        inputs.forEach(input => {
            if (input.parentElement.parentElement.id === 'birth-field') {
                input.addEventListener('focus', (e) => { e.target.style.border = focusStyle })
                input.addEventListener('focusout', (e) => { e.target.style.border = focusOutStyle})
            } else {
                input.addEventListener('focus', (e) => { e.target.parentElement.style.border = focusStyle })
                input.addEventListener('focusout', (e) => { e.target.parentElement.style.border = focusOutStyle})
            }
        })
    },
    
    registerShowBtnClickEvent() {
        const showLogin = document.querySelector('#show-login')
        const showJoin  = document.querySelector('#show-join')
    
        showLogin.addEventListener('click', () => {
            document.querySelector('#default-body').style.display = "none"
            document.querySelector('#join-form').style.display = "none"
            document.querySelector('#login-form').style.display = "block"
        })
    
        showJoin.addEventListener('click', () => {
            document.querySelector('#default-body').style.display = "none"
            document.querySelector('#login-form').style.display = "none"
            document.querySelector('#join-form').style.display = "block"
        })
    },

    registerAddInterestEvent() {
        const interestInput = document.querySelector('#interest-field .join-form-box-input > input')

        interestInput.addEventListener('keyup', (e) => {
            const inputText = e.target.value
            if (e.key !== ',') return

            if (inputText.replace(/\,/g, '').length > 0) {
                e.target.insertAdjacentHTML('beforebegin', this.makeInterestElement(inputText))
            }

            e.target.value = ''
        })
    },

    makeInterestElement(interest) {
        return `<div class = "interest-box">
            <span class = "interest-text" name = "interest">${interest.replace(/\,/g, '')}</span>
            <span class = "interest-box-x">X</span>
        </div>`
    },

    registerRemoveInterestEvent() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('interest-box-x')) {
                e.target.parentElement.remove()
                document.querySelector('#interest-field .join-form-box-input > input').focus()
            }
        })
    },

    registerModifyInterestEvent() {
        const interestInput = document.querySelector('#interest-field .join-form-box-input > input')

        interestInput.addEventListener('keydown', (e) => {
            if (e.keyCode === 8 && e.target.value === '') {
                const targetInterestBox = this.getLastInterestBox()
                e.target.value = `${targetInterestBox.childNodes[1].textContent} `
                targetInterestBox.remove()
            }
        })
    },

    getLastInterestBox() {
        const interestBoxs = document.querySelectorAll('.interest-box')
        return interestBoxs[interestBoxs.length - 1]
    }
 }