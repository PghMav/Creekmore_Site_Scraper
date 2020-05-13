const cheerio = require('cheerio')
const rp = require('request-promise');


const getAllBlogUrls= async (baseURL, archivePage)=>{


  rp({
    uri: baseURL + archivePage
  })
    .then(html =>{

      console.log(html.headers)
      const blogUrls = []
      const $ = cheerio.load(html)
      const allATags = $('div.button-container > a.cta')
      //console.log(allATags['initialize'])
      const tagKeys = Object.keys(allATags)

      tagKeys.forEach(key=>{


        if(+key){
        const theUrl = allATags[key].attribs.href
        // console.log(theUrl)
        blogUrls.push(theUrl)

      }

    })
      //console.log(blogUrls)
      return blogUrls

    })
    // .then(newArray => {
    //   console.log(newArray)
    //   console.log(`third then`)
    // })
    .catch(e=>{
      console.log(`borken: ${e}`)
      return
    })


  // return blogUrls
}

// testPage = '/blog'
// getAllBlogUrls('https://www.mrksquincy.com', testPage)
//
//

module.exports = getAllBlogUrls
