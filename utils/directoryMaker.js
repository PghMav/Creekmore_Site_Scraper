const fs = require('fs')
const path = require('path')



const directoryMaker = (href)=>{
  const mainDirPath = path.join(__dirname, `../files/${href}`)
  if(fs.existsSync(mainDirPath)){
    console.log(`Directory for ${mainDirPath} already exists`)
    process.exit(0)
  }
  fs.mkdirSync(mainDirPath)
  const directoryBlog = path.join(mainDirPath, '/blog'),
        directoryHDWT = path.join(mainDirPath, '/hunter-douglas-window-treatments'),
        directoryHD = path.join(mainDirPath, '/hunter-douglas'),
        directoryCSS = path.join(mainDirPath, '/css')

  fs.mkdirSync(directoryBlog)
  fs.mkdirSync(directoryHDWT)
  fs.mkdirSync(directoryHD)
  fs.mkdirSync(directoryCSS)
}

// const sampleHref = 'mkquincy.com'
//
// filemaker(sampleHref)

module.exports = directoryMaker
