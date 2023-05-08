const fs = require('fs')
const {stdout} = process
const readline = require("readline")


const result = fs.createWriteStream('text.txt')

process.stdin.pipe(result)


process.on('SIGINT', function(){
    result.end()
    process.exit()
});
process.on('exit', () => stdout.write("The program was closed"))



function endProgram(text) {
    if (text === "exit") {
      process.exit(0)
    } 
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "The program was closed",
  })
  
  rl.on("line", (input) => {
    endProgram(input)
  })