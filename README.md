# email-service
Email api service that integrated with Mailgun and Sendgrid.
* Sending group mails with main receivers, ccs and bccs.
* Plain Text available only

## Requirements
- Node.js version 10.15.1: `nvm use`

## Quick Setup Environment
```
git clone https://github.com/liam-lai/email-service.git
cd email-service
nvm use
yarn
export MAILGUN_API_KEY='YOUR MAIL GUN API KEY'
export SENDGRID_API_KEY='YOUR SENDGRID Bear Token'
yarn start
```

## Quick Play with
```
curl -X POST http://35.166.20.191:8000/v1/send \
  -H 'Content-Type: application/json' \
  -d '{
    "recipients": ["your@email.address"],
    "ccs": [],
    "bccs":[],
    "subject": "test email service",
    "text": "my email draft"
}'
```

## Setup Node Library
* Node Library
```
yarn
```

* Env Variable 

```
//DEV ONLY
cat > .env <<EOF
MAILGUN_API_KEY='YOUR MAIL GUN API KEY'
SENDGRID_API_KEY='YOUR SENDGRID Bear Token'
EOF
```
or 
```
export MAILGUN_API_KEY='YOUR MAIL GUN API KEY'
export SENDGRID_API_KEY='YOUR SENDGRID Bear Token'
```


## Running the service
* Run Test
```
yarn test
```

* Run Local Dev Environment
```
yarn dev
```
or
```
yarn start
```

* Run Production Environment
```
NODE_ENV=production yarn start
```

## API

### Send Email

* POST /v1/send
```json
{
    "recipients": ["coding.test@gmail.com"],
    "ccs": ["coding.test@gmail.com"],  //optional
    "bccs": ["coding.test@gmail.com"],  //optional
    "subject": "this is subject and maximum length based on config",
    "text": "this is text and maximum length based on config"
}
```

example with curl:
```
curl -X POST \
  localhost/v1/send \
  -H 'Content-Type: application/json' \
  -d '{
    "recipients": ["liam.icheng.lai@gmail.com"],
    "ccs": [],
    "bccs":[],
    "subject": "postman",
    "text": "from post man"
}'
```


### Service Status

* GET /v1/status

Including service status and vender status with last sending record.
Status gets from periodically check provider, help to decide which provider to go.

example with curl:
```
curl -X GET localhost/v1/status
```

## Todo list

* Email validation api
* Log with proper format
* Test: End-to-End, input validation
* Optimize failover strategy, choose the faster provider based on certain threshold
* API Document: Swagger
* Dockerizeq
* CICD Deployment