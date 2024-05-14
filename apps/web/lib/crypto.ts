// base64 decode
function base64Decode(encoded: string) {
    return Buffer.from(encoded, "base64").toString("utf-8");
}

export { base64Decode };
