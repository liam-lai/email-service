# email-service
Email api service that integrated with Mailgun and Sendgrid.
* Sending group mails with main receivers, ccs and bccs.
* Plain Text available only

## API

### Send Email

* POST /v1/send
```json
{
    "recipients": ["liam.icheng.lai@gmail.com"],
	  "ccs": [],
    "bccs":[],
    "subject": "this is subject and maximum length based on config",
    "text": "this is text and maximum length based on config"
}
```

### Service Status

* GET /v1/status
Including service status and vender status with last sending record