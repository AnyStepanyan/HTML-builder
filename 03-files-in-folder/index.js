const fs = require('fs')
const path = require('path')
const secretFolderPath = path.join(__dirname, 'secret-folder')

fs.readdir(secretFolderPath, { withFileTypes: true }, (err, files) => {

    files.filter(file => {

        if (file.isFile()) {
            fs.stat(path.join(secretFolderPath, file.name), (err, stats) => {
                console.log(file.name.slice(0, file.name.lastIndexOf('.')), "-",
                    path.extname(file.name).slice(1), "-", stats.size / 1000 + 'kb')
            })
        }

    })

})