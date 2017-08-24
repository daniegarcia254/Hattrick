# User Resources

    POST api/users/resetPassword

## Description
Reset user password

Doesn't require access token

***

## Parameters

```
{
  "key": "string",
  "password": "string"
}
```

The key must exist, be valid (expires after 24h) and not used before

***
