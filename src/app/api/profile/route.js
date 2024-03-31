import { getServerSession } from "next-auth";
import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";
import { authOp } from "../auth/[...nextauth]/route"
export async function PUT(req) {

    const {name , city ,code,street} = await req.json();
    const session = await getServerSession(authOp)
    const {email} = session.user

    await prisma.user.update({
        where: {
          email
        },
        data: {
            name,
            city,
            street,
            code
          },
      });

  

    return NextResponse.json({name }, { status: 200})

}


export async function GET(req) {


  
  const session = await getServerSession(authOp)
  const {email} = session.user
    if (!email) {
      return Response.json({});
    }
  

  const userInfo = await prisma.user.findUnique({
    where: {
      email
    }
  });

  return Response.json({...userInfo});

}