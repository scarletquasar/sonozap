import { Buffer } from 'buffer/';

function decodeJwt(token: string) {
    const base64Payload = token.split(".")[1];
    const payloadBuffer = Buffer.from(base64Payload);
    return JSON.parse(payloadBuffer.toString()) as {
        uuid: string;
        username: string;
        bio: string;
        number: string;
        photo?: string | undefined;
        contacts: {
            uuid: string;
            username: string;
            bio: string;
            number: string;
            photo?: string | undefined;
        }[];
    };
}

export { decodeJwt }