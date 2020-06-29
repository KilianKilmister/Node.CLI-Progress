/// <reference types="@types/node" />
import type { Writable } from 'stream';
import type { Terminal } from './terminal.js';
declare type FormatString = string;
export interface ProgressBarOptions {
    /** the max update rate in fps (redraw will only triggered on value change) */
    fps?: any;
    /** the output stream to write on */
    stream?: Writable;
    /** external terminal provided ? */
    terminal?: Terminal;
    /** clear on finish ? */
    clearOnComplete?: boolean;
    /** stop on finish ? */
    stopOnComplete?: boolean;
    /** size of the progressbar in chars */
    barsize?: number;
    /** position of the progress bar - 'left' (default), 'right' or 'center' */
    align?: 'left' | 'right' | 'center';
    /** hide the cursor ? */
    hideCursor?: boolean;
    /** disable linewrapping ? */
    linewrap?: boolean;
    /** pre-render bar strings (performance) */
    barCompleteChar?: string;
    barIncompleteChar?: string;
    /** glue sequence (control chars) between bar elements ? */
    barGlue?: string;
    /** the bar format */
    format?: FormatString;
    /** external time-format provided ? */
    formatTime?: (t?: number, options?: ProgressBarOptions, roundToMultipleOf?: number) => string;
    /** external value-format provided ? */
    formatValue?: (v?: string, options?: ProgressBarOptions, type?: any) => string;
    /** external bar-format provided ? */
    formatBar?: (progress?: number, options?: ProgressBarOptions) => string;
    /** the number of results to average ETA over */
    etaBuffer?: number;
    /** automatic eta updates based on fps */
    etaAsynchronousUpdate?: boolean;
    /** allow synchronous updates ? */
    synchronousUpdate?: boolean;
    /** notty mode */
    noTTYOutput?: boolean;
    /** schedule - 2s */
    notTTYSchedule?: number;
    /** emptyOnZero - false */
    emptyOnZero?: boolean;
    /** force bar redraw even if progress did not change */
    forceRedraw?: boolean;
    /** automated padding to fixed width ? */
    autopadding?: boolean;
    /** autopadding character - empty in case autopadding is disabled */
    autopaddingChar?: string;
}
export {};
