"use strict";

var fs = require('fs');
var join = require('path').join;

function getJsonFiles(jsonPath){
    let jsonFiles = [];
    function findJsonFile(path){
        let files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            let fPath = join(path,item);
            let stat = fs.statSync(fPath);
            if(stat.isDirectory() === true) {
                findJsonFile(fPath);
            }
            if (stat.isFile() === true) {
                jsonFiles.push(fPath);
                let fileName = fPath.slice(0, fPath.lastIndexOf("."));
                let upFileName = index > 0 ? jsonFiles[index-1].slice(0, jsonFiles[index-1].lastIndexOf(".")) : "";
                //   console.log("now file", fileName);
                //   console.log("up file", upFileName);
                // && fileName === upFileName.replace("(2)", "").trim())
                if ( upFileName.includes("(2)") ||
                    upFileName.includes("(3)") ||
                    upFileName.includes("(4)") ||
                    upFileName.includes("(5)") ||

                    upFileName.includes(" (2)") ||
                    upFileName.includes(" (3)") ||
                    upFileName.includes(" (4)") ||
                    upFileName.includes(" (5)") ) {
                    fs.unlink(fPath, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(upFileName, "文件删除成功！");
                    });
                }
            }
        });
    }
    findJsonFile(jsonPath);
}
// E:\Download\BT-26
getJsonFiles("E:\/Download\/BT-26");
