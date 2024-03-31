import { getServerSession } from "next-auth";
import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";
import { authOp } from "../auth/[...nextauth]/route"
export async function POST(req) {

    const {  username ,street ,code ,city,cartProducts} = await req.json();
    const newOrder = await prisma.order.create({
      data: {
        username ,street ,code ,city,cartProducts
      }
    });
 
    return NextResponse.json({newOrder}, { status: 200})

}
export async function GET(req) {
  const session = await getServerSession(authOp)
  const {email} = session.user
  const userInfo = await prisma.user.findUnique({
    where: {
      email
    }
  });

if(userInfo.admin){
  const orders = await prisma.order.findMany();
  return NextResponse.json(orders, { status: 200})
}else{
  const orders = await prisma.order.findMany({
    where: {
      username:email
    }
  });
  return NextResponse.json(orders, { status: 200})
}
 

}