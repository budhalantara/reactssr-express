const unicode = {
  Reset : "\x1b[0m",
  Bright : "\x1b[1m",
  Dim : "\x1b[2m",
  Underscore : "\x1b[4m",
  Blink : "\x1b[5m",
  Reverse : "\x1b[7m",
  Hidden : "\x1b[8m",
  FgBlack : "\x1b[30m",
  FgRed : "\x1b[31m",
  FgGreen : "\x1b[32m",
  FgYellow : "\x1b[33m",
  FgBlue : "\x1b[34m",
  FgMagenta : "\x1b[35m",
  FgCyan : "\x1b[36m",
  FgWhite : "\x1b[37m",
  BgBlack : "\x1b[40m",
  BgRed : "\x1b[41m",
  BgGreen : "\x1b[42m",
  BgYellow : "\x1b[43m",
  BgBlue : "\x1b[44m",
  BgMagenta : "\x1b[45m",
  BgCyan : "\x1b[46m",
  BgWhite : "\x1b[47m",
}

class color {
  constructor() {
    this.value = [];
    this.pColor = [];
  }

  reset(a = '') { this.pColor.push(unicode.Reset); this.value.push(a); return this; }
  bright(a = '') { this.pColor.push(unicode.Bright); this.value.push(a); return this; }
  dim(a = '') { this.pColor.push(unicode.Dim); this.value.push(a); return this; }
  underscore(a = '') { this.pColor.push(unicode.Underscore); this.value.push(a); return this; }
  blink(a = '') { this.pColor.push(unicode.Blink); this.value.push(a); return this; }
  reverse(a = '') { this.pColor.push(unicode.Reverse); this.value.push(a); return this; }
  hidden(a = '') { this.pColor.push(unicode.Hidden); this.value.push(a); return this; }
  //
  black(a = '') { this.pColor.push(unicode.FgBlack); this.value.push(a); return this; }
  red(a = '') { this.pColor.push(unicode.FgRed); this.value.push(a); return this; }
  green(a = '') { this.pColor.push(unicode.FgGreen); this.value.push(a); return this; }
  yellow(a = '') { this.pColor.push(unicode.FgYellow); this.value.push(a); return this; }
  blue(a = '') { this.pColor.push(unicode.FgBlue); this.value.push(a); return this; }
  magenta(a = '') { this.pColor.push(unicode.FgMagenta); this.value.push(a); return this; }
  cyan(a = '') { this.pColor.push(unicode.FgCyan); this.value.push(a); return this; }
  white(a = '') { this.pColor.push(unicode.FgWhite); this.value.push(a); return this; }
  bgBlack(a = '') { this.pColor.push(unicode.BgBlack); this.value.push(a); return this; }
  bgRed(a = '') { this.pColor.push(unicode.BgRed); this.value.push(a); return this; }
  bgGreen(a = '') { this.pColor.push(unicode.BgGreen); this.value.push(a); return this; }
  bgYellow(a = '') { this.pColor.push(unicode.BgYellow); this.value.push(a); return this; }
  bgBlue(a = '') { this.pColor.push(unicode.BgBlue); this.value.push(a); return this; }
  bgMagenta(a = '') { this.pColor.push(unicode.BgMagenta); this.value.push(a); return this; }
  bgCyan(a = '') { this.pColor.push(unicode.BgCyan); this.value.push(a); return this; }
  bgWhite(a = '') { this.pColor.push(unicode.BgWhite); this.value.push(a); return this; }
  // finalColor + finalValue
  res() { 
    let ret = '';
    let i = 0;
    this.pColor.forEach((val) => {
      ret += val
    })
    this.value.forEach((val) => {
      ret += val
    })
    this.value = [];
    this.pColor = [];
    return ret + unicode.Reset; 
  }
  // color + value
  cat() {
    let ret = '';
    let i = 0;
    this.value.forEach((val) => {
        ret += this.pColor[i] + val
        i++
      }
    );
    this.value = [];
    this.pColor = [];
    return ret + unicode.Reset
  }
}

module.exports = new color