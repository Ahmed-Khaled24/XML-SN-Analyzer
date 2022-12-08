
module.exports = function compress(root){
    let file = [["id","name","posts(body,topic)","followers(id)"]]
    for(let i=0 ; i<root.descendants.length ; i++){
        let subFile = []
        for(let n=0 ; n<root.descendants[i].descendants.length ; n++){
            let nnname = root.descendants[i].descendants[n].name;
        if(root.descendants[i].descendants[n].name ==="id") {


            subFile.push(root.descendants[i].descendants[n].value)}
        if(root.descendants[i].descendants[n].name ==="name") subFile.push(root.descendants[i].descendants[n].value)
        if(root.descendants[i].descendants[n].name ==="posts") {
            let postArr =[]
            for(let k=0 ; k< root.descendants[i].descendants[n].descendants.length ; k++){
                let postBodyArr 
                for(let h=0 ; h <root.descendants[i].descendants[n].descendants[k].descendants.length ; h++){
                if(root.descendants[i].descendants[n].descendants[k].descendants[h].name === "body")postBodyArr=(root.descendants[i].descendants[n].descendants[k].descendants[h].value)
                if(root.descendants[i].descendants[n].descendants[k].descendants[h].name === "topics"){
                    let topncsPostSubArr = []
                    for(let j=0 ; j < root.descendants[i].descendants[n].descendants[k].descendants[h].descendants.length ; j++){
                        topncsPostSubArr.push(root.descendants[i].descendants[n].descendants[k].descendants[h].descendants[j].value)
                    }
                    let wholePostArr = [postBodyArr , topncsPostSubArr]
                    postArr.push(wholePostArr)
                }
            }
        }

            subFile.push(postArr)
        }
        if(root.descendants[i].descendants[n].name === "followers"){
            let followersArr =[]
            for(let k=0 ; k<root.descendants[i].descendants[n].descendants.length ; k++){
               followersArr.push(root.descendants[i].descendants[n].descendants[k].descendants[0].value)
            }
            subFile.push(followersArr)
        }

    }
    file.push(subFile)

    }
    console.log(file);
    //content = JSON.stringify(file);
    // try {
    //     fs.writeFileSync('./compressed.txt', content);
    //     // file written successfully
    //   } catch (err) {
    //     console.error(err);
    //   }
}

