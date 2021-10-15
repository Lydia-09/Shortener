function copyURL() {
  const shortURL = document.getElementById('shortURL')
  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(shortURL)
  selection.removeAllRanges()
  selection.addRange(range)
  document.execCommand('copy')
  alert('已複製短網址連結: ' + shortURL)
}