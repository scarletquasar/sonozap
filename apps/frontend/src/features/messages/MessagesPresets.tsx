type ViewStatus = 'sent' | 'received' | 'read';

type Message = {
    receiver: string,
    sender: string,
    content: string,
    sentAt: Date
}

export type { ViewStatus, Message }