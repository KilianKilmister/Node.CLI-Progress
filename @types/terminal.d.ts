/// <reference types="@types/node" />
import type { Writable } from 'stream';
import type { WriteStream } from 'tty';
declare class Terminal {
    stream: Writable | WriteStream;
    /** default: line wrapping enabled */
    linewrap: boolean;
    /** current, relative y position */
    dy: number;
    constructor(outputStream: Writable | WriteStream);
    cursorSave(): void;
    cursorRestore(): void;
    cursor(enabled: any): void;
    cursorTo(x?: any, y?: any): void;
    cursorRelative(dx?: any, dy?: any): void;
    cursorRelativeReset(): void;
    clearRight(): void;
    clearLine(): void;
    clearBottom(): void;
    newline(): void;
    write(s: any): void;
    lineWrapping(enabled: any): void;
    isTTY(): boolean;
    getWidth(): number;
}
export type { Terminal };
