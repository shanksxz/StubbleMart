"use server";
import prisma from "@/server/db/db";
import bcrypt from "bcrypt";

import { SignupFormData, signupSchema, ZodError } from "@/validators/index";
import { auth } from "@/server/auth";

export async function getCurrUser() {
  try {
    const session = await auth();

    console.log("session", session);

    if (!session?.user?.email) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    console.log("user", user);

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function registerUser({
  name,
  email,
  password,
  address,
  phoneNumber,
  role,
}: SignupFormData) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        phoneNumber,
        role,
      },
    });

    await prisma.account.create({
      data: {
        userId: user.id,
        provider: "credentials",
        type: "credentials",
        providerAccountId: user.id,
      },
    });

    return {
      success: true,
      message: "User created successfully",
      user,
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
      message: "Something went wrong",
    };
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
