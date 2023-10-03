### Create RSA key
#### Private key
```
openssl genrsa -out private.key 1024
```
*Place this key in api src*
#### Public key
```
openssl rsa -pubout -in private.key -out public.key
```
*Place this key in .env in website*
