const fs = require('fs')

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
                let postBodyArr=[]
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
    //console.log(file[2][2]);

    content = JSON.stringify(file);
    try {
        fs.writeFileSync('./compressed.txt', content);
        // file written successfully
      } catch (err) {
        console.error(err);
      }
}

function decompressAndSave(file , filePath){
    let lines= ['<users>']
    for(let i=1 ; i< file.length ; i++ ){
        lines.push('\t<user>')
        // id value
        let id = file[i][0]
        lines.push(`\t\t<id>${id}</id>`)

    
        // name value
        let name = file[i][1]
        lines.push(`\t\t<name>${name}</name>`)


        lines.push('\t\t<posts>')
        let postsLength = file[i][2].length
        //console.log(postsLength);
        for(let k=0 ; k< postsLength  ; k++){
            let postBody = file[i][2][k][0]
           // console.log('POSTBODY => ',postBody);
            lines.push(`\t\t\t<post>`)
            lines.push(`\t\t\t\t<body>`)
            lines.push('\t\t\t\t\t'+postBody)
            lines.push(`\t\t\t\t</body>`)

            let topicsLength = file[i][2][k][1].length
            //console.log(topicLength);
            lines.push(`\t\t\t\t<topics>`)
            for(let j=0 ; j<topicsLength ; j++){
                lines.push(`\t\t\t\t\t<topic>`)
                let topic = file[i][2][k][1][j]
                //console.log(topic);
                lines.push('\t\t\t\t\t\t'+topic)
                lines.push(`\t\t\t\t\t</topic>`)
            }
            lines.push(`\t\t\t\t</topics>`)
            lines.push(`\t\t\t</post>`)
        }
        lines.push('\t\t</posts>')

        lines.push(`\t\t<followers>`)
        let followersLength = file[i][3].length
        for(let h=0 ; h<followersLength ; h++){
            let followerID = file[i][3][h]
            lines.push(`\t\t\t<follower>`)
            lines.push(`\t\t\t\t<id>${followerID}</id>`)
            lines.push(`\t\t\t</follower>`)

        }
        lines.push(`\t\t</followers>`)

        lines.push(`\t\t</user>`)
        

    }
    lines.push(`</users>`)

    SaveToFile(lines, filePath)
    return lines
}

async function SaveToFile(lines , filePath){
    let logger = fs.createWriteStream(filePath, {
        flags : 'a'
    })

    lines.forEach(line => {
        line = line + '\n'
        logger.write(line)
    });
    logger.end()

    
}




let test = [
    
    ['1' , 'Ahmed Ali', [['postBody1', ['topic1','topic2']],['postBody2', ['topic1','topic2']]] ,['1','2']],

    ['2' , 'Omar Ali', [['postBody1', ['topic1','topic2']],['postBody2', ['topic1','topic2']]] ,['1','2']]

]


//console.log(test);
 let lines = decompressAndSave(test ,'./Decompressed.xml')
console.log(lines);
//console.log(test[0][1]);