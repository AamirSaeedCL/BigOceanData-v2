import { Subject } from 'rxjs';
import { Entity } from '../modules/map/models/entities/vessel';

export class StateService {
    static observable = null;
    state = {};

    // tslint:disable-next-line: typedef
    subscription() {
        if (StateService.observable !== null) {
            return StateService.observable;
        }
        StateService.observable = new Subject();
        return StateService.observable;
    }

    remove(keyToRemove: string): void {
        const existingState = JSON.parse(JSON.stringify(this.state ? this.state : {}));
        const newState = {};
        Object.keys(existingState).forEach((key) => {
            if (key != keyToRemove) {
                newState[key] = existingState[key];
            }
        });
        this.state = newState;
    }

    get(keyToKey: string = null): void {
        const existingState = JSON.parse(JSON.stringify(this.state ? this.state : {}));
        if (keyToKey == null) {
            return existingState;
        }
        if (existingState[keyToKey]) {
            return existingState[keyToKey];
        }
        return null;
    }

    update(incomingState): void {
        const existingState = JSON.parse(JSON.stringify(this.state ? this.state : {}));
        this.state = { ...existingState, ...incomingState };
        StateService.observable.next(this.state);
    }

    signal(message: Entity.Vessel | object): void {
        StateService.observable.next(message);
    }
}
