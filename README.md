# Redeem

A dead simple web application to redeem the code for the prize. Built with Deno
Fresh.

## How it works

It is very easy to work with, and does not require any fancy add-ons.

1. The user submits data using a form.
2. The Telegram Bot will send the data to the group as a notification for me.
3. Finally, I will manually send a balance to the provided number, given that
   the code provided is correct.

### How to get the code

In my case, the user only needs to send a unique code. I will patent it
spontaneously and store it somewhere for later manual checking. I hope to have
my automated storage and checking service in the future.

## Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

## License

MIT
