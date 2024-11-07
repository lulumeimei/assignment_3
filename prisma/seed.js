// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
    const userPromises = Array.from({ length: 10 }).map(() => {
        return prisma.user.upsert({
            where: { email: faker.internet.email() },
            update: {},
            create: {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
                phoneNumber: faker.phone.number('###-###-####'),
            },
        });
    });

    await Promise.all(userPromises);

    console.log('Database has been seeded with random users. 🌱');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
