# email-service
Mailgun and Sendgrid integrated service

# mailgun status page and api
* https://status.mailgun.com/
* https://status.mailgun.com/api/v2/status.json

# sendgrid status page
* https://status.sendgrid.com/api/v2/status.json

```
curl -s --user 'api:d87ba332bcbeabaea56f6fc1e07237c8-7bce17e5-03e8fa00' \
    https://api.mailgun.net/v3/sandboxe7fb8aecdc6547d88fa7ddbfd86d286f.mailgun.org/messages \
    -F from='Excited User <mailgun@sandboxe7fb8aecdc6547d88fa7ddbfd86d286f.mailgun.org>' \
    -F to=liam.icheng.lai@gmail.com \
    -F to=liam.icheng.lai@gmail.com \
    -F subject='Hello' \
    -F text='Testing some Mailgun awesomeness! Liam is Here'
```
```
curl -s --user 'api:d87ba332bcbeabaea56f6fc1e07237c8-7bce17e5-03e8fa00' \
    https://api.mailgun.net/v3/sandboxe7fb8aecdc6547d88fa7ddbfd86d286f.mailgun.org/messages \
    -F from='Excited User <mailgun@sandboxe7fb8aecdc6547d88fa7ddbfd86d286f.mailgun.org>' \
    -F cc=liam.icheng.lai@gmail.com \
    -F subject='Hello' \
    -F text='Testing some Mailgun awesomeness! Liam is Here'
```
```
curl -s --user 'api:d87ba332bcbeabaea56f6fc1e07237c8-7bce17e5-03e8fa00' \
    https://api.mailgun.net/v3/sandboxe7fb8aecdc6547d88fa7ddbfd86d286f.mailgun.org/messages \
    -F from='Excited User <mailgun@sandboxe7fb8aecdc6547d88fa7ddbfd86d286f.mailgun.org>' \
    -F bcc=liam.icheng.lai@gmail.com \
    -F subject='Hello' \
    -F text='Testing some Mailgun awesomeness! Liam is Here'

```