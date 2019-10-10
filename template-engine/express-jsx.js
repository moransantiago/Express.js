const fs = require('fs');

getKeysFromOptions = (options) => {
    const { settings, _locals, ...objectKeys } = options;
    return Object.keys(objectKeys);
}

getRenderedContent = (content, options) => {
    const keys = getKeysFromOptions(options);
    let contentString = content.toString();

    for (let key of keys) {
        contentString = contentString.replace(
            new RegExp(`\{${key}\}`, 'gi'),
            options[key]
        );
    }
    
    return contentString;
}

expressJsx = (filePath, options, callback) => {
    fs.readFile(filePath, (error, content) => {
        if (error) {
            return callback(error);
        }

        const rendered = getRenderedContent(content, options);

        return callback(null, rendered);
    });
}

module.exports = expressJsx;