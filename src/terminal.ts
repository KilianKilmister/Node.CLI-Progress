import type { Writable } from 'stream'
import type { WriteStream } from 'tty'
const _readline = require('readline')
// low-level terminal interactions
class Terminal {
    stream: Writable | WriteStream

    /** default: line wrapping enabled */
    linewrap: boolean

    /** current, relative y position */
    dy: number
    constructor (outputStream: Writable | WriteStream) {
      this.stream = outputStream

      // default: line wrapping enabled
      this.linewrap = true

      // current, relative y position
      this.dy = 0
    }

    // save cursor position + settings
    cursorSave () {
      if (!(this.stream as WriteStream).isTTY) {
        return
      }

      // save position
      this.stream.write('\x1B7')
    }

    // restore last cursor position + settings
    cursorRestore () {
      if (!(this.stream as WriteStream).isTTY) {
        return
      }

      // restore cursor
      this.stream.write('\x1B8')
    }

    // show/hide cursor
    cursor (enabled) {
      if (!(this.stream as WriteStream).isTTY) {
        return
      }

      if (enabled) {
        this.stream.write('\x1B[?25h')
      } else {
        this.stream.write('\x1B[?25l')
      }
    }

    // change cursor positionn
    cursorTo (x = null, y = null) {
      if (!(this.stream as WriteStream).isTTY) {
        return
      }

      // move cursor absolute
      _readline.cursorTo(this.stream, x, y)
    }

    // change relative cursor position
    cursorRelative (dx = null, dy = null) {
      if (!(this.stream as WriteStream).isTTY) {
        return
      }

      // store current position
      this.dy = this.dy + dy

      // move cursor relative
      _readline.moveCursor(this.stream, dx, dy)
    }

    // relative reset
    cursorRelativeReset () {
      if (!(this.stream as WriteStream).isTTY) {
        return
      }

      // move cursor to initial line
      _readline.moveCursor(this.stream, 0, -this.dy)

      // first char
      _readline.cursorTo(this.stream, 0, null)

      // reset counter
      this.dy = 0
    }

    // clear to the right from cursor
    clearRight () {
      if (!(this.stream as WriteStream).isTTY) {
        return
      }

      _readline.clearLine(this.stream, 1)
    }

    // clear the full line
    clearLine () {
      if (!(this.stream as WriteStream).isTTY) {
        return
      }

      _readline.clearLine(this.stream, 0)
    }

    // clear everyting beyond the current line
    clearBottom () {
      if (!(this.stream as WriteStream).isTTY) {
        return
      }

      _readline.clearScreenDown(this.stream)
    }

    // add new line; increment counter
    newline () {
      this.stream.write('\n')
      this.dy++
    }

    // write content to output stream
    // @TODO use string-width to strip length
    write (s) {
    // line wrapping enabled ? trim output
      if (this.linewrap === true) {
        this.stream.write(s.substr(0, this.getWidth()))
      } else {
        this.stream.write(s)
      }
    }

    // control line wrapping
    lineWrapping (enabled) {
      if (!(this.stream as WriteStream).isTTY) {
        return
      }

      // store state
      this.linewrap = enabled
      if (enabled) {
        this.stream.write('\x1B[?7h')
      } else {
        this.stream.write('\x1B[?7l')
      }
    }

    // tty environment ?
    isTTY () {
      return ((this.stream as WriteStream).isTTY === true)
    }

    // get terminal width
    getWidth () {
    // set max width to 80 in tty-mode and 200 in notty-mode
      return (this.stream as WriteStream).columns || ((this.stream as WriteStream).isTTY ? 80 : 200)
    }
}

module.exports = Terminal
export type { Terminal }
