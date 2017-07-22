# Gift Wrap App
This app allows you to define what status orders are set to, depending on whether any products have gift wrapping added.

If any item in an order has gift wrapping applied, the status of the order will be updated to the status you set within the app.

## How does this work?
The status of an order is updated auto-magically using the power of BigCommerce webhooks. As soon as an order is created, a webhook is triggered informing the app that the order has been placed. Based off the order ID passed in the webhook, the app will pull the order, check if any products have gift wrapping, then change the status based on the user's preference.
