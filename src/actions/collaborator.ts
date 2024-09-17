"use server";

import prisma from "@/server/db/db";
import { FormData, ZodError } from "@/validators";
import { getCurrUser } from "./user";
import { CollaborationType } from "@prisma/client";

const format = (str: string) => {
  return str.toUpperCase().split(" ").join("_") as any;
};

export default async function addCollaborators(foo: FormData) {
  try {
    const res = await getCurrUser();

    console.log("res", res);

    if (!res.success || !res.user) {
      return {
        success: false,
        message: res.message,
        statusCode: 404,
      };
    }

    const collaborater = await prisma.collaborationPartner.create({
      data: {
        name: foo.name,
        email: foo.email,
        phoneNumber: foo.phoneNumber,
        companyAddress: foo.companyAddress,
        companyDescription: foo.companyDescription,
        collaborationType: format(foo.collaborationType),
        crops: {
          create: [
            ...foo!.crops!.map((crop) => ({
              cropName: crop.cropName,
              priceRange: `${crop.priceRangeFrom}-${crop.priceRangeTo}`,
            })),
          ],
        },
        companyName: foo.companyName,
        userId: res.user.id,
      },
    });

    return {
      success: true,
      message: "Collaborator added successfully",
      collaborater,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message,
      };
    }

    return {
      success: false,
      message: "An error occurred while adding the collaborator.",
    };
  }
}

export async function getCollaboratorsByCategory({
  category,
}: {
  category: CollaborationType;
}) {
  try {
    const collaborators = await prisma.collaborationPartner.findMany({
      where: {
        collaborationType: category,
      },
      include: {
        crops: true,
      },
    });
    return {
      success: true,
      message: "Collaborators retrieved successfully",
      collaborators,
    };
  } catch (error) {
    console.error("Error fetching collaborators:", error);
    return {
      success: false,
      message: "An error occurred while retrieving the collaborators.",
    };
  }
}

export async function approveCollaborator({ id }: { id: string }) {
  try {
    const foo = await getCurrUser();

    if (!foo.success) {
      return {
        success: false,
        message: foo.message,
        statusCode: 404,
      };
    }

    const collaborator = await prisma.collaborationPartner.update({
      where: {
        id,
      },
      data: {
        isApproved: true,
      },
    });

    console.log(collaborator);

    return {
      success: true,
      message: "Collaborator approved successfully",
      collaborator,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while approving the collaborator.",
    };
  }
}

export async function delCollaborator({ id }: { id: string }) {
  try {
    // const collaborator = await db.collaborationPartner.delete({
    //     where : {
    //         id,
    //     }
    // });

    const collaborator = await prisma.collaborationPartner.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
      select: {
        id: true,
        companyName: true,
        email: true,
        collaborationType: true,
        deletedAt: true,
      },
    });

    return {
      success: true,
      message: "Collaborator deleted successfully",
      collaborator,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while deleting the collaborator.",
    };
  }
}

export async function getDeletedCollaborators() {
  try {
    const collaborators = await prisma.collaborationPartner.findMany({
      where: {
        isDeleted: true,
      },
    });

    return {
      success: true,
      message: "Collaborators retrieved successfully",
      collaborators,
    };
  } catch (error) {
    console.error("Error fetching collaborators:", error);
    return {
      success: false,
      message: "An error occurred while retrieving the collaborators.",
    };
  }
}

export async function restoreCollaborator({ id }: { id: string }) {
  try {
    const collaborator = await prisma.collaborationPartner.update({
      where: {
        id,
      },
      data: {
        isDeleted: false,
        deletedAt: null,
      },
      select: {
        id: true,
        companyName: true,
        email: true,
        collaborationType: true,
        deletedAt: true,
      },
    });

    return {
      success: true,
      message: "Collaborator restored successfully",
      collaborator,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while restoring the collaborator.",
    };
  }
}

export async function permanentlyDeleteCollaborator({ id }: { id: string }) {
  try {
    await prisma.collaborationPartner.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Error permanently deleting collaborator:', error);
    return { success: false, error: 'Failed to permanently delete collaborator' };
  }
}