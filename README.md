# CRUD Products

The app is developed with [IONIC](https://ionicframework.com/) and [capacitor](capacitorjs.com/)

## Installation

```bash
$ npm install
```

## Environment Variables

The environment variables are found within the src/environments folder

## Running the app

```bash
# watch mode
$ ionic serve

# build production
$ ionic cap run android --prod
```

## API
In each request, the token generated with the firebase sdk is sent. The backend validates that it is valid in order to allow all operations to be performed. This token is automatically sent by an interceptor, found in src/app/services/interceptor.service.ts. It should be noted that firebase only uses sdk to maintain authentication states. The data and the validations of the users are stored in the backend/API.