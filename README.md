An application that uses react-testing-library + msw and cypress (without the alpha integration testing).

This application runs jest test **without mocks**, only by faking the API responses with MSW. It also contains:

- Styled components
- React intl
- React router
- React query

## Installation

- Clone the repository
- Run `npm i` at the root of the folder

## Running tests

- For RTL + MSW without watch mode, run `npm test:ci`
- For Cypress, run `npm start` in one terminal and `npm run cypress:headless` in another one
