/*
 * Script for gathering some file data via nodejs
 *
 * 2 file params:
 *
 * 1) directory to parse
 * 2) string to substract from absolute directory path structure
 *
 * Usage example:
 * node getdata.js /Users/user/Coding/Testdirectory/ /Users/user/Coding/
 *
 * Parsing Testdirectory and all subdirectories for files.
 * Pathstructure will look like:  Testdirectory/Subdirectory ..
 *
 */
var fs = require('fs'),
    directory = process.argv[2] || '';
    prefix = process.argv[3] || '';
    fileTypes = {
        'txt': 'Text File',
        'js': 'JavaScript File',
        'html': 'HTML File',
        'css': 'Cascading Style Sheet',
        'jpg': 'Image JPEG',
        'json': 'JSON File',
        'jpeg': this['jpg']
    };
var readDir = function(dir, level){
    
    var fileId = +new Date,
        result,
        dirWithoutPre = dir.replace(prefix, '');


    if(arguments.length > 2){
        fileId = arguments[2];
    }


    result = {
        name: dirWithoutPre,
        id: dirWithoutPre,
        children: []
    };

    var files = fs.readdirSync(dir),
        flen = files.length;

    while(flen--){

        var file = files[flen],
            path = dir + file,
            pathWithoutPre = path.replace(prefix,''),
            stats = fs.statSync(path),
            obj;

        obj = {
            id: pathWithoutPre,
            name: file,
            children: [],
            data: {
                name: file,
                fileType: 'Directory',
                path: pathWithoutPre,
                size: stats.size
            }
        };

        if(stats.isDirectory()){
            
            var nuFileId = +new Date;
            nuFileId+= ((Math.random()*1000+1) >> 0);
            
            obj.leaf = false;
            obj.data.next = nuFileId+'.json';
            if(level < 1){
                obj.children = arguments.callee.call(this, path + '/', (level+1), nuFileId).children;
            }
            arguments.callee.call(this, path + '/', 0, nuFileId);
            
        }

        if(stats.isFile()){
            var fileType = file.match(/[0-9a-z]+$/i)[0];
            obj.leaf = true;
            obj.data.fileType = fileTypes[fileType] || 'File';
        }

        result.children.push(obj);

    }
    if(level == 0)
    fs.writeFile(fileId+'.json', JSON.stringify(result, null, 4), function(err){
        console.log(err);
    });

    return result;

};

readDir(directory, 0, 'file-root');
