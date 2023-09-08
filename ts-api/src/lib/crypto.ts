import CryptoJS from 'crypto-js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

function generateKey() {
    return CryptoJS.lib.WordArray.random(256/8).toString();
}

function generateUUID(prefix?:string) {
    if (prefix) {
        let uuid = `${prefix}_${crypto.randomUUID()}`
        return uuid
    } else {
        let uuid = crypto.randomUUID()
        return uuid
    }
}

function encrypt(data:string, key:string) {
    return CryptoJS.AES.encrypt(data.toString(), key).toString();
}

function encryptObj(obj:object, key:string) {
    return CryptoJS.AES.encrypt(JSON.stringify(obj), key).toString();
}

function decrypt(data:string, key:string) {
    var bytes  = CryptoJS.AES.decrypt(data, key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);   
    return originalText;
}

function decryptObj(data:object, key:string) {
    var bytes  = CryptoJS.AES.decrypt(data, key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);   
    return JSON.parse(originalText);
}

function generateAuthCode() {
    // generate a 6 digit auth code
    return Math.floor(100000 + Math.random() * 900000);
}

function hashPassword(password:string) {

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    return hash;

}

function comparePassword(password:string, hash:string) {

    const compare = bcrypt.compareSync(password, hash);

    return compare;

}

// export functions
export { generateKey, generateUUID, encrypt, encryptObj, decrypt, decryptObj, generateAuthCode, hashPassword, comparePassword };