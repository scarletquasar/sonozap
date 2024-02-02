import { Profile } from "./presets.js";
import { Jwt } from "jwt-destroy"

const createJwt = async (profile: Profile) => {
    const handler = new Jwt(process.env.JWT_SECRET);
    const token = await handler.generate({ uuid: profile.uuid }, '72h');

    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 72);

    const refreshTokenExpiration = new Date();
    refreshTokenExpiration.setHours(tokenExpiration.getHours() + 72);

    return { 
        token: token.toKen as string, 
        tokenExpiration: tokenExpiration.toISOString()
    }
}

const validateAndParseJwt = async (token: string, isRefreshToken = false) => {
    const handler = new Jwt(process.env.JWT_SECRET);
    const result: { 
        status: string, 
        data?: Record<string, unknown> 
    } = await handler.decode(token);

    if (result.status.toUpperCase() === 'INVALID') {
        throw new Error('Invalid JWT token');
    }

    return result.data.data;
};

const checkJwtOwnership = async (token: string, profileId: string) => {
    const { uuid } = await validateAndParseJwt(token, false) as { uuid: string };
    if (uuid != profileId) {
        throw new Error('The caller profile does not match the current token ownership');
    }
}

export { createJwt, validateAndParseJwt, checkJwtOwnership }