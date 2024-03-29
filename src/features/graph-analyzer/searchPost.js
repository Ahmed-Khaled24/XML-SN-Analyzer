module.exports = function searchPosts(json, searchValue){
    let result = {};
    const graphObj = JSON.parse(json);

    graphObj.users?.forEach(user => {
        user.posts?.forEach(post =>{
            if(post?.body?.toLowerCase()?.includes(searchValue.toLowerCase())){
                if(result[user.id] === undefined){
                    result[user.id] = [];
                }
                result[user.id].push(post.body);
            }
        })
    });

    return result;

}
