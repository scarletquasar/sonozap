type ViewStatus = 'sent' | 'received' | 'read';

type Message = {
    uuid: string,
    receiver: string,
    sender: string,
    content: string,
    sentAt: Date,
    delivered: boolean
}

export type { ViewStatus, Message }