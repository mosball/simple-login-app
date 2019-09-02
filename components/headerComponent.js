const headerComponent = {
    getComponent() {
        return `
        <header>
            <p id="header-intro">
                <a href = "./index.html">2019 부스트캠프 멤버십 1주차 미션</a>
            </p>
            <div id="header-btn-group">
                <button id="show-login">
                    로그인
                </button>
                <button id="show-join">
                    회원가입
                </button>
            </div>
        </header>
        `
    }
}