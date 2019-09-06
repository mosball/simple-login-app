const rules = {
    rulesReadingFlag:false,

    registerAllRulesEvents() {
        this.registerShowRulesPopupEvent()
        this.registerRulesPopupXEvent()
        this.registerRulesScrollCheckEvent()
        this.registerAgreeClickEvent()
    },

    registerShowRulesPopupEvent() {
        const rulesButton = document.querySelector('#rules > .join-form-box-title')

        rulesButton.addEventListener('click', (e) => {
            document.querySelector('#rules-popup-cover').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        })
    },

    registerRulesPopupXEvent() {
        const rulesXButton = document.querySelector('#rules-popup-x')

        rulesXButton.addEventListener('click', (e) => {
            document.querySelector('#rules-popup-cover').style.display = 'none';
            document.body.style.overflow = 'scroll';
        })
    },

    registerRulesScrollCheckEvent() {
        const rulesContent = document.querySelector('#rules-popup-content')

        rulesContent.addEventListener('scroll', (e) => {
            if (
                e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
                !this.rulesReadingFlag
            ) {
                this.rulesReadingFlag = true
                document.querySelector('#rules-popup-agree-btn').style = 'background-color:#5a96ff;'
            }
        })
    },

    registerAgreeClickEvent() {
        const rulesAgreeButton = document.querySelector('#rules-popup-agree-btn')

        rulesAgreeButton.addEventListener('click', (e) => {
            if (this.rulesReadingFlag) {
                const rulesCheckbox = document.querySelector('#rules > input')
                rulesCheckbox.checked = true
                document.querySelector('#rules-popup-x').click()
                validationChecker.fieldManager.rules.status = [true]
            }
        })
    }
}