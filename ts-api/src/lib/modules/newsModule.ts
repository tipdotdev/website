import { redis } from '../../lib/redis';

async function enterMember(email: string) {
    
    const result = await redis.sAdd('td:news', email)

    if (result) {
        return true
    }

    return false
    
}

async function checkIsMember(email: string) {
    
    const result = await redis.sIsMember('td:news', email)

    if (result) {
        return true
    } else {
        return false
    }
    
}

// export functions
export {
    enterMember,
    checkIsMember
}