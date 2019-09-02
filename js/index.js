window.onload = () => {
    renderComponents()
    utils.registerAllUtilsEvents()
    validationChecker.registerAllCheckEvent()
}

const renderComponents = () => {
    let indexHTML = ``
    indexHTML += headerComponent.getComponent()
    indexHTML += mainComponent.getComponent()
    indexHTML += loginComponent.getComponent()
    indexHTML += joinComponent.getComponent()
    indexHTML += footerComponent.getComponent()
    document.body.insertAdjacentHTML('afterbegin', indexHTML)
}