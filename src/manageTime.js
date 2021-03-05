function exportTime(numStr){
    const num = parseInt(numStr,10);
    const date = new Date(num);
    return String(date.getHours())+":"+String(date.getMinutes())+":"+String(date.getSeconds())
}