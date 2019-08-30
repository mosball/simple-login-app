const utils = {
    registerAllUtilsEvents() {
        this.registerShowBtnClickEvent()
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