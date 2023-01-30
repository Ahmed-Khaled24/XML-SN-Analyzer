const searchPosts = require('../../../../features/graph-analyzer/searchPost')


function searchPostsHandler(event, json, data){
    let outputString ="";
    const searchResult = searchPosts(json,data);
    Object.keys(searchResult).forEach(key =>{
        outputString += `From => user (${key}): \n`;
        searchResult[key].forEach(postBody =>{
            outputString += `- ${postBody} \n`;
        })
        outputString += `\n`;
    })

    event.sender.send("searchPostsResponse" , outputString);
}

module.exports = searchPostsHandler