import utils from './utils'

const baseURL = 'https://newsapi.org/v2'
const apiKey = 'e8d28130c9414eb9ae3fa39c67553511'
const dummyImageUrl = "https://dummyimage.com/600x400/f7f7f7/000000&text=N"

export default {
    async fetchHeadlines(newsId){

        //if fetchHeadlines is called with parameter = "newsId" fetchHeadlines with Sources "Id" parameter else fetch all topheadline from various news Publishers
        const fetchUrl = newsId
        ? baseURL+"/top-headlines?sources=" + newsId + "&apiKey="+apiKey
        : baseURL+'/top-headlines?country=us&apiKey='+apiKey
        try {
          let response = await fetch(fetchUrl);
          let responseJson = await response.json();
          const articlesArray = []
          const allArticles = responseJson.articles

          allArticles.forEach(function(obj){
            // Convert All JSON Object value to String because some of them contains NULL
             const article = {
               source: String(obj.source.name),
               title: (String(obj.title)),
               url: String(obj.url),
               //Replace Image url with placeholder url if it is NULL
               urlToImage: String(obj.urlToImage === null ? dummyImageUrl : obj.urlToImage),
               publishedAt: String(utils.formatDate(obj.publishedAt))
             }
             articlesArray.push(article)
          })
          return articlesArray;

        } catch (error) {
          console.error(error);
        }
    },
    // All named sources with English news
    async fetchSources(category) {

         //if called with parameter = "category" fetch with "category"  else fetch all 
         const fetchUrl = category
         ? baseURL+'/sources?category='+category+'&language=en&apiKey='+apiKey
         : baseURL+'/sources?language=en&apiKey='+apiKey

        try {
          let response = await fetch(fetchUrl);
          const responseJson = await response.json();
          console.log(responseJson)
          const sourcesArray = []
          const allSources = responseJson.sources

          allSources.forEach(function(obj){
            // Convert All JSON Object value to String because some of them contains NULL
             const article = {
               id: String(obj.id),
               name: String(obj.name),
               description: String(obj.description),
               url: String(obj.url),
               category: String(obj.category),
               language: String(obj.language),
             }
             sourcesArray.push(article)
           })
          return sourcesArray;

        } catch (error) {
          console.error(error);
        }
    }
}
