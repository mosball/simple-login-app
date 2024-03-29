export const login = {
    registerLoginBtnClickEvent() {
        utils.$('#login-btn').addEventListener('click', this.loginBtnClickHandler)
        utils.$('#login-form input[name=password]').addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                utils.$('#login-btn').click()
            }
        })
    },

    loginBtnClickHandler() {
        axios({
            url: '/login',
            method: 'post',
            data: {
                id      : utils.$('#login-form input[name=id]').value,
                password: utils.$('#login-form input[name=password]').value
            }
        }).then(res => {
            if (res.data.response) {
                location.href = '/'
            } else {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.')
            }
        })
    }
}