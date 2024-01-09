import { Buffer } from 'buffer/';

function decodeJwt(token: string) {
    const base64Payload = token.split(".")[1];
    const payloadBuffer = Buffer.from(base64Payload);

    const payloadString = atob(atob(payloadBuffer.toString('base64')));

    return JSON.parse(payloadString).data as {
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