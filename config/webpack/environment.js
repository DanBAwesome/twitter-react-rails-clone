const { environment } = require('@rails/webpacker')

const path = require('path');

const customConfig = {
    resolve: {
        alias: {
            '@img': path.resolve(__dirname, '..', '..', 'app/assets/images')
        }
    }
}

environment.config.merge(customConfig);

module.exports = environment
