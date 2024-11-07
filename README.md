# Project Name

This is a Next.js project with Prisma and TailwindCSS integration.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm or yarn

### Cloning the Repository

Clone the repository to your local machine using the following command:

```sh
git clone git@github.com:lulumeimei/assignment_3.git
cd assignment_3
```

### Installing Dependencies

Install the project dependencies using npm or yarn:

```sh
npm install
# or
yarn install
```

### Setting Up Prisma

Initialize Prisma and apply migrations:

```sh
npx prisma migrate dev --name init
```

### Seeding the Database

Seed the database with initial data:

```sh
npm run seed
```

### Running the Development Server

Start the Next.js development server:

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, Prisma, and TailwindCSS, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
