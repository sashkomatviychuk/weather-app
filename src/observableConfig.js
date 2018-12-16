import Kefir from 'kefir';
import setObservableConfig from 'recompose/setObservableConfig';

setObservableConfig({
	fromESObservable: Kefir.fromESObservable,
	toESObservable: stream => stream.toESObservable(),
});