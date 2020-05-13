const cheerio = require('cheerio')
const rp = require('request-promise');


const getAllBlogUrls=  async (baseURL, archivePage)=>{

  const blogUrls = []

  await rp({
    uri: baseURL + archivePage
  })
    .then(html =>{

      console.log(html.headers)

      const $ = cheerio.load(html)
      const allATags = $('div.button-container > a.cta')
      //console.log(allATags['initialize'])
      const tagKeys = Object.keys(allATags)

      tagKeys.forEach(key=>{


        if(+key){
        const theUrl = allATags[key].attribs.href
        // note: this module concatenates the url with '/blog'
        //instead of the actual archive page url so that it easily
        //files these scrapes into the proper folders.
        blogUrls.push('/blog' + theUrl)

      }

    })
      // console.log(Object.keys(blogUrls))
      // console.log(blogUrls['15'])
      // return blogUrls

    })
    .catch(e=>{

      return []
    })


  return blogUrls
}

// testPage = '/blog'
// getAllBlogUrls('https://www.mrksquincy.com', testPage)
//


module.exports = getAllBlogUrls
