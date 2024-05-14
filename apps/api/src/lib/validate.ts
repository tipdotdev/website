import { eq } from "drizzle-orm";
import { users } from "../db/schema/users";
import db from "../db/db";

// validate email
function validateEmail(email: string): Boolean {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return false;
    }
    return true;
}

// validate password
function validatePassword(password: string): Boolean {
    if (password.length < 8) {
        return false;
    }
    return true;
}

// email availability
async function validateEmailAvailability(email: string): Promise<Boolean> {
    const user = await db.select().from(users).where(eq(users.email, email)).execute();
    if (user.length === 0) {
        return true;
    }
    return false;
}

// username format
function validateUsernameFormat(username: string): Boolean {
    const usernameRegex = /^[a-z][a-z0-9_.-]{1,19}$/;
    if (!usernameRegex.test(username)) {
        return false;
    }
    return true;
}

export { validateEmail, validatePassword, validateEmailAvailability, validateUsernameFormat };
