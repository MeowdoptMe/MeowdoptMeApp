# MeowdoptMe

This repository will hold our adoption app.

## Install

1. Clone repo with: `git clone https://github.com/MeowdoptMe/MeowdoptMeApp <directory>`
1. Make sure you have [Node.JS](https://nodejs.org/en) installed!
1. Run `yarn` in project's root directory and `MeowdoptMeApp/`.

## Connecting to local server on android

Make sure to have a port forwarded in Android Studio with the following line:

`adb reverse tcp:<port> tcp:<port>`

Which defaults to:
`adb reverse tcp:8000 tcp:8000` for our Backend server and

`adb reverse tcp:8081 tcp:8081` for metro server (sometimes it's needed).

## Testing

### Running tests

To run tests run:

- `yarn test` in root directory for all suites,
- `yarn test:root` in root directory for just root test suites,
- `yarn test:app` in root directory for just app test suites (WIP)

### Writing tests

Main tests are located in `__tests__` in project's root directory. Add your tests there.

## Making a pull request

Before making a pull request please do:

- `yarn static-checks`

for TypeScript type-checking and ESLint to catch any errors in your code.
