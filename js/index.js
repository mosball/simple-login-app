window.onload = () => {
    renderHTML()
    registerHashChangeEvent()
}

const renderHTML = () => {
    let indexHTML = `
        ${headerComponent.getComponent()}
        <div id = "body">
            ${router.getBodyHTML()}
        </div>
        ${footerComponent.getComponent()}
        ${rulesPopupComponent.getComponent()}
    `
    document.body.innerHTML = ''
    document.body.insertAdjacentHTML('afterbegin', indexHTML)

    registerDependenceEvent()
    registerShowBtnClickEvent()
}

const registerDependenceEvent = () => {
    if (location.hash === '#login') {

    } else if (location.hash === '#join') {
        rules.registerAllRulesEvents()
        utils.registerAllUtilsEvents()
        validationChecker.registerAllCheckEvent()

    } else {
        const name = decodeURI(location.search.replace('?name=', ''))
        if (name) {
            const header    = document.querySelector('#header-btn-group')
            const showLogin = document.querySelector('#show-login')

            showLogin.style.display = 'none'
            header.insertAdjacentText('afterbegin', `${name}님 환영합니다.`)
        }
    }
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