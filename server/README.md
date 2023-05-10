# DB-project server 🤙

## How to run server:

To run server properly you have to add `.env` file to your server folder. Without it server wont work.

1. cd server
2. yarn install
3. yarn start

# Endpoints:
## Auth
### POST `/auth/login`
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

### POST `/auth/register`
Description: Creates new user

Access token: `false`

Body:
```
{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
```

Returns: `201` 

### DELETE `/auth/logout`
Description: Logs out current user session

Access token: `false`

Body:
```
{
  token: string; // refreshToken
}
```

Returns: `204` 
