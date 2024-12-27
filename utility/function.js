const { join } = require('path');
const { readdirSync, statSync } = require('fs');

module.exports = {
    /**
     * Recursively retrieves all file paths from a given directory.
     *
     * @function
     * @param {string} directoryPath - The absolute or relative path of the directory to scan.
     * @returns {string[]} An array containing the paths of all files within the directory and its subdirectories.
     * 
     * @example
     * const { getFilePaths } = require('./path/to/module');
     * const files = getFilePaths('./myDirectory');
     * console.log(files); // ['myDirectory/file1.txt', 'myDirectory/subdir/file2.txt']
     */
    getFilePaths: (directoryPath) => {
        if (!directoryPath) return undefined;
        let filePaths = [];

        const items = readdirSync(directoryPath);
        items.forEach(item => {
            const itemPath = join(directoryPath, item);

            if (statSync(itemPath).isDirectory()) {
                const nestedFilePaths = module.exports.getFilePaths(itemPath);
                filePaths.push(...nestedFilePaths);
            } else {
                filePaths.push(itemPath);
            }
        });

        return filePaths;
    }
}
