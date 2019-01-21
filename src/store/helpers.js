import { pool, constant } from 'kefir';

export const createEventHandler = () => {
    const eventPoll = pool();

    return {
        stream: eventPoll.toProperty(),
        handler: e => eventPoll.plug(constant(e)),
    };
}