const loginComponent = {
    getComponent() {
        return `
        <form id="login-form" method="POST" action="/login">
            <div class="row mt-3">
                <input class="col" type="text" name="id" placeholder="아이디"/>
            </div>
            <div class="row mt-3">
                <input class="col" type="password" name="password" placeholder="비밀번호"/>
            </div>
            <div class="row mt-3">
                <input class="col bg-info border-0 text-white" id="login-btn" type="button" value="로그인"/>
            </div>
        </form>
        `
    }
}