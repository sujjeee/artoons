# [Artoons](https://artoons.vercel.app/) - Cartoon Style AI Images !

<kbd>
<a href="https://artoons.vercel.app">
  <img alt="Artoons - Cartoon Style AI Images!" src="https://artoons.vercel.app/opengraph-image.png">
</a>
</kbd>

### Artoons is an open-source website that allows users to generate and explore a diverse collection of cartoon-style illustrations.

## Features

- Generate unique cartoon-style images
- Browse a creative image collection
- Magic search with semantic capabilities
- Powered by Hugging Face for AI image generation

## Tech Stack

- **Frontend Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **API Framework:** [Hono](https://hono.dev)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **Backend Server:** [Cloudflare Workers](https://workers.cloudflare.com)
- **Frontend Deployment:** [Vercel](https://vercel.com)
- **Monorepo Tool:** [Turborepo](https://turbo.build/repo)
- **AI Model:** [Hugging Face](https://huggingface.co)

## Running Locally

1. Clone the repository

   ```bash
   git clone https://github.com/sujjeee/artoons.git
   ```

2. Install dependencies using pnpm

   ```bash
   pnpm install
   ```

3. Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp web/.env.example web/.env
   cp workers/.dev.vars.example workers/.dev.vars
   ```

4. Migrate the database schema

   ```bash
   cd workers
   pnpm db:push
   ```

5. Start the development server

   ```bash
   pnpm run dev
   ```

## How do I deploy this?

Follow the deployment guides for [Vercel](https://vercel.com/docs/monorepos/turborepo).

## Contributing

Contributions are welcome! Please open an issue if you have any questions or suggestions. Your contributions will be acknowledged.
