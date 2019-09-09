window.onload = () => {
    renderHTML()
    registerHashChangeEvent()
    registerLogoutBtnClickEvent()
    registerShowBtnClickEvent()
}

const renderHTML = () => {
    const body = utils.$('#body')
    body.innerHTML = router.getBodyHTML()

    registerDependenceEvent()
    displayMember()
}

const registerDependenceEvent = () => {
    if (location.hash === '#login') {
        login.registerLoginBtnClickEvent()
        
    } else if (location.hash === '#join') {
        rules.registerAllRulesEvents()
        join.registerAllJoinEvent()
        validationChecker.registerAllCheckEvent()
    }
}

const registerShowBtnClickEvent = () => {
    const showLogin = utils.$('#show-login')
    const showJoin  = utils.$('#show-join')

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

const registerLogoutBtnClickEvent = () => {
    utils.$('#logout-btn').addEventListener('click', () => {
        axios({
            url: '/logout',
            method: 'post'
        }).then(res => {
            if (res.data.response) {
                location.href = '/'
            }
        })
    })
}

const displayMember = () => {
    const userName     = utils.$('#user-name')
    const userNameWrap = utils.$('#user-name-wrap')
    const logout       = utils.$('#logout-btn')
    const showLogin    = utils.$('#show-login')
    const showJoin     = utils.$('#show-join')

    userNameWrap.style.display = 'none'
    logout.style.display       = 'none'
    showJoin.style.display     = 'none'
    showLogin.style.display    = 'none'

    if (userName.textContent.trim().length > 0) {
        logout.style.display       = ''
        userNameWrap.style.display = ''
        userName.innerText = userName.textContent.trim()

    } else {
        showJoin.style.display  = ''
        showLogin.style.display = ''
    }
}