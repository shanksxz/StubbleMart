import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

async function main() {
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
  const stubbleProducts = [
    {
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
      title: "Dew Stubble",
      description: "Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum",
      price: 28.95
    },
    {
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
      title: "Wheat Stubble",
      description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      price: 32.50
    },
    {
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
      title: "Rice Stubble",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      price: 25.75
    },
    {
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
      title: "Corn Stubble",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      price: 30.20
    },
    {
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
      title: "Rice Stubble",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      price: 25.75
    },
    {
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
      title: "Corn Stubble",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      price: 30.20
    }
  ];

  const createdProducts = await Promise.all(
    stubbleProducts.map(product =>
      prisma.product.create({
        data: {
          imgUrl: product.imgUrl,
          title: product.title,
          description: product.description,
          price: product.price,
        },
      })
    )
  );

  // Seed Collaboration Partners
  const stubblePurchasingCompany = await prisma.collaborationPartner.create({
    data: {
      collaborationType: 'STUBBLE_PURCHASING_COMPANY',
      username: 'ecobiomass',
      companyName: 'EcoBiomass Solutions',
      email: 'contact@ecobiomass.in',
      phoneNumber: '+911234567890',
      companyAddress: 'Industrial Area, Phase I, Chandigarh, 160002',
      companyDescription: 'We purchase agricultural stubble for sustainable energy production, helping farmers in Haryana and Punjab manage crop residue.',
      crops: {
        create: [
          { cropName: 'Wheat Stubble', priceRangeFrom: 1500.00, priceRangeTo: 2000.00 },
          { cropName: 'Paddy Stubble', priceRangeFrom: 1200.00, priceRangeTo: 1800.00 },
        ],
      },
    },
  });

  const machineRentalCompany = await prisma.collaborationPartner.create({
    data: {
      collaborationType: 'MACHINE_RENTAL',
      username: 'kisaanmachines',
      companyName: 'Kisaan Machinery Rentals',
      email: 'info@kisaanmachines.in',
      phoneNumber: '+919876543210',
      companyAddress: 'Grain Market, Khanna, Punjab, 141401',
      companyDescription: 'We offer a wide range of agricultural machinery for rent to farmers in Punjab and Haryana.',
    },
  });


  const transportationCompany = await prisma.collaborationPartner.create({
    data: {
      collaborationType: 'TRANSPORTATION_COMPANY',
      username: 'fastfarmtransport',
      companyName: 'FastFarm Logistics',
      email: 'operations@fastfarmlogistics.in',
      phoneNumber: '+917890123456',
      companyAddress: 'Transport Nagar, Ludhiana, Punjab, 141008',
      companyDescription: 'Specializing in efficient transportation of agricultural products and machinery across North India.',
    },
  });

  const agricultureShop = await prisma.collaborationPartner.create({
    data: {
      collaborationType: 'AGRICULTURE_SHOPS',
      username: 'greenharveststore',
      companyName: 'Green Harvest Agro Store',
      email: 'shop@greenharvestagro.in',
      phoneNumber: '+918901234567',
      companyAddress: 'Main Bazar, Karnal, Haryana, 132001',
      companyDescription: 'One-stop shop for all agricultural needs - seeds, fertilizers, pesticides, and farming tools.',
    },
  });

  // Seed Orders
  const order1 = await prisma.order.create({
    data: {
      userEmail: 'farmer@example.com',
      productId: "1",
      state: 'Haryana',
      city: 'Ambala',
      landSize: '5 acres',
      serviceType: ['SOIL_TESTING', 'CROP_ADVISORY'],
    },
  });

  console.log({
    adminUser,
    regularUser,
    adminCredentialsAccount,
    userCredentialsAccount,
    createdProducts,
    stubblePurchasingCompany,
    machineRentalCompany,
    transportationCompany,
    agricultureShop,
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