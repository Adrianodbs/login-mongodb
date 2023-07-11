'use client'
import React from 'react'
import Link from 'next/link'
import Button from './Button'

export default function Header() {
  return (
    <div className="flex gap-4 justify-center p-2 flex-wrap">
      <Link href="/">Home</Link>
      <Link href="/sobre">Sobre</Link>
      <Link href="/contato">Contato</Link>
      <Button
        text="Sair"
        className="bg-red-600 text-white rounded px-2 cursor-pointer"
      />
    </div>
  )
}
