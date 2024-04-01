import { Handlers } from "$fresh/server.ts";
import { sendToTelegramBot } from "../services/telegram.ts";

export const handler: Handlers = {
  async POST(req) {
    const headers = new Headers();
    const form = await req.formData();
    const redeemCode = form.get("code")?.toString() ?? "";
    const phoneNumber = form.get("phone")?.toString() ?? "";
    const provider = form.get("provider")?.toString() ?? "";

    const { status } = await sendToTelegramBot({
      redeemCode,
      phoneNumber,
      provider,
    });

    if (status === 201) {
      // Redirect user to thank you page.
      headers.set("location", "/ok");
      return new Response(null, {
        status: 303,
        headers,
      });
    }

    headers.set("location", "/404");
    return new Response(null, {
      status: 404,
      headers,
    });
  },
};

export default function Home() {
  return (
    <>
      <h1>Redeem your code to get prizes!</h1>
      <p>
        We use your phone number to deliver the prize in the form of an e-wallet
        balance, and we will go nuclear after that.
      </p>
      <a href="https://github.com/kalwabed/redeem" title="to Github repo">
        <small>The code is also open-source.</small>
      </a>
      <form method="post">
        <div class="form-item" role="group">
          <label for="code">Code</label>
          <input name="code" id="code" />
        </div>
        <div class="form-item" role="group">
          <label for="phone">Phone</label>
          <input
            name="phone"
            id="phone"
            placeholder="e.g 08123456781"
            type="tel"
          />
        </div>
        <div class="form-item" role="group">
          <label for="provider">e-wallet Provider</label>
          <input name="provider" placeholder="e.g gopay" id="provider" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
