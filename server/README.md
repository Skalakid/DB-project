# DB-project server 🤙

## How to run server:

To run server properly you have to add `.env` file to your server folder. Without it server wont work.

1. cd server
2. yarn install
3. yarn start

# Endpoints:
## Auth
### `/auth/login`
Description: Creates user session

Access token: `false`

Body:
```
{
  email: string;
  password: string;
}
```

Returns:
```
{
  accessToken: string;
  refreshToken: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
```

