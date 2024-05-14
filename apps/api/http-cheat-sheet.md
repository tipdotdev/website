# HTTP Status codes

### 1xx - Informational
`100` - Continue

`101` - Switching Protocols

`102` - Processing


### 2xx - Success
`200` - OK

`201` - Created

`202` - Accepted

`204` - No Content


### 3xx - Redirection
`302` - Found - (also commonly used for URL `redirection` or use `303`)

`303` - See Other - (commonly used for URL `redirection`)

`304` - Not Modified
    
`305` - Use Proxy

`306` - Switch Proxy

`307` - Temporary Redirect


### 4xx - Client Error
`400` - Bad Request

`401` - Unauthorized - invalid or missing authentication credentials

`402` - Payment Required

`403` - Forbidden - valid authentication but inadequate authorization

`404` - Not Found

`405` - Method Not Allowed

`406` - Not Acceptable

`407` - Proxy Authentication Required

`408` - Request Timeout

`409` - Conflict

`410` - Gone

`429` - Too Many Requests


### 5xx - Server Error
`500` - Internal Server Error

`501` - Not Implemented

`502` - Bad Gateway

`503` - Service unavailable

`504` - Gateway Timeout

`505` - HTTP Version Not Supported