# Testing

Tests are separated in two sections:

  * integration
    * Should be used to test endpoints, it will load the express app or a URL
  * unit
    * Should be used to test utils and inner services functions that you want to test in a different way from integration or with different inputs/order.
    Can be run only against typescript code

Commands:

 * `yarn test`

    * Will run unit and integration tests (typescript)

 * `yarn test:unit`

    * Run only unit tests (typescript)

 * `yarn test:integration`

    * Run only integration tests (typescript)

 * `yarn test:coverage`

    * Will run unit and integration tests (typescript) and open the default browser with the HTML coverage reporter


 * `yarn test:integration:js`

    * Run integration tests against compiled javascript server


 * `yarn test:ci`

    * Will run unit tests and integration tests against compiled javascript server
