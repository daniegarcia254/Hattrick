# User Resources

    GET api/users/{id}

## Description
Get user information by id

Requires access token.

User information will only be returned if the access_token belongs to the ID user.

***

## Example

```
/api/users/1?access_token=xxxxxxxxxxxxxxxx
```

**Returns**

```
{
  "name": "User Name",
  "created": "2017-08-24T20:40:06.000Z",
  "updated": null,
  "username": "username",
  "email": "user-email",
  "id": 1
}
```

