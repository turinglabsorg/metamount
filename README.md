# 🚀 Metamount

Ever tried to fetch files from IPFS and got lost in the decentralized wilderness? Fear not! Metamount is here to save the day! 🦸‍♂️

## What's This Magic? ✨

Metamount is your friendly neighborhood IPFS file fetcher. It's like a butler for your decentralized files, but without the fancy suit (unless you count the HTTP headers as formal wear).

## Features 🎯

- 🎯 Fetch files from IPFS with a simple HTTP request
- 🔍 Automatic content-type detection (it's like having a file detective!)
- 📁 Beautiful directory listings with file/folder icons
- ⚡ Fast and furious (well, as fast as IPFS can be)
- 🛡️ CORS enabled (because sharing is caring)
- 🕒 30-second timeout (because patience is a virtue, but not an infinite one)

## Quick Start 🚀

1. Clone this repo (or download it, we're not picky)
```bash
git clone https://github.com/yourusername/metamount.git
cd metamount
```

2. Install dependencies (we use pnpm because it's faster than a caffeinated cheetah)
```bash
pnpm install
```

3. Start the server (choose your adventure):
```bash
# Development mode (with hot reload)
pnpm dev:local

# Production mode (no hot reload, but still hot)
pnpm start
```

## How to Use 🎮

Just make a GET request to `/:hash` or `/:hash/path/to/file` where:
- `:hash` is your IPFS hash
- `/path/to/file` is optional and represents the path within the IPFS directory

Examples:
```
# Simple hash
GET http://localhost:3000/QmHash123...

# Hash with subfolder path
GET http://localhost:3000/bafybeiaxqghsrgqqo677k6emb4asgnhbvxupvff5in2vvk3dixacep4nga/4aa52238-af54-404a-b8c6-d4703dccafee.png
```

Want to check if the server is alive? Hit the root endpoint:
```
GET http://localhost:3000/
```

## Environment Variables 🔑

- `IPFS_PROVIDER`: Your IPFS gateway URL (defaults to "https://ipfs.io")

## Contributing 🤝

Found a bug? Want to add a feature? Pull requests are welcome! Just make sure your code is as clean as your browser history (which we all know is spotless 😉).

## License 📄

MIT License - Feel free to use this code for whatever you want, even if it's just to impress your cat.

---

Made with ❤️ and probably too much ☕ 