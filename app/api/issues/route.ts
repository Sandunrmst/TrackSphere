import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/migrations/client";
import { IssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = IssueSchema.safeParse(body)

    //check validation help with zod
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status:400})

        //create new issue in db help with prisma client.ts
        const newIssue = await prisma.issue.create({
            data: { title: body.title, description: body.description}
        })

    return NextResponse.json(newIssue, {status: 201})

}