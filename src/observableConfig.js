import { from } from 'rxjs/observable/from';
import setObservableConfig from 'recompose/setObservableConfig';

setObservableConfig({
    fromESObservable: from,
    toESObservable: s => s,
})