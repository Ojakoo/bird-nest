# Birds Nest

This is a [Next.js](https://nextjs.org/) project using TypeScript bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## App description

Application client shows information of drone pilots violating a no fly zone around a birdnest. This data is continously refreshed from the server while the application is active, this is done using [`SWR`](https://swr.vercel.app/).

Server uses [Next.js custom server](https://nextjs.org/docs/advanced-features/custom-server) with [Express](https://expressjs.com/) to handle data fetching from API.

## Dependencies

For dependencies install node with [nvm](https://github.com/nvm-sh/nvm). After this install dependencies with command:

```bash
npm install
```

## Development

To run the development server:

```bash
npm run dev
```

This project uses [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) for HMR so changes made to source files are automatically updated to the running dev instance.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

An active instance of the project is running [here](https://birdnest.ojakoo.fi/).

Deployment is done with [railway](https://railway.app/) and running these commands:

```bash
npm run build
npm run start
```
