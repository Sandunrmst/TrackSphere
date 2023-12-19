import authOptions from "@/app/auth/authOption";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/migrations/client";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, {params}: {params: {id: string}}) {
    
    const session = await getServerSession(authOptions)
    if(!session)
     return NextResponse.json({},{status: 401})

    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    if(body.assignedToUserId){
       const user = await prisma.user.findUnique({where: {id: body.assignedToUserId}})
       if (!user){
        return NextResponse.json({error: 'Invalid user.'}, {status: 400})
       }
    }
    
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!issue)
        return NextResponse.json({error: 'Invalid Issue'}, {status: 404})

        const updatedIssue = await prisma.issue.update({
            where: {id: issue.id},
            data: {
                title: body.title,
                description: body.description,
                assignedToUserId: body.assignedToUserId 
            }
        })
return NextResponse.json(updatedIssue);
         
}

export async function DELETE(
    request: NextRequest,
    {params} : {params: {id:string}}
){

    const session = await getServerSession(authOptions)
    if(!session)
     return NextResponse.json({},{status: 401})
    
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}

    })

    if(!issue)
        return NextResponse.json({error:'Invalid Issue'}, {status: 404})
    await prisma.issue.delete({
        where: {id:issue.id}
    })

    return NextResponse.json({})
}