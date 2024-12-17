import { useRef, useState } from "react"


function App() {
  const specSymbols = ["!", "#", "@", "$", "%", "^", "&", "*", "(", ")", "№", ";", ":", "?"]
  const symbols = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
  const numb = ["1","2","3","4","5","6","7","8","9","0"]

  let [level, updLevel] = useState("None")
  let length = useRef()
  let [message, updMessage] = useState("")
  let [color, updColor] = useState("#808080")

  let [generatedPass, updGenerate] = useState("")

  function generate() {
    updMessage("")
    updGenerate("") // clears previous generation
    if (Number(length.current.value) > 0 && Number(length.current.value) < 25) {
      for (let i = 0; i < length.current.value; i++) {
        let checkSymbol = Math.floor(Math.random() * 4)
        let generate = Math.floor(Math.random() * symbols.length)
        let symbol = ""
        switch (checkSymbol) {
          case 0:
            symbol = symbols[generate].toUpperCase()
            break
          case 1:
            symbol = symbols[generate].toLowerCase()
            break
          case 2:
            generate = Math.floor(Math.random() * numb.length)
            symbol = numb[generate]
            break
          case 3:
            generate = Math.floor(Math.random() * specSymbols.length)
            symbol = specSymbols[generate]
            break
        }
        updGenerate(prev => prev + symbol)
      }
    } else if (length.current.value == "" || length.current.value == 0) {
      updMessage(() => {
        return(
          <>
            <p>Behold your password of legendary length '' 😏</p>
            <p>Oops! Just kidding—it's invisible because you forgot to set a length. Try again, champ!</p>
          </>
        )
      })
    } else if (Number(length.current.value) > 24) {
      updMessage(<p>Are you sure that you can remember this password?</p>)
    } else {
      updMessage(<p>Length cannot be negative ;{")"}</p>)
    }

    if (length.current.value < 8 && length.current.value > 0) {
      updLevel("Weak")
      updColor("#FF4C4C")
    } else if (length.current.value >= 8 && length.current.value < 12) {
      updLevel("Moderate")
      updColor("#FFA500")
    } else if (length.current.value >= 12 && length.current.value <= 16) {
      updLevel("Strong")
      updColor("#4C9EFF")
    } else if (length.current.value > 16 && length.current.value < 25) {
      updLevel("Very Strong")
      updColor("#32CD32")
    } else {
      updLevel("None")
      updColor("#808080")
    }
  }

  function copy() {
    if (generatedPass !== "") {
      navigator.clipboard.writeText(generatedPass)
      updMessage(<p>Copied!</p>)
    } else {
      updMessage(<p>I don't know what to copy :\</p>)
    }
  }
  return(
    <div className="content">
      <h1>PassGen</h1>
      <p>Generated Password:</p>
      <p className="password">{generatedPass}</p>
      {message}
      <label htmlFor="length">Length:</label> <br />
      <input type="number" name="length" id="length" ref={length} placeholder="1-24"/>
      <button onClick={() => generate()}>Generate</button>
      <button onClick={() => copy()}>Copy</button>
      <p>Password Level: <span style={{color, fontWeight: "bold"}}>{level}</span></p>
      <p><small>Note: You can generate password with maximum length 24 symbols!</small></p>
    </div>
  )
}

export default App