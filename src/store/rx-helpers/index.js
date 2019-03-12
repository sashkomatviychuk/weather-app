import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

const createEventHandler = () => {
    const subject = new Subject();

    return {
        stream: subject.asObservable(),
        handler: (e) => subject.next(e),
    }
}

const getObservableStore$ = (store) => {
    return new Observable(function (observer) {
        observer.next(store.getState());
        
        const unsubscribe = store.subscribe(function () {
            observer.next(store.getState());
        });

        // let's return the function that will be called
        // when the Observable is unsubscribed
        return unsubscribe;
    });
} 

export {
    createEventHandler,
    getObservableStore$,
}