import { validateEscapedText } from "../utils/regex.ts";

export async function sendToTelegramBot(
  data: { redeemCode: string; provider: string; phoneNumber: string },
) {
  const { provider, redeemCode, phoneNumber } = data;
  const botToken = Deno.env.get("BOT_TOKEN");
  const botGroupId = Deno.env.get("BOT_GROUP_ID");

  // reference https://core.telegram.org/bots/api#sendmessage
  const text = `
*Someone is in need of their prizes*
Code: ||${validateEscapedText(redeemCode)}||
Provider: ||${validateEscapedText(provider)}||
Phone number: ||${validateEscapedText(phoneNumber)}||
              `;

  if (botGroupId && botToken) {
    try {
      await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${botGroupId}&text=${
          encodeURIComponent(
            text,
          )
        }&parse_mode=MarkdownV2`,
        {
          method: "POST",
        },
      );

      return {
        msg: "ok",
        status: 201,
      };
    } catch (error) {
      return {
        status: 404,
        msg: error.toString(),
      };
    }
  }
  return {
    msg: "ok",
    status: 201,
  };
}
