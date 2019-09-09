window.onload = () => {
    renderHTML()
    registerHashChangeEvent()
}

const renderHTML = () => {
    const body = document.querySelector('#body')
    body.innerHTML = router.getBodyHTML()

    registerDependenceEvent()
    displayMember()
}

const registerDependenceEvent = () => {
    if (location.hash === '#join') {
        rules.registerAllRulesEvents()
        join.registerAllJoinEvent()
        validationChecker.registerAllCheckEvent()
    }

    registerShowBtnClickEvent()
}

const registerShowBtnClickEvent = () => {
    const showLogin = document.querySelector('#show-login')
    const showJoin  = document.querySelector('#show-join')

    showLogin.addEventListener('click', () => {
        location.href = `${location.pathname}#login`
    })

    showJoin.addEventListener('click', () => {
        location.href = `${location.pathname}#join`
    })
}

const registerHashChangeEvent = () => {
    window.addEventListener('hashchange', () => {
        renderHTML()
    })
}

const displayMember = () => {
    const userName = document.querySelector('#user-name')

    if (userName.innerTEXT.length > 0) {
        const showLogin = document.querySelector('#show-login')
        const showJoin = document.querySelector('#show-join')

        showJoin.style.display = 'none'
        showLogin.style.display = 'none'
        userName.innerTEXT = `${userName.innerTEXT}님 환영합니다.`

    } else {
        const logout = document.querySelector('#logout')
        
        logout.style.display = 'none'
        userName.style.display = 'none'
    }
}