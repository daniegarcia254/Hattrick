# User Resources

    PUT api/users/{id}

## Description
Updates user information by id

Requires access token.

User information will only be returned if the access_token belongs to the ID user.

***

## Example

```
{
  "name": "New User Name",
  "username": "New username",
  "email": "New email"
}
```

**Returns**

```
{
  "name": "New User Name",
  "created": "2017-08-24T20:40:06.000Z",
  "updated": "2017-08-24T21:33:06.000Z",
  "username": "New username",
  "email": "New email",
  "id": 1
}
```

