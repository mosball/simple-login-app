const headerComponent = {
    getComponent() {
        return `
        <header>
            <p id="header-intro">
                <a href = "/">2019 부스트캠프 멤버십 1주차 미션</a>
            </p>
            <div id="header-btn-group">
                <button id="show-login">
                    로그인
                </button>
                <button id="show-join">
                    회원가입
                </button>
                <span id="user-name">
                    <%= userName %>
                </span>
                <button id="logout">
                    로그아웃
                </button>
            </div>
        </header>
        `
    }
}