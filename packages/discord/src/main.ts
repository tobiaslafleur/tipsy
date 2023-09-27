import 'dotenv/config';
import { ChannelType, Client, GatewayIntentBits } from 'discord.js';
import { WebSocketServer } from 'ws';

async function main() {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  await client.login(String(process.env.DISCORD_TOKEN));

  const channel = await client.channels.fetch(
    String(process.env.DISCORD_CHANNEL)
  );

  const wss = new WebSocketServer({
    port: 4001,
  });

  wss.on('connection', ws => {
    ws.on('message', data => {
      const obj = JSON.parse(data.toString());

      if (channel?.type === ChannelType.GuildText) {
        const users = obj.selected_team
          .map((user: any) => `<@${user.discord_id}>`)
          .join(' ');

        channel?.send({
          content: `${obj.team_name} has completed "${obj.title}" and has awarded their ${obj.weight} sips to ${obj.selected_team_name} ${users}`,
        });

        channel?.send(
          'https://wow.zamimg.com/uploads/screenshots/normal/63719-stitches.jpg'
        );
      }
    });
  });
}

main();
