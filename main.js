document.querySelector('.add').addEventListener('click', () => add(1))
document.querySelector('.reset').addEventListener('click', reset)


document.querySelector('input').addEventListener('input', (event) => {
  inputWord = event.target.value.toLowerCase()
  // console.log(inputWord)
})

let inputWord = '' 
let count = 0

const display = document.querySelector('#place')

function add (a) {
  count += a
  display.textContent = count
}

function reset() {
  count = 0
  display.textContent = count
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
recognition.interimResults = true

let p = document.querySelector('p')
// let p = document.createElement('p')
// const words = document.querySelector('.words')
// words.appendChild(p)

recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
  .map(result => result[0])
  .map(result => result.transcript)
  .join('')

  p.textContent = transcript

  // create new paragraph
  // if(e.results[0].isFinal) {
  //   p = document.createElement('p')
  //   words.appendChild(p)
  // }

  console.log(e.results[0].isFinal)
  
  if(e.results[0].isFinal ) {
    if (transcript.includes(inputWord)) {
      console.log(transcript.toLowerCase())
      let wordCount = 0
      transcript.toLowerCase().split(' ').forEach(e => e === inputWord && wordCount++)
      add(wordCount)
      // console.log(wordCount)
    }
  }

})

recognition.addEventListener('end', recognition.start)

recognition.start();
