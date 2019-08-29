const registerInputFocusEvent = () => {
    const inputs = document.querySelectorAll('.join-form-box-input > *')

    inputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            e.target.style.border = "1px solid #5a96ff"
        })

        input.addEventListener('focusout', (e) => {
            e.target.style.border = "1px solid #e0e0e0"
        })
    })
    
}

window.onload = () => {
    registerInputFocusEvent()
}