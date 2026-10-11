import Script from 'next/script'

/**
 * Bandeau Studio de Adrien, tout en bas de page. Son contenu vient de
 * https://www.studiodeadrien.com/bandeau.js, commun à tous les sites clients
 * (source : Drive « Studio de Adrien/05_Interne/Bandeau publicitaire »). Le
 * script remplace le lien ci-dessous, qui reste affiché s'il ne charge pas.
 */
export default function StudioBandeau() {
  return (
    <>
      <div
        id="studio-de-adrien-bandeau"
        className="bg-[#0a0a0a] px-4 py-3 text-center text-xs text-[#f0f0f0]"
      >
        <a
          href="https://www.studiodeadrien.com"
          target="_blank"
          rel="noopener"
          className="underline underline-offset-4 hover:decoration-2"
        >
          Site web réalisé par Studio de Adrien
        </a>
      </div>
      <Script src="https://www.studiodeadrien.com/bandeau.js" strategy="afterInteractive" />
    </>
  )
}
