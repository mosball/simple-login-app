import {validationChecker} from './index.validation.js'

export const rules = {
    rulesReadingFlag:false,

    registerAllRulesEvents() {
        this.registerShowRulesPopupEvent()
        this.registerRulesPopupXEvent()
        this.registerRulesScrollCheckEvent()
        this.registerAgreeClickEvent()
    },

    registerShowRulesPopupEvent() {
        const rulesButton = utils.$('#rules > .join-form-box-title')

        rulesButton.addEventListener('click', (e) => {
            utils.$('#rules-popup-cover').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        })
    },

    registerRulesPopupXEvent() {
        const rulesXButton = utils.$('#rules-popup-x')

        rulesXButton.addEventListener('click', (e) => {
            utils.$('#rules-popup-cover').style.display = 'none';
            document.body.style.overflow = 'scroll';
        })
    },

    registerRulesScrollCheckEvent() {
        const rulesContent = utils.$('#rules-popup-content')

        rulesContent.addEventListener('scroll', (e) => {
            if (
                e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
                !this.rulesReadingFlag
            ) {
                this.rulesReadingFlag = true
                utils.$('#rules-popup-agree-btn').style = 'background-color:#5a96ff;'
            }
        })
    },

    registerAgreeClickEvent() {
        const rulesAgreeButton = utils.$('#rules-popup-agree-btn')

        rulesAgreeButton.addEventListener('click', (e) => {
            if (this.rulesReadingFlag) {
                const rulesCheckbox = utils.$('#rules > input')
                rulesCheckbox.checked = true
                utils.$('#rules-popup-x').click()
                validationChecker.fieldManager.rules.status = [true]
            }
        })
    }
}