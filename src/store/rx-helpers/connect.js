import React from 'react';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators/map';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

const noop = () => {};

const connect = (mapObservablesToProps) => (Component) => {
    class ConnectedComponent extends React.Component {

        static displayName = `connect(${Component.displayName || Component.name})`;

        constructor(props) {
            super(props);

            this.subscription = null;
            this.unsubscribeOuter = null;

            this.state = {
                props: {},
            };
        }

        mountObservales() {
            const all = mapObservablesToProps(
                this.props$.pipe(distinctUntilChanged())
            );

            const observables = all.observables || {};
            const props = all.props || {};

            this.unsubscribeOuter = all.unsubscribe || noop;

            this.setState({ props });

            this.subscription && this.subscription.unsubscribe();
            
            this.subscription = this.combineLatestObject(observables).pipe(
                map(newProps => ({...props, ...newProps}))
            )
                .subscribe(allProps => {
                    this.setState({ props: allProps });
                })
        }

        unmoutObservables() {
            if (this.subscription && typeof this.subscription.unsubscribe === 'function') {
                this.subscription.unsubscribe();
            }

            if (typeof this.unsubscribeOuter === 'function') {
                this.unsubscribeOuter();
                this.unsubscribeOuter = null;
            }
        }

        combineLatestObject(observablesObject) {
            const keys = [];
            const observables = [];

            for (const key in observablesObject) {
                keys.push(key);
                observables.push(observablesObject[key]);
            }

            return combineLatest(observables, (...args) => {
                return args.reduce((combination, observable, i) => {                    
                    combination[keys[i]] = observable;
                    return combination;
                }, {});
            });
        }

        componentWillMount() {
            this.props$ = new BehaviorSubject(this.props);
            this.mountObservales();
        }

        componentWillReceiveProps(nextProps) {
            this.props$.next(nextProps);
        }

        componentWillUnmount() {
            this.unmoutObservables();
        }

        render() {
            console.log(`Rendering ${Component.displayName || Component.name}`);
            return (<Component {...this.props} {...this.state.props} />);
        }
    }

    return (props) => (<ConnectedComponent {...props} />);
}

export default connect