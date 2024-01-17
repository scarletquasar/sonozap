type ViewStatus = 'sent' | 'received' | 'read';

type Message = {
    uuid: string,
    receiver: string,
    sender: string,
    content: string,
    sentAt: Date
}

export type { ViewStatus, Message }