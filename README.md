# botleeng-discord

## Development

1. Clone the repo
2. Install dependencies
```
$ npm install
```
3. Make a copy of `config/local.template.js` into `config/local.js` and fill up the vars
```
$ cp config/local.template.js config/local.js
```
4. Run server
```
$ npm run dev
```

## Deployment

Build the Docker file
```
$ docker build -t botleeng .
```

Run the Docker file
```
$ docker run -d -e DISCORD_TOKEN=<token> -e ANNC_CHANNEL_ID=<channel-id> botleeng:latest
```

| Environment vars        | Description                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `DISCORD_TOKEN`         | Fetch token from a [Discord application](https://discordapp.com/developers/applications) |
| `ANNC_CHANNEL_ID`       | Copy Channel ID from Discord for the Announcement channel (enable [Developer Mode](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)) |
