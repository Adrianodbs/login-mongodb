'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup'

export default function Register() {
  const initialValues = {
    email: '',
    password: ''
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
    email: Yup.string()
      .email('Digite um email válido')
      .required('O campo e-mail é obrigatório'),
    password: Yup.string().required('O campo senha é obrigatório')
  })

  async function handleSubmit() {}

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form
            noValidate
            className="flex flex-col gap-2 p-4 border border-zinc-300 min-w-[300px] bg-white rounded"
          >
            <Input required name="name" type="text" />
            <Input required name="email" type="email" />
            <Input
              required
              name="password"
              type="password"
              autoComplete="off"
            />
            <Button
              type="submit"
              text="Entrar"
              className="bg-green-500 text-white rounded p-2 cursor-pointer"
            />
            <span className="text-xs text-zinc-500">
              Já possui uma conta?
              <strong className="text-zinc-700">
                <Link href="/login"> Entre</Link>
              </strong>
            </span>
          </Form>
        )}
      </Formik>
    </main>
  )
}
