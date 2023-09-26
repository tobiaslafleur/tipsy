import { ChannelType, Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

async function main() {
  await client.login(String(process.env.DISCORD_TOKEN));

  const channel = await client.channels.fetch('1156046795684712479', {
    cache: true,
  });

  if (channel?.type === ChannelType.GuildText) {
    channel?.send({
      content:
        'Team Blue has completed "Picture with stitches" and has awarded their 5 sips to team Red <@147702951840972800> <@147702951840972800>',
    });

    channel?.send(
      'https://cdn.discordapp.com/avatars/147702951840972800/5a8a0fed65a899e7b114e729adb3cff3'
    );
  }
}

main();
