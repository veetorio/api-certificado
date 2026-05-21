class Validator {
    static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static validateName(name: string): boolean {
        return name.trim().length > 0;
    }
}
export = Validator;

