/// <reference types="@types/node" />
import type { Payload } from './formatter.js';
import type { ProgressBarOptions } from './options.js';
import type { EventEmitter } from 'events';
import type { Terminal } from './terminal.js';
declare const _EventEmitter: EventEmitter;
declare class GenericBar extends _EventEmitter {
    /** store options */
    options: ProgressBarOptions;
    /** store terminal instance */
    terminal: Terminal;
    /** the current bar value */
    value: number;
    /** the end value of the bar */
    total: number;
    /** last drawn string - only render on change! */
    lastDrawnString: string;
    /** start time (used for eta calculation) */
    startTime: number;
    /** stop time (used for duration calculation) */
    stopTime: Date;
    /** last update time */
    lastRedraw: number;
    /** default eta calculator (will be re-create on start) */
    eta: ETA;
    /** payload data */
    payload: {};
    /** progress bar active ? */
    isActive: boolean;
    /** use default formatter or custom one ? */
    formatter: (options: ProgressBarOptions, params: any, payload: Payload) => string;
    /** Progress-Bar constructor */
    constructor(options?: ProgressBarOptions);
    /** internal render function */
    render(): void;
    /** start the progress bar */
    start(total?: number, startValue?: number, payload?: Payload): void;
    /** stop the bar */
    stop(): void;
    /**
     * update the bar value
     * @param value - new value to set
     * @param payload
     */
    update(value: number, payload?: Payload): any;
    /**
     * update the bar value
     * @param payload
     */
    update(payload?: Payload): any;
    /**
     * update the bar value
     * @param delta - difference to apply
     * @param payload
     */
    increment(value?: number, payload?: Payload): any;
    /**
     * update the bar value
     * @param payload
     */
    increment(payload?: Payload): any;
    /** get the total (limit) value */
    getTotal(): number;
    /** set the total (limit) value */
    setTotal(total: number): void;
    /** force eta calculation update (long running processes) */
    updateETA(): void;
}
export type { GenericBar };
