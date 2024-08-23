import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../dbconfig/db";
import Todo from "../../../models/todo";
import { v4 as uuidv4 } from "uuid";

connectDB();

function getIdFromPath(s: String) {
    let parts = s.split("/");
    console.log(parts);
    return parts[parts.length - 1];
}
export async function GET(request: NextRequest) {
    try {
        console.log(request.nextUrl.pathname);
        //path containe the id
        const path = request.nextUrl.pathname;
        const id = getIdFromPath(path);
        // console.log(id);
        const todo = await Todo.findOne({ id });
        // console.log(todo)

        return NextResponse.json({ "Found all todos": todo, success: true, });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "Something went wrong": error, success: false });

    }
}


export async function DELETE(request: NextRequest) {
    try {
        const path = request.nextUrl.pathname;
        const id = getIdFromPath(path);
        await Todo.deleteOne({ id });
        return NextResponse.json({ " todo deleted successfully": true, success: true });
    }
    catch (error) {
        console.log(error);
    }
}

export async function PUT(request: NextRequest) {
    try {
        const path = request.nextUrl.pathname;
        const id = getIdFromPath(path);
        const reqBody = await request.json();
        const { desc, completed } = reqBody;
        console.log(desc)

        await Todo.updateOne({ id, desc, completed });
        return NextResponse.json({ "updated  todo": true, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "Something went wrong": error, success: false });
    }
}