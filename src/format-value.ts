import type { ProgressBarOptions } from './options.js'

// default value format (apply autopadding)

// format valueset
module.exports = function formatValue (v: string, options: ProgressBarOptions, type: any) {
  // no autopadding ? passthrough
  if (options.autopadding !== true) {
    return v
  }

  // padding
  function autopadding (value, length) {
    return (options.autopaddingChar + value).slice(-length)
  }

  switch (type) {
    case 'percentage':
      return autopadding(v, 3)

    default:
      return v
  }
}
