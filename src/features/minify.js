

 module.exports = function minify(lines){
    let size = lines.length;
    for(let i =0 ;i < size;i++){
        lines[i] = lines[i].trim().replace('\n', '');
    }
return lines.join('');
}
