function generateOTP(length) {
    if (length <= 0) {
        throw new Error("Length must be a positive integer");
    }

    let otp = '';
    const digits = '0123456789';

    for (let i = 0; i < length; i++) {
        otp += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    return otp;
}
module.exports=generateOTP
