// Event Handler
const { join } = require('path');
const { getFilePaths } = require('../utility/function');

const eventsPath = join(__dirname, '..', 'events');

module.exports = (client) => {
    const filePaths = getFilePaths(eventsPath);
    for (const filePath of filePaths) {
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}