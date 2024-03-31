# Register
curl --location 'http://127.0.0.1:4000/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "xyz",
    "password": "12345678",
    "email": "xyz@gmail.com"
}'

# Login
curl --location 'http://127.0.0.1:4000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "password": "12345678",
    "email": "xyz@gmail.com"
}'

# Logout
curl --location 'http://127.0.0.1:4000/logout' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhb...' \
--data '{}'

# Fetch Public Data
curl --location --request GET 'http://127.0.0.1:4000/api/fetch_public_data?category=animal&limit=40&offset=10' \
--header 'Authorization: Bearer eyJhb...' \
--header 'Content-Type: application/json' \
--data '{}'

# Fetch Balance
curl --location --request GET 'http://127.0.0.1:4000/api/fetch_balance?address=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' \
--header 'Authorization: Bearer eyJhb...' \
--header 'Content-Type: application/json' \
--data '{}'