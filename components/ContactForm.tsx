'use client'

import { useState, useEffect, useRef, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const searchParams = useSearchParams()
  const serviceRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    const service = searchParams.get('service')
    if (service && serviceRef.current) {
      serviceRef.current.value = service
    }
  }, [searchParams])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-7 w-7 text-green-600">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="font-heading text-xl text-green-800">Message envoyé</h3>
        <p className="mt-2 text-sm text-green-700">
          Nous vous recontacterons dans les meilleurs délais.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-medium text-green-700 underline hover:text-green-900"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Replace with your Web3Forms access key */}
      <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
      <input type="hidden" name="subject" value="Nouveau message — Robin des Toits" />
      <input type="hidden" name="from_name" value="Site Robin des Toits" />
      <input type="checkbox" name="botcheck" className="hidden" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-700">
            Nom complet *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-gris bg-white px-4 py-3 text-sm transition-colors focus:border-brun focus:outline-none focus:ring-1 focus:ring-brun"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-neutral-700">
            Téléphone *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-lg border border-gris bg-white px-4 py-3 text-sm transition-colors focus:border-brun focus:outline-none focus:ring-1 focus:ring-brun"
            placeholder="06 00 00 00 00"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full rounded-lg border border-gris bg-white px-4 py-3 text-sm transition-colors focus:border-brun focus:outline-none focus:ring-1 focus:ring-brun"
          placeholder="votre@email.fr"
        />
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-neutral-700">
          Type de travaux
        </label>
        <select
          id="service"
          name="service"
          ref={serviceRef}
          className="w-full rounded-lg border border-gris bg-white px-4 py-3 text-sm transition-colors focus:border-brun focus:outline-none focus:ring-1 focus:ring-brun"
        >
          <option value="">Sélectionnez un service</option>
          <option value="renovation-toiture">Rénovation de toiture</option>
          <option value="charpente">Charpente</option>
          <option value="couverture">Couverture</option>
          <option value="zinguerie">Zinguerie</option>
          <option value="ossature-bois">Ossature bois</option>
          <option value="pergola">Pergola</option>
          <option value="terrasse-bois">Terrasse bois</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-700">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-lg border border-gris bg-white px-4 py-3 text-sm transition-colors focus:border-brun focus:outline-none focus:ring-1 focus:ring-brun"
          placeholder="Décrivez votre projet ou votre demande..."
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-gris accent-brun"
        />
        <label htmlFor="consent" className="text-xs leading-relaxed text-neutral-600">
          J&apos;accepte que mes données soient utilisées pour traiter ma demande
          conformément à la{' '}
          <a href="/mentions-legales" className="text-brun underline">
            politique de confidentialité
          </a>
          . *
        </label>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">
          Une erreur est survenue. Veuillez réessayer ou nous appeler directement.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === 'loading' ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi en cours...
          </>
        ) : (
          'Envoyer ma demande'
        )}
      </button>
    </form>
  )
}
