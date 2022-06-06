import { Category, PrismaClient, Product } from "@prisma/client";
import bcrypt from "bcryptjs";
import { omit } from "lodash";

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

async function createProducts() {
  const createCategory = async ({
    slug,
    title,
  }: {
    slug: string;
    title: string;
  }) =>
    await prisma.category.upsert({
      where: { slug },
      update: {
        slug,
        title,
      },
      create: {
        slug,
        title,
      },
    });

  const takeAway = await createCategory({
    slug: "take-away",
    title: "Take away",
  });

  const entree = await createCategory({
    slug: "forret",
    title: "Forret",
  });

  const mainCourse = await createCategory({
    slug: "hovedretter",
    title: "Forret",
  });

  const desserts = await createCategory({
    slug: "desserter",
    title: "Desserter",
  });

  type productType = {
    slug: string;
    title: string;
    priceInDKK: number;
    description: string;
    categories: Category[];
    imageSrc?: string;
  };
  const products: productType[] = [
    {
      slug: "rejecocktail",
      title: "Rejecocktail",
      priceInDKK: 39,
      description:
        "med rejer, asparges, citron, kaviar samt rød dressing inkl. Brød og smør",
      categories: [takeAway, entree],
    },
    {
      slug: "tunmouse",
      title: "Tunmouse",
      priceInDKK: 39,
      description:
        "med rejer, asparges, citron samt dild dressing inkl. Brød og smør",
      imageSrc: "/images/foret-tun-mouse.jpg",
      categories: [takeAway, entree],
    },
    {
      slug: "indbagt-laks",
      title: "Indbagt laks",
      priceInDKK: 35,
      description: "med flødestuvet spinat",
      categories: [takeAway, entree],
    },
    {
      slug: "hønsesalat",
      title: "Hønsesalat anrettet på ananasring",
      description: "anrettet på sprød salat bund med bacon inkl. Brød og smør",
      priceInDKK: 39,
      categories: [takeAway, entree],
    },
    {
      slug: "tarteletter",
      title: "Tarteletter",
      description: "med høns i asparges - 3 stk. pr. person.",
      priceInDKK: 35,
      categories: [takeAway, entree],
    },
    {
      slug: "lakseroulade",
      title: "Lakseroulade",
      description:
        "med flødeostecreme, pyntet med rejer dild dressing inkl. Brød og smør",
      priceInDKK: 39,
      categories: [takeAway, entree],
    },
    {
      slug: "lakserose",
      title: "Lakserose",
      description: "på sprød salat bund, med dressing inkl. Brød og smør",
      priceInDKK: 39,
      categories: [takeAway, entree],
    },
    {
      slug: "kalvesteg-med-vildtsauce",
      title: "Kalvesteg stegt som vildt",
      description:
        "Kalvesteg, waldorfsalat, hvide kartofler, tyttebær, agurkesalat, friske grøntsager samt vildtsauce",
      priceInDKK: 115,
      categories: [takeAway, mainCourse],
    },
    {
      slug: "rosa-kalvefilet",
      title: "Rosa stegt kalvefilet.",
      description:
        "Kalvefilet, sauterede grøntsager, smørristede kartofler samt sauce efter eget valg",
      priceInDKK: 115,
      categories: [takeAway, mainCourse],
    },
    {
      slug: "helstegt oksestriploin",
      title: "Helstegt oksestriploin.",
      description:
        "oksestriploin, sauterede grøntsager, broccolitimbale, smørristede kartofler samt sauce efter eget valg",
      priceInDKK: 125,
      categories: [takeAway, mainCourse],
    },
    {
      slug: "gammeldags-oksesteg",
      title: "Gammeldags oksesteg",
      description:
        "Gammeldags oksesteg, glaserede perleløg, kogte gulerødder, tomater med peberrodssalat, hvide kartofler samt kraftig oksestegssauce",
      priceInDKK: 125,
      categories: [takeAway, mainCourse],
    },
    {
      slug: "helstegt-svinekam",
      title: "Helstegt svinekam.",
      description:
        "Helstegt svinekam m. hvide, brune, rødkål og franske kartofler, samt sauce.",
      priceInDKK: 99,
      categories: [takeAway, mainCourse],
    },
    {
      slug: "svinekam-stegt-som-vildt",
      title: "Svinekam stegt som vildt.",
      description:
        "Svinekam stegt som vildt m. tyttebær, waldorfsalat, hvide og brune kartofler samt vildtsauce.",
      priceInDKK: 99,
      categories: [takeAway, mainCourse],
    },
    {
      slug: "Frugttærte",
      title: "Frugttærte",
      description: "med flødeskum og creme fraiche",
      priceInDKK: 39,
      categories: [takeAway, desserts],
    },
    {
      slug: "hjemmelavet-is",
      title: "Hjemmelavet is",
      description: "med frisk frugt og jordbærskum",
      priceInDKK: 39,
      categories: [takeAway, desserts],
    },
    {
      slug: "pandekager-med-vanilje-is",
      title: "Pandekager med vanilje is",
      description: "Lækker pandekage med vanilje is og syltetøj. Mums mums.",
      priceInDKK: 39,
      categories: [takeAway, desserts],
    },
    {
      slug: "fragilite-roulade",
      title: "Fragilitéroulade",
      description: "med is, pyntet med frugt og chokolade.",
      priceInDKK: 42,
      categories: [takeAway, desserts],
    },
    {
      slug: "noede-kurv",
      title: "Nøddekurv",
      description: "med chokolade, is og frugt",
      priceInDKK: 45,
      categories: [takeAway, desserts],
    },
    {
      slug: "citron-fromage",
      title: "Citron fromage",
      description: "Citron fromage, med flødeskum.",
      priceInDKK: 39,
      categories: [takeAway, desserts],
    },
    {
      slug: "appelsin-fromage",
      title: "Appelsin fromage",
      description: "Appelsinfromage, med hvidchokolade flødeskum.",
      priceInDKK: 39,
      categories: [takeAway, desserts],
    },
    {
      slug: "brownie",
      title: "Brownie",
      description: "Hjemmelavet brownie med vaniljeis og frugt.",
      priceInDKK: 39,
      categories: [takeAway, desserts],
    },
  ];

  for (const product of products) {
    const forCreate = {
      slug: product.slug,
      title: product.title,
      priceInDKK: product.priceInDKK,
      description: product.description,
      categories: {
        create: product.categories.map((cat) => ({
          category: {
            connect: {
              slug: cat.slug,
            },
          },
        })),
      },
      imageSrc: product.imageSrc,
    };

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: forCreate,
      create: forCreate,
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

  await createProducts();

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
