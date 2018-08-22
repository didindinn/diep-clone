const serverManager = require('./core/serverManager.js'),
commandList = require('./commands/index.js');

class server {
    constructor(config) {
        this.config = config;
        this.status = 'off';
        this.serverManager = new serverManager(this.config);
    }

    async init() {
        this.status = 'launching';
        await this.serverManager.init();
        console.log(`[\x1b[36mConsole\x1b[0m] Server running node ${process.version} On port ${this.config.port}`);
        this.cmds = new (require('asyncconsole'))(' > ', data => {
            var msg = data.trim().toString().split(" ");
            for (var i in commandList) if(i === msg[0]) commandList[i](msg, this)
        });
        this.status = 'on';
    }

    async shutdown() {
        this.status = 'closing';
        await this.serverManager.shutdown();
        this.status = 'off';
        process.exit(0);
    }
};

module.exports = server;
