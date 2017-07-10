# 没有错误
http status code = 200

# 可处理的错误
有error字段

```json
{
  "error": "invalid_credentials"
}
```

## invalid_credentials
（登入API）用户名/密码错误

## invalid_token
请求需要登入后访问的API时，提供了从login获得的token，但token无效（需要重新转到登入界面）

# 未预期的错误
无error字段，有message字段和status_code字段，同时会记录到storage/logs/laravel.log

```json
{
  "message": "The token could not be parsed from the request",
  "status_code": 500
}
```
