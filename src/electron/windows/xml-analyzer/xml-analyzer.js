const inputTextArea = document.querySelector('.input-window textarea');
inputTextArea.focus();

inputTextArea.addEventListener('keydown', (event) => {
    if(event.keyCode == 9){
        event.preventDefault();
        inputTextArea.value += '    ';
    }    
});
