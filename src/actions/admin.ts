"use server";

import prisma from "@/server/db/db";
import { CollaborationType } from "@prisma/client";

export async function getCollaboratorsCountByCategory() {
  try {
    const collaborators = await prisma.collaborationPartner.findMany({
      select: {
        collaborationType: true,
      },
    });

    //? how do i even think of this
    const counts = collaborators.reduce(
      (acc, curr) => {
        acc[curr.collaborationType] = (acc[curr.collaborationType] || 0) + 1;
        return acc;
      },
      {} as Record<CollaborationType, number>,
    );

    return {
      success: true,
      message: "Collaborators count retrieved successfully",
      counts,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while retrieving the collaborators.",
    };
  }
}

export async function getUsersWhoOrdered() {
  try {
    const ordersWithUserDetails = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            address: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                imgUrl: true,
                title: true,
                description: true,
                priceRange: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      message: "Orders with user details retrieved successfully",
      orders: ordersWithUserDetails,
    };
  } catch (error) {
    console.error("Error fetching orders with user details:", error);
    return {
      success: false,
      message:
        "An error occurred while retrieving the orders with user details.",
    };
  }
}

export async function getUserCountWhoOrdered() {
  try {
    const users = await prisma
    .order.findMany({
      select: {
        id: true,
      },
    });

    const counts = users.reduce(
      (acc, curr) => {
        acc[curr.id] = (acc[curr.id] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      success: true,
      message: "Users count retrieved successfully",
      counts,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while retrieving the users.",
    };
  }
}

// multi-level queue for recommendating collaborators ( by default, give priority to the ones with the highest number of orders )
export async function getCollaboratorsByOrderCount() {
  try {
    const collaborators = await prisma.collaborationPartner.findMany({
      select: {
        id: true,
        collaborationType: true,
      },
    });

    const counts = collaborators.reduce(
      (acc, curr) => {
        acc[curr.id] = (acc[curr.id] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const sortedCollaborators = collaborators.sort(
      (a, b) => counts[b.id]! - counts[a.id]!,
    );

    return {
      success: true,
      message: "Collaborators retrieved successfully",
      collaborators: sortedCollaborators,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while retrieving the collaborators.",
    };
  }
}




type CollaboratorWithScore = {
  id: string;
  companyName: string;
  priceCompetitiveness: number;
  email: string;
  isApproved: boolean;
  isActive: boolean;
  crops: { id: string; cropName: string; priceRange: string }[];
};

export async function getRecommendedStubblePurchasingCompanies(): Promise<{
  success: boolean;
  message: string;
  companies?: CollaboratorWithScore[];
}> {
  try {
    const companies = await prisma.collaborationPartner.findMany({
      where: {
        collaborationType: CollaborationType.STUBBLE_PURCHASING_COMPANY,
        // isApproved: false,
        isActive: true,
      },
      select: {
        id: true,
        companyName: true,
        email: true,
        isApproved: true,
        isActive: true,
        crops: {
          select: {
            id: true,
            cropName: true,
            priceRange: true,
          },
        },
      },
    });

    const scoredCompanies: CollaboratorWithScore[] = companies.map(company => {
      const avgPriceRange = company.crops.reduce((sum, crop) => {
        const [min, max] = crop.priceRange.split('-').map(Number);
        return sum + (min! + max!) / 2;
      }, 0) / company.crops.length;
      const priceCompetitiveness = 1 / avgPriceRange;

      return {
        ...company,
        priceCompetitiveness,
      };
    });

    const sortedCompanies = scoredCompanies.sort((a, b) => 
      a.priceCompetitiveness - b.priceCompetitiveness
    );

    console.log("sorted one's", sortedCompanies);

    const highPriorityQueue = sortedCompanies.slice(0, Math.ceil(sortedCompanies.length / 3));
    const mediumPriorityQueue = sortedCompanies.slice(Math.ceil(sortedCompanies.length / 3), Math.ceil(2 * sortedCompanies.length / 3));
    const lowPriorityQueue = sortedCompanies.slice(Math.ceil(2 * sortedCompanies.length / 3));

    const recommendedCompanies = [
      ...highPriorityQueue,
      ...mediumPriorityQueue,
      ...lowPriorityQueue,
    ];

    return {
      success: true,
      message: "Recommended stubble purchasing companies retrieved successfully",
      companies: recommendedCompanies,
    };
  } catch (error) {
    console.error("Error in getRecommendedStubblePurchasingCompanies:", error);
    return {
      success: false,
      message: "An error occurred while retrieving the recommended companies.",
    };
  }
}

