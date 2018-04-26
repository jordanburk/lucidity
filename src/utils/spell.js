export default function spell (n) {
  const num = parseInt(n)
  const digits = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
  const tens = [null, null, 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

  if (num < 10) {
    return digits[num]
  } else if (num < 20) {
    return teens[num - 10]
  } else if (num < 100) {
    return num % 10 === 0
      ? tens[Math.floor(num / 10)]
      : tens[Math.floor(num / 10)] + '-' + digits[num % 10]
  } else if (num < 1000) {
    return digits[Math.floor(num / 100)] + ' hundred ' + spell(num % 100)
  } else {
    return 'an unexpected quantity'
  }
}
