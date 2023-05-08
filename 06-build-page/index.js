const fs = require('fs')
const path = require('path')
const { stdout } = process
const projectDistFolder = path.join(__dirname, "/project-dist")

fs.rm(projectDistFolder, { recursive: true }, err => {
    fs.mkdir(projectDistFolder, { recursive: true }, err => {
        if (err) {
            stdout.write(err)
        }
        const indexHtml = path.join(__dirname, "/project-dist/index.html")
        const templateHtml = path.join(__dirname, "/template.html")
        const componentsFolder = path.join(__dirname, "/components")
        const newIndexHtml = fs.createWriteStream(indexHtml)
        const newTemplateHtml = fs.createReadStream(templateHtml)
        var templateText = ""
        newTemplateHtml.on('data', text => templateText += text)
        newTemplateHtml.on('end', function () {

            fs.readdir(componentsFolder, { withFileTypes: true }, (err, files) => {
                if (err) {
                    stdout.write(err)
                } else {
                    for (let i = 0; i < files.length; i++) {
                        let fileFolder = path.join(componentsFolder, "/", files[i].name)
                        let fileName = files[i].name.split('.')[0];
                        let fileText = ''
                        let newFile = fs.createReadStream(fileFolder)
                        newFile.on('data', text => fileText += text);
                        newFile.on('end', function () {
                            if (path.parse(fileFolder).ext === ".html") {
                                templateText = templateText.replace(`{{${fileName}}}`, fileText)
                            }
                            if (i === files.length - 1) {
                                newIndexHtml.write(templateText)
                            }
                        })
                    }
                }
            })
        })

        const styleCSS = path.join(projectDistFolder, "/style.css")
        const newstyleCSS = fs.createWriteStream(styleCSS)
        const stylesFolder = path.join(__dirname, "/styles")

        fs.readdir(stylesFolder, function (err, files) {
            for (var i = 0; i <= files.length; i++) {
                var fileFolder = stylesFolder + '/' + files[i]
                if (path.parse(fileFolder).ext === ".css") {
                    fs.readFile(fileFolder, 'utf8', function (err, data) {
                        data += "\n"
                        newstyleCSS.write(data)
                    })
                }
            }
        })

        const newAssetsFolder = path.join(projectDistFolder, "/assets")
        const oldAssetsFolder = path.join(__dirname, "/assets")

        function copy(oldPath, newPath) {
            fs.mkdir(newAssetsFolder, { recursive: true }, err => {
                if (err) {
                    stdout.write(err)
                }
            })
            fs.readdir(oldAssetsFolder, { withFileTypes: true }, (err, files) => {
                if (err) throw Error("Old assets folder doesn't exist")
                else {
                    files.forEach(file => {
                        var fileOld = path.join(oldAssetsFolder, "/", file.name)
                        var fileNew = path.join(newAssetsFolder, "/", file.name)
                        if (file.isDirectory()) {
                            copyFolder(fileOld, fileNew)
                        } else {
                            fs.copyFile(fileOld, fileNew, err => {
                                if (err) {
                                    stdout.write(err)
                                }
                            })
                        }
                    })
                }
            })
            copy(oldAssetsPath, newAssetsPath)
        }
    })
})