const {ipcRenderer} = require('electron');

const mostActiveBtn = document.querySelector('.mostActiveUser-btn');
const outputTextArea = document.querySelector('.outPutTextArea')

mostActiveBtn.addEventListener('click' ,(e)=>{
  const xml = localStorage.getItem("textFieldValue");
  ipcRenderer.send('command', 'mostActiveUser', xml)
  ipcRenderer.on('mostActiveUserResponse' ,(event , data)=>{
    console.log(data);
    outputTextArea.value = data;
  })
})

document.querySelector('.xml-btn').addEventListener('click', () => {
    ipcRenderer.send('command', 'gotoXMLAnalyzer');
})

    document.addEventListener('DOMContentLoaded' , ()=>{
        const xml = localStorage.getItem("textFieldValue");
        const s = new sigma({
            renderer: {
              container: 'graph-container',
              type: 'canvas'
            },
            settings: {
              defaultNodeColor: '#FFF',
              maxNodeSize: 20,
              minArrowSize:15,
              edgeColor: 'default',
              defaultEdgeColor: '#FFF'
            }
          });
        ipcRenderer.send('command' , 'visualize' ,xml)
        ipcRenderer.on('visualizeReponse' , (event , data)=>{
            data = JSON.parse(data);
              s.graph.read(data)
              s.refresh()
        })
    })
