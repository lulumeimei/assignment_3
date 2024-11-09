// src/app/api/users/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import validator from 'validator';


const prisma = new PrismaClient();

// Handle GET requests to fetch users
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10); // Default to page 1
        const limit = parseInt(searchParams.get('limit') || '10', 10); // Default to 10 users per page
        const skip = (page - 1) * limit;

        // Retrieve order criteria from query parameters, default to ordering by 'id'
        const orderByField = searchParams.get('orderBy') || 'id';
        const orderDirection = searchParams.get('orderDirection') || 'desc'; // 'asc' or 'desc'

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                skip,
                take: limit,
                orderBy: {
                    [orderByField]: orderDirection,
                },
            }),
            prisma.user.count(),
        ]);

        return NextResponse.json({ users, total });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


// Handle POST requests to create a new user
export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, gender, phoneNumber } = body;

        // Validate the user input
        const errors = [];

        if (!firstName || typeof firstName !== 'string') {
            errors.push('Invalid or missing first name');
        }

        if (lastName && typeof lastName !== 'string') {
            errors.push('Invalid last name');
        }

        if (!email || !validator.isEmail(email)) {
            errors.push('Invalid or missing email');
        }

        if (!gender || !['MALE', 'FEMALE'].includes(gender.toUpperCase())) {
            errors.push('Gender must be either Male or Female');
        }

        if (!phoneNumber || !validator.isMobilePhone(phoneNumber, 'any')) {
            errors.push('Invalid or missing phone number');
        }

        if (errors.length > 0) {
            return NextResponse.json({ error: errors.join(', ') }, { status: 400 });
        }

        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
        }

        // Create a new user in the database
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                gender: gender.toUpperCase(),
                phoneNumber,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


// Handle DELETE requests to delete a user by email
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Delete the user
        await prisma.user.delete({
            where: { email },
        });

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


// Handle PATCH requests to update a user
export async function PATCH(request) {
    try {
        const body = await request.json();
        const { email, firstName, lastName, gender, phoneNumber } = body;
        console.log('body', body);

        // Validate the input
        if (!email || !validator.isEmail(email)) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }

        if (gender && !['MALE', 'FEMALE'].includes(gender.toUpperCase())) {
            return NextResponse.json({ error: 'Gender must be either Male or Female' }, { status: 400 });
        }

        // if (phoneNumber && !validator.isMobilePhone(phoneNumber, 'any')) {
        //     return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
        // }

        // Check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Update the user in the database
        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                firstName: firstName || existingUser.firstName,
                lastName: lastName,
                gender: gender ? gender.toUpperCase() : existingUser.gender,
                phoneNumber: phoneNumber || existingUser.phoneNumber,
            },
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

