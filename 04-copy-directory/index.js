const path = require('path')
const fs = require('fs')
const { stdout } = process


fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, output => {
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, output => {
        stdout.write("The folder 'files-copy' was created")
    })

    fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true }, (output, files) => {
        for (let file of files) {

            fs.copyFile(path.join(path.join(__dirname, 'files'), file.name), path.join(path.join(__dirname, 'files-copy'), file.name), output => {
                if (output) stdout.write(output);
            })

        }
    })
})