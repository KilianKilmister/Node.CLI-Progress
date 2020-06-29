import type { ProgressBarOptions } from './options.js';
import type { GenericBar } from './generic-bar.js';
import type { Payload } from './formatter.js';
import type { Terminal } from './terminal.js';
declare const _GenericBar: GenericBar;
declare class SingleBar extends _GenericBar {
    /** the update timer */
    timer: any;
    /** update interval */
    schedulingRate: any;
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
    stopTime: number;
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
    constructor(options: ProgressBarOptions, preset: ProgressBarOptions);
    render(): void;
    update(current: any, payload: any): void;
    start(total: any, startValue: any, payload: any): void;
    stop(): void;
}
export type { SingleBar };
