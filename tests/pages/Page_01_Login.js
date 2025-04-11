export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('id=user-name');
        this.passwordInput = page.locator('id=password');
        this.loginButton = page.locator('id=login-button');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async fillLoginUserPass(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        
    }

    async doLogin(){
        await this.loginButton.click();
    }
}
