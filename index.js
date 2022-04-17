const express= require('express')
const axios= require('axios')
const cheerio= require('cheerio')

const app= express()
const port = process.env.PORT || 3000

const papers=[
    {
        name:'IndianExpress',
        address:'https://indianexpress.com/?s=crypto',
    },
    {
        name:'TimesOfIndia',
        address:'https://timesofindia.indiatimes.com/business/cryptocurrency',
    },
    {
        name:'HindustanTimes',
        address:'https://www.hindustantimes.com/search?q=crypto',
    },
    {
        name:'TheNewIndianExpress',
        address:'https://www.newindianexpress.com/topic?term=crypto&request=ALL&search=short',
    },
    {
        name:'DeccanChronical',
        address:'https://www.deccanchronicle.com/business',
    },
    {
        name:'DeccanHerald',
        address:'https://www.deccanherald.com/search?term=crypto',
    },
    {
        name:'NYTimes',
        address:'https://www.nytimes.com/search?query=crypto',
    },
    {
        name:'WashingtonPost',
        address:'https://www.washingtonpost.com/search/?query=crypto&btn-search=&facets=%7B%22time%22%3A%22all%22%2C%22sort%22%3A%22relevancy%22%2C%22section%22%3A%5B%5D%2C%22author%22%3A%5B%5D%7D',
    },
]

const articles=[]

function getitems(address){
    axios.get(address)
    .then((res)=>{
        const html= res.data
        // console.log(html);
        const $ = cheerio.load(html)

        $('a:contains("crypto")',html).each(function(){
            const title = $(this).text()
            const URL= $(this).attr('href')
            // console.log(title);
            // console.log(URL);

            articles.push({
                title,
                URL,
                name: address.name
            })
        })
        // console.log(articles);
    }).catch(e=>{console.error(e)})
}

papers.forEach(paper=>{
getitems(paper.address)
    
})

app.get('/', (req,res)=>{
    res.json("This is a Crypto API")
})

app.get('/news', (req,res)=>{
    res.json(articles)
})
// app.get('/news/:id', (req,res)=>{
//     const id=req.params.id   
//     getitems(papers.filter(newspapaer=> newspapaer.name == id)[0].address)
//     res.json(articles)

    
// })

app.listen(port, ()=> console.log(`running on https://localhost:${port}` ))