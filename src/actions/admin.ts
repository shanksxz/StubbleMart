"use server";

import { db } from "@/server/db/db";
import { CollaborationType } from "@prisma/client";

export async function getCollaboratorsCountByCategory() {
  try {
    const collaborators = await db.collaborationPartner.findMany({
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
    const ordersWithUserDetails = await db.order.findMany({
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
    const users = await db.order.findMany({
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
    const collaborators = await db.collaborationPartner.findMany({
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
