import { Handlers } from "$fresh/server.ts";

export const handler: Handlers<{ code: string }> = {
  async POST(req) {
    const form = await req.formData();
    const redeemCode = form.get("code")?.toString();
    const phoneNumber = form.get("phone")?.toString();
    const provider = form.get("provider")?.toString();

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/ok");
    return new Response(null, {
      status: 303,
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
          <input name="phone" id="phone" type="tel" />
        </div>
        <div class="form-item" role="group">
          <label for="provider">e-wallet Provider</label>
          <input name="provider" id="provider" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
