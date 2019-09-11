export const join = {
    registerAllJoinEvent() {
        this.registerInputFocusEvent()
        this.registerAddInterestEvent()
        this.registerRemoveInterestEvent()
        this.registerModifyInterestEvent()
        this.registerInitAllFieldEvent()
    },

    registerInputFocusEvent() {
        const inputs = utils.$$('.join-form-box-input > *')
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
    
    registerAddInterestEvent() {
        const interestInput = utils.$('#interest-field .join-form-box-input > input')

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
            <span class = "interest-text" name = "interest-text">${interest.replace(/\,/g, '')}</span>
            <span class = "interest-box-x">X</span>
        </div>`
    },

    registerRemoveInterestEvent() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('interest-box-x')) {
                e.target.parentNode.remove()
                utils.$('#interest-field .join-form-box-input > input').focus()
            }
        })
    },

    registerModifyInterestEvent() {
        const interestInput = utils.$('#interest-field .join-form-box-input > input')

        interestInput.addEventListener('keydown', (e) => {
            if (e.keyCode === 8 && e.target.value === '') {
                const targetInterestBox = this.getLastInterestBox()

                if (!targetInterestBox) return 
                
                e.target.value = `${targetInterestBox.childNodes[1].textContent} `
                targetInterestBox.remove()
            }
        })
    },

    getLastInterestBox() {
        const interestBoxs = utils.$$('.interest-box')
        return interestBoxs[interestBoxs.length - 1]
    },

    registerInitAllFieldEvent() {
        const initButton = utils.$('#init-btn')

        initButton.addEventListener('click', () => {
            if (confirm('모든 내용을 새로 작성하시겠습니까?')) {
                this.initAllField()
            }
        })
    },

    initAllField() {
        const fields = utils.$$('.join-form-box-input > *')

        fields.forEach(field => {
            if (field.getAttribute('name') === 'interest') {
                const interestBoxs = this.getInterestBoxs(field)
                interestBoxs.forEach(e => e.remove())
                return
            }

            if (field.tagName === 'SELECT') {
                field.selectedIndex = 0
                return
            }

            field.value = ''
            if (field.getAttribute('data-target')) {
                utils.$(field.getAttribute('data-target')).innerHTML = ''
            }
        })
    },

    getInterestBoxs(field) {
        const elements = field.parentNode.childNodes
        const interestBoxs = []

        elements.forEach(e => {
            if (e.classList && e.classList.contains('interest-box')) {
                interestBoxs.push(e)
            }
        })

        return interestBoxs
    },
}