const { TaggedPayClient } = require('./dist');

try {
    const client = new TaggedPayClient({
        apiKey: 'test_api_key'
    });

    if (client.tags && client.payments) {
        console.log('SDK initialized successfully with resources');
    } else {
        throw new Error('Resources not initialized');
    }
} catch (error) {
    console.error('Failed to initialize SDK:', error);
    process.exit(1);
}
