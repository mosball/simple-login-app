window.onload = () => {
    renderHTML()
    utils.registerAllUtilsEvents()
    validationChecker.registerAllCheckEvent()
    rules.registerAllRulesEvents()
}

const renderHTML = () => {
    let indexHTML = `
        ${headerComponent.getComponent()}
        <div id = "body">
            ${mainComponent.getComponent()}
            ${loginComponent.getComponent()}
            ${joinComponent.getComponent()}
        </div>
        ${footerComponent.getComponent()}
        ${rulesPopupComponent.getComponent()}
    `
    document.body.insertAdjacentHTML('afterbegin', indexHTML)
}