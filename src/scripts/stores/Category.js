var BaseStore = require('./Base');

function ArticleStore(options) {
    BaseStore.call(this, options);
}

ArticleStore.prototype = Object.create(BaseStore.prototype);

Object.assign(ArticleStore.prototype, {
    resourceName: 'categories',
    processResponse: function (data) {
        // for this demo we don't care about pagination info
        // coming back from API, but you could save / process it here
        return data.content;
    },
    getDefaultParams: function () {
        return {
            page: 1,
            // right now there's no way to filter categories in API call
            // so just getting all of them and doing filtering client side
            pageSize: 9999
        };
    }
});

module.exports = ArticleStore;

