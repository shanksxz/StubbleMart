import { PrismaClient, CollaborationType, Role } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@kisaantech.com' },
    update: {},
    create: {
      email: 'admin@kisaantech.com',
      name: 'Amit Sharma',
      password: await bcrypt.hash('adminpassword', 10),
      role: Role.ADMIN,
      address: 'Sector 17, Chandigarh, 160017',
      phoneNumber: '+911234567890',
    },
  })

  // Create Regular User
  const regularUser = await prisma.user.upsert({
    where: { email: 'farmer@example.com' },
    update: {},
    create: {
      email: 'farmer@example.com',
      name: 'Rajesh Singh',
      password: await bcrypt.hash('farmerpassword', 10),
      role: Role.FARMER,
      address: 'Village Rattangarh, Ambala, Haryana, 134003',
      phoneNumber: '+919876543210',
    },
  })

  // Create Accounts
  await prisma.account.create({
    data: {
      userId: adminUser.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: adminUser.id,
    },
  })

  await prisma.account.create({
    data: {
      userId: regularUser.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: regularUser.id,
    },
  })

  // Seed Products
  const stubbleProducts = await Promise.all(
    [
      {
        imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
        title: "Dew Stubble",
        description: "Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum",
        priceRange: "1500-2000",
        createdBy: adminUser.id,
      },
      {
        imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
        title: "Wheat Stubble",
        description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        priceRange: "1500-2000",
        createdBy: adminUser.id,
      },
      {
        imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
        title: "Rice Stubble",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        priceRange: "1200-1800",
        createdBy: adminUser.id,
      },
      {
        imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
        title: "Corn Stubble",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        priceRange: "1200-1800",
        createdBy: adminUser.id,
      }
    ].map(product =>
      prisma.product.create({
        data: product,
      })
    )
  )

  // Create Collaboration Partner Users
  const partnerUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john@ecostubble.com',
        name: 'John Doe',
        password: await bcrypt.hash('password123', 10),
        role: Role.COLLABORATOR,
        address: '123 Green St, Farmville, AG 12345',
        phoneNumber: '+1234567890',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane@agriwaste.com',
        name: 'Jane Smith',
        password: await bcrypt.hash('password123', 10),
        role: Role.COLLABORATOR,
        address: '456 Farm Rd, Croptown, AG 67890',
        phoneNumber: '+1987654321',
      },
    }),
    prisma.user.create({
      data: {
        email: 'robert@stubbletech.com',
        name: 'Robert Johnson',
        password: await bcrypt.hash('password123', 10),
        role: Role.COLLABORATOR,
        address: '789 Innovation Ave, Techville, AG 13579',
        phoneNumber: '+1122334455',
      },
    }),
    prisma.user.create({
      data: {
        email: 'emily@greenstubble.com',
        name: 'Emily Brown',
        password: await bcrypt.hash('password123', 10),
        role: Role.COLLABORATOR,
        address: '321 Eco Lane, Greenville, AG 24680',
        phoneNumber: '+1567890123',
      },
    }),
    prisma.user.create({
      data: {
        email: 'michael@stubbleenergy.com',
        name: 'Michael Lee',
        password: await bcrypt.hash('password123', 10),
        role: Role.COLLABORATOR,
        address: '654 Power St, Energytown, AG 97531',
        phoneNumber: '+1345678901',
      },
    }),
    prisma.user.create({
      data: {
        email: 'sarah@deletedcompany.com',
        name: 'Sarah Johnson',
        password: await bcrypt.hash('password123', 10),
        role: Role.COLLABORATOR,
        address: '789 Deleted St, Recycletown, AG 24680',
        phoneNumber: '+1987654321',
      },
    }),
    prisma.user.create({
      data: {
        email: 'david@removedstubble.com',
        name: 'David Brown',
        password: await bcrypt.hash('password123', 10),
        role: Role.COLLABORATOR,
        address: '456 Removed Ave, Binville, AG 13579',
        phoneNumber: '+1123456789',
      },
    }),
  ])

  // Seed Collaboration Partners
  const collaborators = [
    {
      collaborationType: CollaborationType.STUBBLE_PURCHASING_COMPANY,
      name: 'John Doe',
      companyName: 'EcoStubble Solutions',
      email: 'john@ecostubble.com',
      phoneNumber: '+1234567890',
      companyAddress: '123 Green St, Farmville, AG 12345',
      companyDescription: 'EcoStubble Solutions is committed to sustainable agriculture practices by efficiently managing crop residues.',
      query: 'Interested in partnering with local farmers for stubble collection',
      userId: partnerUsers[0].id,
      isApproved: true,
      isActive: true,
      isDeleted: false,
      crops: {
        create: [
          { cropName: 'Wheat', priceRange: '80-120' },
          { cropName: 'Rice', priceRange: '90-130' },
          { cropName: 'Corn', priceRange: '70-100' },
        ],
      },
    },
    {
      collaborationType: CollaborationType.STUBBLE_PURCHASING_COMPANY,
      name: 'Jane Smith',
      companyName: 'AgriWaste Recyclers',
      email: 'jane@agriwaste.com',
      phoneNumber: '+1987654321',
      companyAddress: '456 Farm Rd, Croptown, AG 67890',
      companyDescription: 'AgriWaste Recyclers specializes in converting agricultural waste into valuable products.',
      query: 'Looking to expand our stubble collection network',
      userId: partnerUsers[1].id,
      isApproved: true,
      isActive: true,
      isDeleted: false,
      crops: {
        create: [
          { cropName: 'Wheat', priceRange: '85-125' },
          { cropName: 'Barley', priceRange: '75-110' },
          { cropName: 'Soybean', priceRange: '95-140' },
        ],
      },
    },
    {
      collaborationType: CollaborationType.STUBBLE_PURCHASING_COMPANY,
      name: 'Robert Johnson',
      companyName: 'StubbleTech Innovations',
      email: 'robert@stubbletech.com',
      phoneNumber: '+1122334455',
      companyAddress: '789 Innovation Ave, Techville, AG 13579',
      companyDescription: 'StubbleTech Innovations develops cutting-edge technologies for stubble management and utilization.',
      query: 'Seeking partnerships for testing new stubble processing methods',
      userId: partnerUsers[2].id,
      isApproved: false,
      isActive: false,
      isDeleted: false,
      crops: {
        create: [
          { cropName: 'Rice', priceRange: '95-135' },
          { cropName: 'Corn', priceRange: '75-105' },
          { cropName: 'Sugarcane', priceRange: '60-90' },
        ],
      },
    },
    {
      collaborationType: CollaborationType.STUBBLE_PURCHASING_COMPANY,
      name: 'Emily Brown',
      companyName: 'GreenStubble Co.',
      email: 'emily@greenstubble.com',
      phoneNumber: '+1567890123',
      companyAddress: '321 Eco Lane, Greenville, AG 24680',
      companyDescription: 'GreenStubble Co. focuses on environmentally friendly stubble management solutions.',
      query: 'Interested in collaborating with eco-conscious farmers',
      userId: partnerUsers[3].id,
      isApproved: true,
      isActive: false,
      isDeleted: false,
      crops: {
        create: [
          { cropName: 'Wheat', priceRange: '82-122' },
          { cropName: 'Oats', priceRange: '70-100' },
          { cropName: 'Rye', priceRange: '75-110' },
        ],
      },
    },
    {
      collaborationType: CollaborationType.STUBBLE_PURCHASING_COMPANY,
      name: 'Michael Lee',
      companyName: 'Stubble-to-Energy Ltd.',
      email: 'michael@stubbleenergy.com',
      phoneNumber: '+1345678901',
      companyAddress: '654 Power St, Energytown, AG 97531',
      companyDescription: 'Stubble-to-Energy Ltd. specializes in converting agricultural stubble into renewable energy sources.',
      query: 'Looking for large-scale stubble suppliers for our energy production facilities',
      userId: partnerUsers[4].id,
      isApproved: false,
      isActive: false,
      isDeleted: false,
      crops: {
        create: [
          { cropName: 'Wheat', priceRange: '88-128' },
          { cropName: 'Rice', priceRange: '92-132' },
          { cropName: 'Corn', priceRange: '78-108' },
          { cropName: 'Sorghum', priceRange: '65-95' },
        ],
      },
    },
    {
      collaborationType: CollaborationType.STUBBLE_PURCHASING_COMPANY,
      name: 'Sarah Johnson',
      companyName: 'Deleted Stubble Co.',
      email: 'sarah@deletedcompany.com',
      phoneNumber: '+1987654321',
      companyAddress: '789 Deleted St, Recycletown, AG 24680',
      companyDescription: 'Deleted Stubble Co. was a company focused on innovative stubble management solutions.',
      query: 'Looking for partnerships in stubble recycling',
      userId: partnerUsers[5].id,
      isApproved: true,
      isActive: false,
      isDeleted: true,
      deletedAt: new Date(),
      crops: {
        create: [
          { cropName: 'Wheat', priceRange: '80-120' },
          { cropName: 'Rice', priceRange: '90-130' },
        ],
      },
    },
    {
      collaborationType: CollaborationType.STUBBLE_PURCHASING_COMPANY,
      name: 'David Brown',
      companyName: 'Removed Stubble Solutions',
      email: 'david@removedstubble.com',
      phoneNumber: '+1123456789',
      companyAddress: '456 Removed Ave, Binville, AG 13579',
      companyDescription: 'Removed Stubble Solutions specialized in efficient stubble collection and processing.',
      query: 'Seeking collaborations for stubble management',
      userId: partnerUsers[6].id,
      isApproved: false,
      isActive: false,
      isDeleted: true,
      deletedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      crops: {
        create: [
          { cropName: 'Corn', priceRange: '75-110' },
          { cropName: 'Soybean', priceRange: '85-125' },
        ],
      },
    },
  ]

  for (const collaborator of collaborators) {
    await prisma.collaborationPartner.create({
      data: collaborator,
    })
  }

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
            productId: stubbleProducts[0]!.id,
            quantity: 1,
          },
          {
            productId: stubbleProducts[1]!.id,
            quantity: 2,
          },
        ],
      },
    },
    include: {
      orderItems: true,
    },
  })

  console.log('Seed data inserted successfully.')
  console.log({
    adminUser,
    regularUser,
    partnerUsers,
    stubbleProducts,
    collaborators,
    order1
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })