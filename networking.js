


export default {
    async fetchHeadlines(){
        try {
          let response = await fetch(
            'https://newsapi.org/v2/top-headlines?country=us&apiKey=e8d28130c9414eb9ae3fa39c67553511',
          );
          let responseJson = await response.json();
          console.log(responseJson)
          return responseJson.articles;
        } catch (error) {
          console.error(error);
        }
    }
}
