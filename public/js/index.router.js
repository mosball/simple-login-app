export const router = {
    getBodyHTML () {
        switch (location.hash) {
            case '#login': return loginComponent.getComponent()
            case '#join' : return joinComponent.getComponent()
            default      : return mainComponent.getComponent()
        }
    }
}