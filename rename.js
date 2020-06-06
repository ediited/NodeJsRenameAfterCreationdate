
var path = require('path'), fs = require('fs');
var fileName;
var stats;
var fromPath = "./";
var fileFormat = ".mp4";
var dataFormat = "YYYYMMDD";

var argv = require('minimist')(process.argv.slice(2));

if (typeof argv.f != "undefined") {
    if (argv.f.length > 0) {
        fileFormat = argv.f;
    }
}

if (typeof argv.p != "undefined") {
    if (argv.p.length > 0) {
        fromPath = argv.p;
    }
}

if (typeof argv.s != "undefined") {
    dataFormat = argv.s;
    
}


function getFilesFromPath(path, extension) {
    let files = fs.readdirSync(path);
    return files.filter(file => file.match(new RegExp(`.*\.(${extension})`, 'ig')));
}
var allVideos = getFilesFromPath(fromPath, fileFormat)


console.log(allVideos);
for (var i = 0; i < allVideos.length; i++) {
    stats = fs.statSync(fromPath + allVideos[i])
    if(dataFormat =="DDMMYYYY"){
        fileName = (stats.birthtime.getDay() + 1) + "." + (stats.birthtime.getMonth() + 1) + "." + stats.birthtime.getFullYear()
    }
    else if(dataFormat == "MMDDYYYY"){
        fileName = (stats.birthtime.getMonth() + 1) + "." + (stats.birthtime.getDay() + 1) + "." + stats.birthtime.getFullYear()
    }
    else if(dataFormat == "YYYYMMDD"){
        fileName = stats.birthtime.getFullYear() + "." + (stats.birthtime.getMonth() + 1) + "." + (stats.birthtime.getDay() + 1)
    }
    else if(dataFormat =="YYYYDDMM"){
        fileName = stats.birthtime.getFullYear() + "." + (stats.birthtime.getDay() + 1) + "." + (stats.birthtime.getMonth() + 1)
    }else{
        fileName = stats.birthtime.getFullYear() + "." + (stats.birthtime.getMonth() + 1) + "." + (stats.birthtime.getDay() + 1)
    }




    function renameFile(rfileName, copies) {
        if (fs.existsSync(fromPath + rfileName + "[" + copies + "]"+fileFormat)) {
            renameFile(rfileName, parseInt(copies, 10) + 1
            );
        }
        else {
            fs.renameSync(fromPath + allVideos[i], fromPath + rfileName + "[" + copies + "]" + fileFormat, function (err) {
                if (err) console.log('ERROR: ' + err);
                return;
            });
            console.log("Die Datei: " + allVideos[i] + " wird umbenannt in: "+ fileName + "[" + copies + "]" );
        }
        return;
    }
    renameFile(fileName, "0");
}
console.log("Done");