import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../dbconfig/db";
import Todo from "../../models/todo";
import { v4 as uuidv4 } from "uuid";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const todos = await Todo.find({});
        console.log(todos)
        return NextResponse.json({ "Found all todos": todos, success: true, todos: todos });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "Something went wrong": error, success: false });

    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { desc } = reqBody;
        console.log(desc)

        const newTodo = new Todo({
            id: uuidv4(),
            desc: desc,
            completed: false
        })

        const savedTodo = await newTodo.save();
        console.log(savedTodo)

        return NextResponse.json({ "Created todo": savedTodo, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "Something went wrong": error, success: false });
    }
}


export async function DELETE(request: NextRequest) {
    try {
        await Todo.deleteMany({});
        return NextResponse.json({ "Deleted all todos": true, success: true });
    }
    catch (error) {
        console.log(error);
    }
}



