import { z } from 'zod';

const PendingMessage = z.string().max(1024);
type PendingMessage = typeof PendingMessage._type;

export { PendingMessage }