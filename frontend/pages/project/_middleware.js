// pages/_middleware.ts
import { NextFetchEvent, NextRequest } from 'next/server'
import { useSession, signIn, signOut, getSession } from "next-auth/react"

export function middleware(req, ev) {
    const { data } = getSession()

    if (session) {
        return NextResponse.redirect('/confirmationPage')
    }

    return NextResponse.next()
}