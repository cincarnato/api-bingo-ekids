const { PubSub } = require( 'graphql-subscriptions');

const pubsub = new PubSub();

module.exports.pubsub = pubsub

// ... Later in your code, when you want to publish data over subscription, run:

const payload = {
    itemAdded: {
        id: '1',
        name: 'Hello!',
    }
};

pubsub.publish('itemAdded', payload);