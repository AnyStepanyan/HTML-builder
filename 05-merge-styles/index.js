const path = require("path")
const fs = require("fs")
const { stdout } = process
const projectDistFolder = path.join(__dirname, './project-dist')
const stylesFolder = path.join(__dirname, './styles')
const bundleCssFile = './bundle.css'


fs.readdir(stylesFolder, { withFileTypes: true }, (error, files) => {
    if (error) {
        stdout.write(error)
    }

    const filteredCssFiles = files.filter((file) => {
        return file.isFile() && path.extname(file.name) === ".css"
    })

    fs.mkdir(projectDistFolder, { recursive: true }, (error) => {
        if (error) {
            stdout.write(error)
        }

        const addStylesToBundleCssFile = filteredCssFiles.map((file) => {
            return fs.readFileSync(path.join(stylesFolder, file.name), "utf-8")
        }).join("\n")

        fs.writeFile(path.join(projectDistFolder, bundleCssFile), addStylesToBundleCssFile, (error) => {
            if (error) {
                stdout.write(error)
            }
            stdout.write("Bundle-css file was created")
        })
    })
})



