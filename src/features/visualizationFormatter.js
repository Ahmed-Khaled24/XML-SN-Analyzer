
module.exports = function formatGraph(graphOutList){
    let edges =[];
    let nodes =[];
    let count =0;
    

    // Generate nodes
    Object.keys(graphOutList).forEach(key=>{
        let node ={id:key, label:`user(${key})`, x: Math.floor(Math.random() * 1000) + 1,y:Math.floor(Math.random() * 1000) + 1 , size: 20 };
        nodes.push(node);
    })
    
    // Generate edges
    Object.keys(graphOutList).forEach(key => {
        graphOutList[key].forEach(el => {
            let edge = {id: ""+count,source:key ,target:el, color:'#282c34', type: "arrow",size:10};
            edges.push(edge);
            count++;
        })
    })

    return {nodes,edges};
}