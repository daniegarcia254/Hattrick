# Reset Password Resources

    POST api/

## Description
Request a password reset

Doesn't require access token

It will generate a key that will be used for reset the password.

The user will receive an email with a link to reset the password.

In that link, the generated key is included. The key expires after 24h and it can be used only once.

***

## Parameters

```
{
  "email": "string",
}
```

It must exist a user with the given email

**Return**


```
{
  "key": "generated-key",
  "email": "user-email",
  "created": "2017-08-24T21:23:59.824Z",
  "used": false,
  "id": 1,
  "userID": 1
}
```

***
