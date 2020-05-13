const cheerio = require('cheerio');
const chalk = require('chalk');
const rp = require('request-promise');
const fs = require('fs')
const _ = require('lodash')
const theUrl = require('url')
const yargs = require('yargs')
const getAllBlogUrls = require('./utils/getAllBlogUrls.js')



const theArgs = yargs.parse()
const baseUrl = theArgs.url

const scrapeXML = baseUrl + '/sitemap.xml'

if(!baseUrl){
  console.log(`please supply a valid homepage for the first argument, and a valid scrape type.`)
  process.exit(0)
}

// const mobileOptions = {
//   uri: scrapeXML,
//   headers: {
//     'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
//   }
// }

const scraper = rp(scrapeXML)
                .then(html=>{
                  const $ = cheerio.load(html);
                  const allLocs = $('loc')
                  const locKeys = _.keys(allLocs)

                  const metaData = []
                  const urlList = []

                  locKeys.forEach(key=>{

                    const locNum = Number(key)
                    const currentLoc = allLocs[locNum]


                    if(currentLoc === undefined){
                      return
                      }
                    const theURL = currentLoc.children[0].data

                    urlList.push(theURL)
                      })
                  return urlList
                    })
                    //adding a new promise chain that iterates
                    //over urlArray, finds blog pages, then scrapes them
                    //to add to ultimate array.
                    //reminder: the getAllBlogUrls module concatenates the
                    //actual url with the string '/blog' to file them in the
                    //proper folder.
                .then(urlArray=>{

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
                      const buildArray = urlArray.concat(value)
                      //console.log(`build array: ${buildArray}`)
                      urlArray = buildArray
                    })
                  })


                  return urlArray
                })
                .then( urlArray=>{

                  switch(theArgs.type){
                    case 'HTML':
                    const scrapeHtml = require('./utils/scrapeHtml.js')
                    scrapeHtml(urlArray)
                    return
                    case 'SCREENSHOT':
                    const screenShotter = require('./utils/screenshotter.js')
                    screenShotter(urlArray)
                    return
                    case 'BOTH':
                    const scrapeHtml2 = require('./utils/scrapeHtml.js')
                    scrapeHtml2(urlArray)
                    const screenShotter2 = require('./utils/screenshotter.js')
                    screenShotter2(urlArray)
                    return
                    default:
                    throw new Error(`Enter valid type`)
                  }
                })
                .catch(e=>{
                        console.log(chalk.bold.red(`BORKEN BIG TIME:`), e)
                      })
