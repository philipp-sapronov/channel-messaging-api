# Channel Messaging API Demo App

**[Try it on Github Pages](https://philipp-sapronov.github.io/channel-messaging-api)**

### How to use this demo

**🧙 Insert Malicious Script**

Insert the following script into the DevTools Console to intercept every message sent from the iframe:

```js
window.addEventListener("message", (e) =>
  alert(JSON.stringify(e.data.payload))
);
```

This example demonstrates a simple script for illustration purposes, but a real-world scenario involving a malicious script could be much more complex and dangerous.

**🛒 Edit the Amount**

When you edit the amount, the changes are sent through the [MessagePort](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort) from the host application to the iframe, demonstrating a two-way communication channel. This ensures real-time data synchronization between components.

**🍉 Checkout with Watermelon**

Watermelon uses the standard [postMessage](https://developer.mozilla.org/ru/docs/Web/API/Window/postMessage) method for communication, which can be easily intercepted by harmful scripts. If a malicious script is added, **an alert will pop up showing the order details,** revealing the vulnerability of sensitive data. This shows how messages from an iframe can be intercepted when it communicates with the parent window.

**🥑 Checkout with Avocado**

When you click on the avocado button, **no alert will be shown,** because the external script does not have access to the [MessageChannel](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel). The avocado is integrated using the [Channel Messaging API](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API), which allows safe data transfer between components without information leakage.

**Development**

```bash
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
