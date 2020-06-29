/// <reference types="@types/node" />
import type { GenericBar } from './generic-bar.js';
import type { Payload } from './formatter.js';
import type { Terminal } from './terminal.js';
import type { EventEmitter } from 'events';
import type { ProgressBarOptions } from './options.js';
declare const _EventEmitter: EventEmitter;
declare class MultiBar extends _EventEmitter {
    /**  list of bars */
    bars: GenericBar[];
    /**  parse+store options */
    options: ProgressBarOptions;
    /**  store terminal instance */
    terminal: Terminal;
    /**  the update timer */
    timer: any;
    /**  progress bar active ? */
    isActive: boolean;
    /**  update interval */
    schedulingRate: any;
    /**  Progress-Bar constructor */
    constructor(options: ProgressBarOptions, preset: ProgressBarOptions);
    /**  add a new bar to the stack */
    create(total: number, startValue: number, payload: Payload): any;
    /**  remove a bar from the stack */
    remove(bar: GenericBar): boolean;
    /**  internal update routine */
    update(): void;
    stop(): void;
    emit(event: string | symbol, ...args: any[]): boolean;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
}
export type { MultiBar };
