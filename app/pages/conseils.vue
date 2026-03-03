<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div class="max-w-2xl">
          <span class="inline-block text-xs font-semibold uppercase tracking-widest text-orange-100 mb-3">
            Guide pratique
          </span>
          <h1 class="text-3xl sm:text-4xl font-bold leading-tight">
            Conseils pour louer en toute sérénité
          </h1>
          <p class="mt-4 text-orange-100 text-sm sm:text-base leading-relaxed">
            Que vous cherchiez votre premier appartement ou que vous soyez un locataire expérimenté,
            retrouvez ici tout ce qu'il faut savoir avant de signer un bail.
          </p>
        </div>
      </div>
    </section>

    <!-- Tips section -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-gray-900">Conseils lors de la location</h2>
          <p class="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Les bonnes pratiques à adopter avant, pendant et après votre location
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="tip in tips" :key="tip.title" class="bg-[#FAFAFA] border border-gray-100 rounded-2xl p-6 hover:border-orange-200 hover:shadow-sm transition-all duration-300">
            <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4 text-xl">
              {{ tip.icon }}
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ tip.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ tip.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Rental types -->
    <section class="bg-[#FAFAFA]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-gray-900">Types de locations</h2>
          <p class="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Chaque type de location a ses propres règles et avantages
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div
            v-for="type in rentalTypes"
            :key="type.name"
            class="bg-white border border-gray-100 rounded-2xl p-6 hover:border-orange-200 hover:shadow-sm transition-all duration-300"
          >
            <div class="flex items-start gap-4">
              <div class="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 text-xl">
                {{ type.icon }}
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="font-semibold text-gray-900">{{ type.name }}</h3>
                  <span class="text-[11px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 font-medium border border-orange-100">
                    {{ type.badge }}
                  </span>
                </div>
                <p class="text-sm text-gray-500 leading-relaxed">{{ type.desc }}</p>
                <ul class="mt-3 space-y-1">
                  <li v-for="point in type.points" :key="point" class="flex items-start gap-2 text-xs text-gray-500">
                    <svg class="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    {{ point }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Legal terms -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-gray-900">Termes juridiques essentiels</h2>
          <p class="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Maîtrisez le vocabulaire pour mieux comprendre vos droits et obligations
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="term in legalTerms"
            :key="term.word"
            class="border border-gray-100 rounded-2xl p-5 hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-200 group"
          >
            <div class="flex items-start justify-between gap-2 mb-2">
              <h3 class="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                {{ term.word }}
              </h3>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium whitespace-nowrap">
                {{ term.category }}
              </span>
            </div>
            <p class="text-sm text-gray-500 leading-relaxed">{{ term.def }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-orange-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <h2 class="text-2xl font-bold text-white">Prêt à trouver votre prochain logement ?</h2>
        <p class="mt-2 text-orange-100 text-sm max-w-sm mx-auto">
          Parcourez des milliers d'annonces vérifiées dans 4 pays.
        </p>
        <NuxtLink
          to="/listings"
          class="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-orange-600 text-sm font-semibold rounded-xl hover:bg-orange-50 transition-colors"
        >
          Voir les annonces
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const tips = [
  {
    icon: '🔍',
    title: 'Vérifiez le logement avant de signer',
    desc: "Visitez le bien en personne ou via vidéo, vérifiez l'état des équipements, les compteurs et l'état général des lieux.",
  },
  {
    icon: '📄',
    title: 'Lisez attentivement le contrat',
    desc: "Ne signez jamais un bail sans l'avoir lu en entier. Portez attention aux clauses de résiliation, au montant des charges et aux conditions de renouvellement.",
  },
  {
    icon: '💶',
    title: 'Évaluez le budget total',
    desc: "Le loyer ne constitue pas la seule dépense. Prenez en compte les charges, la taxe d'habitation, les assurances et les éventuels frais d'agence.",
  },
  {
    icon: '📸',
    title: "Faites un état des lieux détaillé",
    desc: "À l'entrée comme à la sortie, photographiez chaque pièce et notez toute imperfection pour éviter les litiges sur le dépôt de garantie.",
  },
  {
    icon: '🏛️',
    title: 'Connaissez vos droits',
    desc: "La législation varie selon les pays. Renseignez-vous sur les délais de préavis, les règles d'augmentation du loyer et vos recours en cas de litige.",
  },
  {
    icon: '🤝',
    title: 'Communiquez avec le propriétaire',
    desc: "Entretenez une relation de confiance avec votre bailleur. Signalez rapidement toute panne ou dommage pour éviter des complications ultérieures.",
  },
]

const rentalTypes = [
  {
    icon: '🛋️',
    name: 'Location meublée',
    badge: 'Flexible',
    desc: "Le logement est fourni avec tous les meubles et équipements nécessaires à la vie quotidienne.",
    points: [
      'Idéale pour les séjours courts ou temporaires',
      'Loyer généralement plus élevé que le non meublé',
      'Bail plus souple (1 an renouvelable, 9 mois pour étudiants)',
    ],
  },
  {
    icon: '🏠',
    name: 'Location non meublée (vide)',
    badge: 'Long terme',
    desc: "Le logement est livré sans mobilier. Le locataire apporte ses propres meubles et équipements.",
    points: [
      'Bail de 3 ans renouvelable (en France)',
      'Loyer plus bas, meilleure stabilité',
      'Convient aux installations durables',
    ],
  },
  {
    icon: '📅',
    name: 'Location saisonnière',
    badge: 'Court séjour',
    desc: "Location temporaire pour des vacances ou des déplacements professionnels, sur une durée limitée.",
    points: [
      'Durée inférieure à 90 jours en général',
      'Réglementée dans certaines villes (Paris, etc.)',
      'Tarif à la nuitée ou à la semaine',
    ],
  },
  {
    icon: '🏢',
    name: 'Location professionnelle / commerciale',
    badge: 'Business',
    desc: "Bail destiné à un usage professionnel ou commercial, distinct du bail résidentiel.",
    points: [
      'Bail commercial de 9 ans minimum',
      'Encadrement juridique spécifique',
      "Soumis à la TVA selon l'activité",
    ],
  },
]

const legalTerms = [
  {
    word: 'Bail (contrat de location)',
    category: 'Contrat',
    def: "Contrat écrit entre le propriétaire (bailleur) et le locataire définissant les conditions de location : durée, loyer, charges, obligations de chaque partie.",
  },
  {
    word: 'Dépôt de garantie (caution)',
    category: 'Finances',
    def: "Somme versée par le locataire à l'entrée dans les lieux, remboursée à la sortie après déduction des éventuelles retenues pour dégradations.",
  },
  {
    word: 'Préavis',
    category: 'Résiliation',
    def: "Délai obligatoire à respecter avant de quitter un logement ou de demander un départ. Varie de 1 à 3 mois selon le pays et le type de bail.",
  },
  {
    word: 'Charges locatives',
    category: 'Finances',
    def: "Dépenses liées à l'usage de l'immeuble (entretien des parties communes, eau, chauffage collectif…) récupérables par le propriétaire auprès du locataire.",
  },
  {
    word: 'État des lieux',
    category: 'Procédure',
    def: "Document réalisé à l'entrée et à la sortie du logement, décrivant l'état de chaque pièce. Il protège le locataire et le propriétaire en cas de litige.",
  },
  {
    word: 'Indice de référence des loyers (IRL)',
    category: 'Loyer',
    def: "Indice publié trimestriellement permettant de réviser légalement le montant du loyer en cours de bail.",
  },
  {
    word: 'Quittance de loyer',
    category: 'Document',
    def: "Reçu délivré par le propriétaire attestant du paiement du loyer. Elle peut être exigée par certains organismes (banques, administrations).",
  },
  {
    word: 'Garant (caution solidaire)',
    category: 'Sûreté',
    def: "Personne physique ou morale qui s'engage à payer le loyer à la place du locataire en cas de défaillance. Souvent requis pour les jeunes locataires.",
  },
  {
    word: 'Clause résolutoire',
    category: 'Contrat',
    def: "Clause du bail prévoyant sa résiliation automatique en cas de manquement grave du locataire (loyers impayés, troubles de voisinage).",
  },
]

useHead({ title: 'Conseils location — RentGlobe' })
</script>
