import { GTextField } from "./GTextField";
import { ByteBuffer } from "../utils/ByteBuffer";
export declare class GTextInput extends GTextField {
    constructor();
    protected createDisplayObject(): void;
    get password(): boolean;
    set password(value: boolean);
    get keyboardType(): string;
    set keyboardType(value: string);
    set editable(value: boolean);
    get editable(): boolean;
    set maxLength(value: number);
    get maxLength(): number;
    set promptText(value: string);
    get promptText(): string;
    set restrict(value: string);
    get restrict(): string;
    requestFocus(): void;
    setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
}
