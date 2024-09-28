const config = require('../../../config.json');
const mongoose = require('mongoose');
const chalk = require('chalk');
const { ActivityType } = require('discord.js');
const { prefixHandler } = require('../../functions/handlers/prefixHandler');
const { handleCommands } = require('../../functions/handlers/handleCommands');
const path = require('path');
const mongodbURL = config.database.mongodbUrl;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(chalk.green.bold('INFO: ') + 'Bot is ready and connected to Discord!');

        if (!mongodbURL || mongodbURL === 'YOUR_MONGODB_URL') {
            console.log(chalk.yellow.bold('INFO: ') + 'MongoDB URL is not provided or is set to the default placeholder. Skipping MongoDB connection.');
        } else {
            try {
                await mongoose.connect(mongodbURL);
                if (mongoose.connect) {
                    console.log(chalk.green.bold('SUCCESS: ') + 'Connected to MongoDB successfully!');
                }
            } catch (error) {
                console.log(chalk.red.bold('ERROR: ') + 'Failed to connect to MongoDB. Please check your MongoDB URL and connection.');
                console.error(error);
            }
        }



        client.user.setPresence({
            activities: [{
                type: ActivityType.Custom,
                name: "custom",
                state: "🚀 discobase!"
            }]
        })
        prefixHandler(client, path.join(process.cwd(), 'src/messages'));
        handleCommands(client, path.join(process.cwd(), 'src/commands'));
    },
};
