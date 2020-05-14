const getAllBlogUrls = require('./getAllBlogUrls.js')
const chalk = require('chalk')

const baseUrl = 'https://www.mrksquincy.com'
let baseArray = ['https://www.mrksquincy.com/wer', 'https://www.mrksquincy.com/xnkero', 'https://www.mrksquincy.com/pe93']

const blogArchivePages = [
  '/blog',
  '/blog-2019',
  '/blog-2018',
  '/blog-2017',
  '/blog-2016',
  '/blog-2015'
]
let archiveArray = []

blogArchivePages.forEach( archive=>{

  let promiseArray = []
  archiveArray.push(getAllBlogUrls(baseUrl, archive))

})

//console.log(archiveArray)
Promise.all(archiveArray).then( values=>{
  const buildArray = []
  const fullArray = values.forEach(value=>{
    //console.log(value)
    const buildArray = baseArray.concat(value)
    //console.log(`build array: ${buildArray}`)
    baseArray = buildArray
  })
  return baseArray
})
.then(finalArray =>console.log(finalArray))



//console.log(baseArray)
//Promise.all(baseArray).then(result=> console.log(result))
