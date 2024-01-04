import { Profile } from "./presets.js";
import { Jwt } from "jwt-destroy"
import { z } from "zod"

const createJwt = async (profile: Profile) => {
    const handler = new Jwt(process.env.JWT_SECRET);
    const token = await handler.generate(profile, '72h');
    const refreshToken = await handler.generate({ profileId: profile.uuid }, '144h');

    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 72);

    const refreshTokenExpiration = new Date();
    refreshTokenExpiration.setHours(tokenExpiration.getHours() + 72);

    return { 
        token: token.toKen as string, 
        refreshToken: refreshToken.toKen as string,
        tokenExpiration: tokenExpiration.toISOString(),
        refreshTokenExpiration: refreshTokenExpiration.toISOString()
    }
}

const validateAndParseJwt = async (token: string, isRefreshToken = false) => {
    const handler = new Jwt(process.env.JWT_SECRET);
    const result: { status: string, data?: Record<string, unknown> } = await handler.decode(token);

    if (result.status === 'Invalid') {
        throw new Error('Invalid JWT token');
    }

    if (isRefreshToken) {
        const payloadFormat = z.object({ profileId: z.string().uuid() });
        const validPayload = await payloadFormat.parseAsync(result.data);

        return validPayload;
    }

    const validPayload = await Profile.parseAsync(result.data);
    return validPayload;
};

export { createJwt, validateAndParseJwt }