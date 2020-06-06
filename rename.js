
var path = require('path'), fs=require('fs');
var fileName;
var stats;
var fromPath = "./";
var fileFormat =".mp4";

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);

});
function getFilesFromPath(path, extension) {
    let files = fs.readdirSync( path );
    return files.filter( file => file.match(new RegExp(`.*\.(${extension})`, 'ig')));
}
var allVideos = getFilesFromPath(fromPath, fileFormat)


console.log(allVideos);
for(var i = 0; i<allVideos.length; i++){
    stats = fs.statSync("./"+allVideos[i])
    fileName = stats.birthtime.getFullYear()+"."+(stats.birthtime.getMonth()+1)+"."+(stats.birthtime.getDay()+1)
    function renameFile(rfileName,copies){
        if(fs.existsSync("./"+rfileName+"["+copies+"].mp4")){
            renameFile(rfileName,parseInt(copies, 10) + 1
            );
        }
        else{ 
        fs.renameSync("./"+allVideos[i], "./"+rfileName+"["+copies+"]"+".mp4", function(err) {
            if ( err ) console.log('ERROR: ' + err);
            return;
        });
        console.log("Die Datei: "+allVideos[i]+" wird umbenannt in: "+stats.birthtime.getFullYear()+"."+(stats.birthtime.getMonth()+1)+"."+(stats.birthtime.getDay()+1)+"["+copies+"]");
    }      
        return;
    }
   renameFile(fileName,"0");
}
console.log("Done");