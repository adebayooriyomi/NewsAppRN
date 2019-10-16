


export default {
    async fetchHeadlines(){
        try {
          let response = await fetch(
            'https://newsapi.org/v2/top-headlines?country=us&apiKey=e8d28130c9414eb9ae3fa39c67553511',
          );
          const responseJson = await response.json();
          console.log(responseJson)
          const articlesArray = []
          const allArticles = responseJson.articles

          allArticles.forEach(function(obj){
            // Convert All JSON Object value to String because some of them contains NULL
             const article = {
               source: String(obj.source.name),
               title: String(obj.title),
               url: String(obj.url),
               //Replace Image url with placeholder url if it is NULL
               urlToImage: String(obj.urlToImage === null ? "https://dummyimage.com/600x400/f7f7f7/000000&text=N" : obj.urlToImage),
               publishedAt: String(obj.publishedAt)
             }
             articlesArray.push(article)
          })
          return articlesArray;

        } catch (error) {
          console.error(error);
        }
    }
}
