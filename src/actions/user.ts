"use server";
import { db } from "@/server/db/db";
import bcrypt from "bcrypt";
import getServerSession from "@/server/getServerSession";

import { SignupFormData, signupSchema, ZodError } from "@/validators/index";

export async function getCurrUser() {
  try {
    const session = await getServerSession();

    console.log("session", session);

    if (!session?.user?.email) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
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

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        phoneNumber,
      },
    });

    await db.account.create({
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
    const user = await db.user.findUnique({
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
