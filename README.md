# ☁️ cloudlet

A personal cloud

## Goals

- Excellent experience
  - Comparable features to what Big Tech™ offers
  - As easy to use as out-of-the-box SaaS products
- Private
  - All your data belongs to you and lives on your machine
  - Make security easy
- Reliable
  - Data backups, great uptime, etc.

## Getting Started

### Set up

- Install dependencies with `yarn`
- Configure your database URL by copying `/prisma/.env.example` and populating it with the correct details
- Run `yarn setup` to set up your environment
- Create a new `/.env` file with the contents of `/.env.example`. Add a secret key for generating JWTs

### Running the project

- Run the server with `yarn start:server`
- Run the ui with `yarn start:client`

The app will be available at `localhost:4000`; a graphql playground will be available at `localhost:4000/graphql`.
