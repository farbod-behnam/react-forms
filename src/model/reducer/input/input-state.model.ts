export class InputState {
    value: string;
    isTouched: boolean;

    constructor (value: string, isTouched: boolean) {
        this.value = value;
        this.isTouched = isTouched;
    }
}