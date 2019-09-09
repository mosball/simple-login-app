const login = {
    registerAllLoginEvent() {
        this.registerLoginBtnClickEvent()
    },

    registerLoginBtnClickEvent() {
        utils.$('#login-btn').addEventListener('click', () => {
            axios({
                url: '/login',
                method: 'post',
                data: {
                    id      : utils.$('#login-form input[name=id]').value,
                    password: utils.$('#login-form input[name=password]').value
                }
            }).then(res => {
                if (res.response) {
                    utils.$('#user-name').innerText = this.fieldManager.name.value
                    location.hash = ''
                } else {
                    alert('아이디 또는 비밀번호가 일치하지 않습니다.')
                }
            })
        })
    }
}