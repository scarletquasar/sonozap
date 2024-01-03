import { Profile } from "features/profiling/ProfilePresets";
import { Jwt } from "jwt-destroy"
import { z } from "zod"
// TODO: Update secret with environment variable value

const createJwt = async (profile: Profile) => {
    const handler = new Jwt('secret');
    const token = await handler.generate(profile, '72h');
    const refreshToken = await handler.generate({ profileId: profile.uuid }, '144h');

    return { 
        token: token.token as string, 
        refreshToken: refreshToken.token as string
    }
}

const validateAndParseJwt = async (token: string, isRefreshToken = false) => {
    const handler = new Jwt('secret');
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