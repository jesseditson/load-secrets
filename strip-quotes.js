const QUOTE_PATTERN = /^(["'])((\\\1|[^\1])+?)\1/;
module.exports = function(str) {
  var quoteMatch = str.match(QUOTE_PATTERN)
  if (quoteMatch) {
    str = quoteMatch[2]
    var q = quoteMatch[1]
    var pattern = new RegExp("\\\\" + q, 'g')
    var m = str.match(pattern)
    // handle escaped quotes
    str = str.replace(pattern, q)
  }
  return str
}
