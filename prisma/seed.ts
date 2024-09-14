const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Create Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@kisaantech.com' },
    update: {},
    create: {
      email: 'admin@kisaantech.com',
      name: 'Amit Sharma',
      password: await bcrypt.hash('adminpassword', 10),
      role: 'ADMIN',
      address: 'Sector 17, Chandigarh, 160017',
      phoneNumber: '+911234567890',
    },
  });

  // Create Regular User
  const regularUser = await prisma.user.upsert({
    where: { email: 'farmer@example.com' },
    update: {},
    create: {
      email: 'farmer@example.com',
      name: 'Rajesh Singh',
      password: await bcrypt.hash('farmerpassword', 10),
      role: 'USER',
      address: 'Village Rattangarh, Ambala, Haryana, 134003',
      phoneNumber: '+919876543210',
    },
  });

  // Create Accounts
  const adminCredentialsAccount = await prisma.account.create({
    data: {
      userId: adminUser.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: adminUser.id,
    },
  });

  const userCredentialsAccount = await prisma.account.create({
    data: {
      userId: regularUser.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: regularUser.id,
    },
  });

  // Seed Products
  const stubbleProducts = await Promise.all(
    [
      {
        imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
        title: "Dew Stubble",
        description: "Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum",
        priceRange: "1500-2000",
      },
      {
        imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
        title: "Wheat Stubble",
        description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        priceRange: "1500-2000",
      },
      {
        imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
        title: "Rice Stubble",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        priceRange: "1200-1800",
      },
      {
        imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
        title: "Corn Stubble",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        priceRange: "1200-1800",
      }
    ].map(product =>
      prisma.product.create({
        data: product,
      })
    )
  );

  // Create User for Collaboration Partner
  const partnerUser = await prisma.user.create({
    data: {
      email: 'partner@ecobiomass.in',
      name: 'EcoBiomass Partner',
      password: await bcrypt.hash('partnerpassword', 10),
      role: 'USER',
      address: 'Industrial Area, Phase I, Chandigarh, 160002',
      phoneNumber: '+911234567890',
    },
  });

  // Seed Collaboration Partner
  const stubblePurchasingCompany = await prisma.collaborationPartner.create({
    data: {
      collaborationType: 'STUBBLE_PURCHASING_COMPANY',
      username: 'ecobiomass',
      companyName: 'EcoBiomass Solutions',
      email: 'contact@ecobiomass.in',
      phoneNumber: '+911234567890',
      companyAddress: 'Industrial Area, Phase I, Chandigarh, 160002',
      companyDescription: 'We purchase agricultural stubble for sustainable energy production, helping farmers in Haryana and Punjab manage crop residue.',
      userId: partnerUser.id,
      isApproved: true,
      crops: {
        create: [
          { cropName: 'Wheat Stubble', priceRange: '1500-2000' },
          { cropName: 'Paddy Stubble', priceRange: '1200-1800' },
        ],
      },
    },
  });

  // Seed Order with OrderItems
  const order1 = await prisma.order.create({
    data: {
      userId: regularUser.id,
      state: 'Haryana',
      city: 'Ambala',
      landSize: '5 acres',
      serviceType: ['SOIL_TESTING', 'CROP_ADVISORY'],
      orderItems: {
        create: [
          {
            productId: stubbleProducts[0].id,
            quantity: 1,
          },
          {
            productId: stubbleProducts[1].id,
            quantity: 2,
          },
        ],
      },
    },
    include: {
      orderItems: true,
    },
  });

  console.log({
    adminUser,
    regularUser,
    partnerUser,
    adminCredentialsAccount,
    userCredentialsAccount,
    stubbleProducts,
    stubblePurchasingCompany,
    order1
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
