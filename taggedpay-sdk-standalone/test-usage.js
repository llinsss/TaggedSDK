const { TaggedPayClient } = require('./dist');

try {
    const client = new TaggedPayClient({
        apiKey: 'test_api_key'
    });
    console.log('SDK initialized successfully');
} catch (error) {
    console.error('Failed to initialize SDK:', error);
    process.exit(1);
}
