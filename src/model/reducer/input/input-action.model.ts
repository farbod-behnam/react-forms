import { InputActionEnum } from "./input-action.enum";

export class InputAction {
    type: InputActionEnum;
    value?: string | undefined;


    constructor(type: InputActionEnum, value?: string) {
        this.type = type;
        this.value = value;
    }
}