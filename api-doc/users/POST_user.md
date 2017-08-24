# User Resources

    POST api/users

## Description
Create/register a new user in the system

Doesn't require access token

***

## Parameters

```
{
  "name": "string",
  "username": "string",
  "email": "string",
  "password": "string"
}
```

*username* and *email* must be uniques

***
