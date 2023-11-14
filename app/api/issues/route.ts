import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from "@/prisma/migrations/client";

const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required')
})

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body)

    //check validation help with zod
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status:400})

        //create new issue in db help with prisma client.ts
        const newIssue = await prisma.issue.create({
            data: { title: body.title, description: body.description}
        })

    return NextResponse.json(newIssue, {status: 201})

}