import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createPosts() {
  const posts = [
    {
      slug: "fra-festhuset-2022",
      title: "Fra Festhuset 2022",
      markdown: `
  # Fra Festhuset 2022
  
  Spørg bare Festhusets forpagter Anne Mortensen om jeres ønsker ang. fremtidig arrangementer, fester osv. - eller udfylde forespørgselsformularen her på websiten.
  **Anne laver også den lækreste ”Take Away” mad og har mange tilbud for alle Slots Bjergby borgere - og alle andre selvfølgelig! Derfor, hold øje med Annes hjemmeside – og endelig lad dig friste over evne!** Linket er: [slotsbjergbyfesthus.dk](https://slotsbjergbyfesthus.dk)
  ![Anne med smørbrød](https://www.slotsbjergbyfesthus.dk/annemedkolde.jpg "Anne med smørbrød")
  Du kan også se de nyeste tilbud også på Facebook med alle mulige retter fra stege til småkager
og lad dig inspirerer [www.facebook.com/Slots-Bjergby-Festhus](facebook.com/Slots-Bjergby-Festhus)
Bestil hos Anne tlf. 2014 4080 - email: <kontakt@slotsbjergbyfesthus.dk>
*Bon appetit!*
  `.trim(),
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
}

async function seed() {
  const email = "john@example.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("secret", 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await createPosts();

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
