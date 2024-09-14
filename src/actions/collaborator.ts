"use server"

import { db } from "@/server/db/db";
import { FormData, ZodError } from "@/validators";


const format = (str : string) => {
    return str.toUpperCase().split(" ").join("_") as any;
}

export default async function addCollaborators(foo : FormData) {
    try {
        const collaborater = await db.collaborationPartner.create({
            data : {
                username : foo.username,
                email : foo.email,
                phoneNumber : foo.phoneNumber,
                companyAddress : foo.companyAddress,
                companyDescription : foo.companyDescription,
                collaborationType : format(foo.collaborationType),
                crops : {
                    create : [
                        ...foo!.crops!.map((crop) => ({
                            cropName : crop.cropName,
                            priceRangeFrom : crop.priceRangeFrom,
                            priceRangeTo : crop.priceRangeTo,
                        }))
                    ]
                },
                companyName : foo.companyName,
            }
        })

        return {
            success : true,
            message : "Collaborator added successfully",
            collaborater,
        }

    } catch (error) {
        if(error instanceof ZodError) {
            return {
                success: false,
                message: error.errors[0]?.message,
            }
        }

        return {
            success: false,
            message: "An error occurred while adding the collaborator.",
        }
    }
}