export async function sendToTelegramBot(
  data: { redeemCode: string; provider: string; phoneNumber: string },
) {
  const { provider, redeemCode, phoneNumber } = data;
  const botToken = Deno.env.get("BOT_TOKEN");
  const botGroupId = Deno.env.get("BOT_GROUP_ID");

  const escapedText = (text: string) => {
    // Escape special characters to avoid regex confusion

    // This line replaces characters that have special meanings in regular expressions
    // with a backslash followed by the character itself. This ensures they are treated
    // literally in the search.

    // Examples of escaped characters: "*", "[", "]", ".", "+" etc.
    return text.replace(/[\_\*\[\]\(\)\~\`\>\#\+\-\=\|\{\}\.]/g, "\\$&");
  };

  // reference https://core.telegram.org/bots/api#sendmessage
  const text = `
*Someone is in need of their prizes*
Code: ||${escapedText(redeemCode)}||
Provider: ||${escapedText(provider)}||
Phone number: ||${escapedText(phoneNumber)}||
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
