function validateEmail(email:string) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return false;
    }

    return true;
}

export {
    validateEmail
}