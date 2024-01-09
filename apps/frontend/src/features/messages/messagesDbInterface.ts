const openMessagesDb = async (contactId: string) => {
    // TODO: Define error and success events with custom state parameters
    const db = window.indexedDB.open(contactId, 1);
    return db;
}

export { openMessagesDb }