function validateEmail(data) {
    const regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return regEmail.test(data.email);
}

function validatePhone(data) {
    const regPhone = /^(\+86)?(1[0-9]{10})$/;
    return regPhone.test(data.phone);
}

module.exports = {
    validateEmail,
    validatePhone
};
