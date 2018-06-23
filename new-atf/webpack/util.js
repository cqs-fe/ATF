/*
 * @Author: ZhuQingguang
 * @Date:   2018-06-20
 * @Last Modified by: ZhuQingguang
 * @Last Modified time: 2018-06-20
 */
const glob = require('glob');
const path = require('path');
const fs = require('fs');

 /**
  * 获取 webpack 入口设置
  */
exports.getEntryConfig = function (globPath, srcDirName = 'src', staticDirName = 'static', htmlDirName = '') {
    let result = {
        entry: {},
        html: []
    };
    glob.sync(globPath).forEach((entry) => {
        // demo: src/pages/testplan/index.js
        let filePath = path.resolve(process.cwd(), entry); // entry 完整路径： /User/...
        let fileDir = path.dirname(filePath); // entry 目录
        let extname = path.extname(filePath); // .html
        let basename = path.basename(filePath, extname); // index
        let jsFilePath = path.join(fileDir, basename + '.js');
        let htmlDir = path.dirname(entry).replace(srcDirName, '');  // /pages/testplan
        let fileRelativePath = htmlDir + '/' + basename; // /pages/testplan/index

        let htmlFile = fileRelativePath + extname; // /pages/testplan/index.html
        let chunks = [];

        if (fs.existsSync(jsFilePath)) {
            // 添加到 entry
            let entryKey = staticDirName + fileRelativePath; // static/pages/demo/index
            result.entry[entryKey] = jsFilePath;
            chunks.push(entryKey);
        }
        result.html.push({
            filename: (htmlDirName + htmlFile).slice(1), // pages/testplan/index.html
            template: srcDirName + htmlFile,
            chunks
        });
    });
    console.log('entries: ', result.entry);
    return result;
};
