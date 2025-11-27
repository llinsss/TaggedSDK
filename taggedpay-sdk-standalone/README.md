# TaggedPay SDK

Hey there! 👋 Welcome to the TaggedPay SDK.

This little library is your gateway to integrating tag-based crypto payments into your app. We've designed it to be simple, intuitive, and easy to get along with.

## Getting Started

First things first, let's get this package installed. Pop open your terminal and run:

```bash
npm install @taggedpay/sdk-standalone
```

## How to Use It

Using the SDK is pretty straightforward. You'll need an API key to get the party started.

Here's a quick example to show you the ropes:

```typescript
import { TaggedPayClient } from '@taggedpay/sdk-standalone';

// Initialize the client with your secret key
const client = new TaggedPayClient({
  apiKey: 'your_super_secret_api_key',
});

async function main() {
  try {
    // 1. Let's create a new tag
    const newTag = await client.tags.create({
      name: 'Coffee Fund',
      description: 'Donations for the office espresso machine',
    });
    console.log('Tag created:', newTag);

    // 2. Now, let's create a payment for that tag
    const payment = await client.payments.create({
      amount: 5.00,
      currency: 'USD',
      tag_id: newTag.id,
    });
    console.log('Payment initiated:', payment);

  } catch (error) {
    console.error('Oops, something went wrong:', error);
  }
}

main();
```

## What's Inside?

Currently, we support two main things:

### Tags
Think of these as labels or categories for your payments. You can create them, list them, and look them up by ID.
- `client.tags.list()`
- `client.tags.create({ name, description })`
- `client.tags.get(id)`

### Payments
The bread and butter! Use this to initiate payments associated with a specific tag.
- `client.payments.create({ amount, currency, tag_id })`
- `client.payments.get(id)`

## Need Help?

If you run into any trouble or just want to say hi, feel free to reach out. We're here to help you build something awesome! 🚀
