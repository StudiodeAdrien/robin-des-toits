import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales et politique de confidentialité du site Robin des Toits.',
  robots: { index: false, follow: false },
}

export default function MentionsLegalesPage() {
  return (
    <section className="section-padding">
      <div className="container-tight prose prose-neutral max-w-3xl prose-headings:font-heading prose-headings:text-brun prose-a:text-brun">
        <h1>Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>
          <strong>Robin des Toits</strong>
          <br />
          Dirigeant : Vincent Cardonna
          <br />
          SIRET : 527 744 957
          <br />
          TVA intracommunautaire : FR 10527744957
          <br />
          Date de création : 21 octobre 2010
        </p>
        <p>
          Téléphone :{' '}
          <a href="tel:+33606441781">06 06 44 17 81</a>
          <br />
          Email :{' '}
          <a href="mailto:82@neuf.fr">82@neuf.fr</a>
        </p>

        <h2>Hébergeur</h2>
        <p>
          Cloudflare, Inc.
          <br />
          101 Townsend St, San Francisco, CA 94107, États-Unis
          <br />
          <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">
            www.cloudflare.com
          </a>
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu de ce site (textes, images, logo, vidéos)
          est la propriété exclusive de Robin des Toits ou fait l&apos;objet
          d&apos;une autorisation d&apos;utilisation. Toute reproduction,
          représentation ou diffusion, en tout ou partie, du contenu de ce site
          sans autorisation préalable est interdite.
        </p>

        <h2>Responsabilité</h2>
        <p>
          Robin des Toits s&apos;efforce de fournir des informations aussi
          précises que possible sur ce site. Toutefois, l&apos;entreprise ne
          pourra être tenue responsable des omissions, inexactitudes ou
          carences dans la mise à jour de ces informations.
        </p>

        <hr />

        <h1>Politique de confidentialité</h1>

        <h2>Collecte des données personnelles</h2>
        <p>
          Les données personnelles collectées via le formulaire de contact
          (nom, téléphone, email, message) sont destinées uniquement à Robin
          des Toits et utilisées dans le seul but de répondre à votre demande
          de devis ou d&apos;information.
        </p>

        <h2>Base légale du traitement</h2>
        <p>
          Le traitement de vos données repose sur votre consentement, exprimé
          en cochant la case prévue à cet effet dans le formulaire de contact.
        </p>

        <h2>Durée de conservation</h2>
        <p>
          Vos données sont conservées pendant une durée maximale de 3 ans à
          compter de votre dernière demande, sauf obligation légale contraire.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez des droits suivants :
        </p>
        <ul>
          <li>Droit d&apos;accès à vos données personnelles</li>
          <li>Droit de rectification</li>
          <li>Droit à l&apos;effacement</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit à la portabilité</li>
          <li>Droit d&apos;opposition</li>
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous à{' '}
          <a href="mailto:82@neuf.fr">82@neuf.fr</a> ou par téléphone au{' '}
          <a href="tel:+33606441781">06 06 44 17 81</a>.
        </p>

        <h2>Cookies et analytics</h2>
        <p>
          Ce site utilise Cloudflare Web Analytics, un outil d&apos;analyse
          respectueux de la vie privée qui ne dépose pas de cookies et ne
          collecte aucune donnée personnelle. Il est conforme au RGPD sans
          nécessiter de bannière de consentement.
        </p>

        <h2>Liens externes</h2>
        <p>
          Ce site peut contenir des liens vers des sites tiers. Robin des
          Toits ne peut être tenu responsable du contenu de ces sites ni de
          leur politique de confidentialité.
        </p>
      </div>
    </section>
  )
}
