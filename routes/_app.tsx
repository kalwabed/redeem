import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Personal prize redemption system using Telegram Bot"
        />
        <title>Redeem code for prize from Kalwabed</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/neat.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
