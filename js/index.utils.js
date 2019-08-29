const utils = {
    registerAllUtilsEvents() {
        this.registerInputFocusEvent()
        this.registerShowBtnClickEvent()
    },

    registerInputFocusEvent() {
        const inputs = document.querySelectorAll('.join-form-box-input > *')
    
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.style.border = "1px solid #5a96ff"
            })
    
            input.addEventListener('focusout', (e) => {
                e.target.style.border = "1px solid #e0e0e0"
            })
        })
    },
    
    registerShowBtnClickEvent() {
        const showLogin = document.querySelector('#show-login')
        const showJoin  = document.querySelector('#show-join')
    
        showLogin.addEventListener('click', (e) => {
            document.querySelector('#default-body').style.display = "none"
            document.querySelector('#join-form').style.display = "none"
            document.querySelector('#login-form').style.display = "block"
        })
    
        showJoin.addEventListener('click', (e) => {
            document.querySelector('#default-body').style.display = "none"
            document.querySelector('#login-form').style.display = "none"
            document.querySelector('#join-form').style.display = "block"
        })
    }
}