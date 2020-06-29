declare class ETA {
    /** size of eta buffer */
    etaBufferLength: number;
    /** eta buffer with initial values */
    valueBuffer: number[];
    timeBuffer: number[];
    /** eta time value */
    eta: any;
    constructor(length: number, initTime: number, initValue: number);
    update(time: number, value: number, total: number): void;
    getTime(): any;
    calculate(remaining: number): void;
}
