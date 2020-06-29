import type { Writable } from 'stream'
import type { Terminal } from './terminal.js'
type FormatString = string

/* utility to merge defaults */
function mergeOption<T, U> (v: T, defaultValue: U) {
  if (typeof v === 'undefined' || v === null) {
    return defaultValue
  } else {
    return v
  }
}

export interface ProgressBarOptions {
  /** the max update rate in fps (redraw will only triggered on value change) */
  fps?
  /** @internal */
  throttleTime?: number
  /** the output stream to write on */
  stream?: Writable

  /** external terminal provided ? */
  terminal?: Terminal

  /** clear on finish ? */
  clearOnComplete?: boolean

  /** stop on finish ? */
  stopOnComplete?: boolean

  /** size of the progressbar in chars */
  barsize?: number

  /** position of the progress bar - 'left' (default), 'right' or 'center' */
  align?: 'left' | 'right' | 'center'

  /** hide the cursor ? */
  hideCursor?: boolean

  /** disable linewrapping ? */
  linewrap?: boolean

  /** pre-render bar strings (performance) */
  barCompleteChar?: string

  /** @internal */
  barCompleteString?: string
  barIncompleteChar?: string

  /** @internal */
  barIncompleteString?: string

  /** glue sequence (control chars) between bar elements ? */
  barGlue?: string

  /** the bar format */
  format?: FormatString

  /** external time-format provided ? */
  formatTime?: (t?: number, options?: ProgressBarOptions, roundToMultipleOf?: number) => string

  /** external value-format provided ? */
  formatValue?: (v?: string, options?: ProgressBarOptions, type?: any) => string

  /** external bar-format provided ? */
  formatBar?: (progress?: number, options?: ProgressBarOptions) => string

  /** the number of results to average ETA over */
  etaBuffer?: number

  /** @internal */
  etaBufferLength?: number

  /** automatic eta updates based on fps */
  etaAsynchronousUpdate?: boolean

  /** allow synchronous updates ? */
  synchronousUpdate?: boolean

  /** notty mode */
  noTTYOutput?: boolean

  /** schedule - 2s */
  notTTYSchedule?: number

  /** emptyOnZero - false */
  emptyOnZero?: boolean

  /** force bar redraw even if progress did not change */
  forceRedraw?: boolean

  /** automated padding to fixed width ? */
  autopadding?: boolean

  /** autopadding character - empty in case autopadding is disabled */
  autopaddingChar?: string
}

module.exports = {
  /* set global options */
  parse (rawOptions: ProgressBarOptions, preset: ProgressBarOptions) {
    // options storage
    const options: ProgressBarOptions = {}

    // merge preset
    const opt = Object.assign({}, preset, rawOptions)

    // the max update rate in fps (redraw will only triggered on value change)
    options.throttleTime = 1000 / (mergeOption(opt.fps, 10))

    // the output stream to write on
    options.stream = mergeOption(opt.stream, process.stderr)

    // external terminal provided ?
    options.terminal = mergeOption(opt.terminal, null)

    // clear on finish ?
    options.clearOnComplete = mergeOption(opt.clearOnComplete, false)

    // stop on finish ?
    options.stopOnComplete = mergeOption(opt.stopOnComplete, false)

    // size of the progressbar in chars
    options.barsize = mergeOption(opt.barsize, 40)

    // position of the progress bar - 'left' (default), 'right' or 'center'
    options.align = mergeOption(opt.align, 'left')

    // hide the cursor ?
    options.hideCursor = mergeOption(opt.hideCursor, false)

    // disable linewrapping ?
    options.linewrap = mergeOption(opt.linewrap, false)

    // pre-render bar strings (performance)
    options.barCompleteString = (new Array(options.barsize + 1).join(opt.barCompleteChar || '='))
    options.barIncompleteString = (new Array(options.barsize + 1).join(opt.barIncompleteChar || '-'))

    // glue sequence (control chars) between bar elements ?
    options.barGlue = mergeOption(opt.barGlue, '')

    // the bar format
    options.format = mergeOption(opt.format, 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}')

    // external time-format provided ?
    options.formatTime = mergeOption(opt.formatTime, null)

    // external value-format provided ?
    options.formatValue = mergeOption(opt.formatValue, null)

    // external bar-format provided ?
    options.formatBar = mergeOption(opt.formatBar, null)

    // the number of results to average ETA over
    options.etaBufferLength = mergeOption(opt.etaBuffer, 10)

    // automatic eta updates based on fps
    options.etaAsynchronousUpdate = mergeOption(opt.etaAsynchronousUpdate, false)

    // allow synchronous updates ?
    options.synchronousUpdate = mergeOption(opt.synchronousUpdate, true)

    // notty mode
    options.noTTYOutput = mergeOption(opt.noTTYOutput, false)

    // schedule - 2s
    options.notTTYSchedule = mergeOption(opt.notTTYSchedule, 2000)

    // emptyOnZero - false
    options.emptyOnZero = mergeOption(opt.emptyOnZero, false)

    // force bar redraw even if progress did not change
    options.forceRedraw = mergeOption(opt.forceRedraw, false)

    // automated padding to fixed width ?
    options.autopadding = mergeOption(opt.autopadding, false)

    // autopadding character - empty in case autopadding is disabled
    options.autopaddingChar = options.autopadding ? mergeOption(opt.autopaddingChar, '   ') : ''

    return options
  }
}
