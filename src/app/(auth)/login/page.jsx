'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { Form, Formik } from 'formik'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

export default function Login() {
  const [error, setError] = useState('')
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status, router])

  if (status !== 'unauthenticated') {
    return null
  }

  const initialValues = {
    email: '',
    password: ''
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um email válido')
      .required('O campo e-mail é obrigatório'),
    password: Yup.string().required('O campo senha é obrigatório')
  })

  async function handleSubmit(values, { resetForm }) {
    setIsFormSubmitting(true)
    try {
      signIn('Credentials', { ...values, redirect: false }).then(
        ({ error }) => {
          if (!error) {
            router.push('/')
          } else {
            renderError(error.replace('Error: ', ''))

            resetForm()
          }
          setIsFormSubmitting(false)
        }
      )
    } catch (error) {
      setIsFormSubmitting(false)
      renderError('Erro ao criar conta, tente mais tarde!')
    }
  }

  function renderError(msg) {
    setError(msg)
    setTimeout(() => {
      setError('')
    }, 3000)
  }

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
            <Input required name="email" type="email" />
            <Input
              required
              name="password"
              type="password"
              autoComplete="off"
            />
            <Button
              type="submit"
              text={isFormSubmitting ? 'Carregando...' : 'Entrar'}
              disabled={isFormSubmitting}
              className="bg-green-500 text-white rounded p-2 cursor-pointer"
            />
            {!values.email && values.password && error && (
              <span className="text-red-500 text-sm text-center">{error}</span>
            )}
            <span className="text-xs text-zinc-500">
              Não possui uma conta?
              <strong className="text-zinc-700">
                <Link href="/register"> Inscreva-se</Link>
              </strong>
            </span>
          </Form>
        )}
      </Formik>
    </main>
  )
}
