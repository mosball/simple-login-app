const utils = {
    fadeIn(element) {
        let interval = null
        interval = setInterval(() => {
            const currentOpacity = Number(element.style.opacity)

            if (currentOpacity < 1) element.style.opacity = currentOpacity + 0.05
            else clearInterval(interval)
        }, 50)
    },

    fadeOut(element, removeFlag) {
        let interval = null
        interval = setInterval(() => {
            const currentOpacity = Number(element.style.opacity)

            if (currentOpacity > 0) {
                element.style.opacity = currentOpacity - 0.05
                return
            }

            if (removeFlag) {
                element.remove()
            }

            clearInterval(interval)
        }, 50)
    }
 }