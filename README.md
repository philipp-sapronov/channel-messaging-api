# Channel Messaging API Demo App

**[Try it on the github pages](https://philipp-sapronov.github.io/channel-messaging-api)**

**🧙 Sample Code for DevTools Console:**

To intercept messages sent from an iframe, insert the following code into the DevTools console.

```js
window.addEventListener("message", (e) => alert(JSON.stringify(e.data.data)));
```

This example demonstrates a simple script for illustration purposes, but a real-world scenario involving a malicious script could be much more complex and dangerous. Malicious scripts can exploit security vulnerabilities to intercept sensitive data, manipulate content, or perform other harmful actions.

**🍉 Checkout with Watermelon:**

When you click on the watermelon button, an alert will first appear with the order details, followed by a message in the console. This demonstrates intercepting messages from the iframe that interacts with the parent window.

**🥑 Checkout with Avocado:**

When you click on the avocado button, no alert will be shown because the external script does not have access to the messaging channel. The avocado is integrated using the Channel Messaging API, which allows safe data transfer between components without information leakage.

**🛒 Editing the Amount:**
When you edit the amount, the changes are sent through the port from the host application to the iframe, demonstrating a two-way communication channel. This ensures real-time data synchronization between components.

**Development**

```bash
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
