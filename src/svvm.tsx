import { FC, useEffect, useState } from "react";
import { BehaviorSubject, distinctUntilChanged, Observable } from "rxjs";

export function useObservable<T>(observable: Observable<T>): T | undefined;
export function useObservable<T>(observable: Observable<T>, initialValue: T): T;
export function useObservable<T>(
    observable: Observable<T>,
    initialValue?: T
): T | undefined {
    const [value, setState] = useState<T | undefined>(initialValue);

    useEffect(() => {
        const sub = observable.subscribe(setState);
        return () => sub.unsubscribe();
    }, [observable]);

    return value;
}

export function createStore<T>(
    initialValue: T
): [() => T, (value: T | ((prevState: T) => T)) => void, Observable<T>] {
    const subject = new BehaviorSubject<T>(initialValue);

    return [
        () => subject.getValue(),
        (value: T | ((prevValue: T) => T)): void =>
            value instanceof Function
                ? subject.next(value(subject.getValue()))
                : subject.next(value),
        subject.pipe(distinctUntilChanged()),
    ];
}

export function Vvm<T>(props: { view: FC<T>; viewModel: Observable<T> }) {
    const vm = useObservable(props.viewModel);
    return <>{vm && <props.view {...vm} />}</>;
}
