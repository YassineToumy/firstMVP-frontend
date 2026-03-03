<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div class="max-w-xl">
          <span class="inline-block text-xs font-semibold uppercase tracking-widest text-orange-100 mb-3">
            Contact
          </span>
          <h1 class="text-3xl sm:text-4xl font-bold leading-tight">
            We're here to help
          </h1>
          <p class="mt-4 text-orange-100 text-sm sm:text-base leading-relaxed">
            Have a question or need assistance? Reach out to the RentGlobe team — we usually respond within 24 hours.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact content -->
    <section class="bg-[#FAFAFA]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-10">

          <!-- Info cards -->
          <div class="lg:col-span-2 space-y-4">
            <h2 class="text-lg font-bold text-gray-900 mb-6">Get in touch</h2>

            <div v-for="item in contactInfo" :key="item.label" class="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-orange-200 hover:shadow-sm transition-all duration-200">
              <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                <component :is="item.icon" class="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">{{ item.label }}</p>
                <p class="text-sm font-semibold text-gray-900">{{ item.value }}</p>
                <p v-if="item.sub" class="text-xs text-gray-500 mt-0.5">{{ item.sub }}</p>
              </div>
            </div>

            <!-- Map placeholder -->
            <div class="bg-white border border-gray-100 rounded-2xl overflow-hidden h-44 flex items-center justify-center mt-2">
              <div class="text-center text-gray-400">
                <svg class="w-8 h-8 mx-auto mb-2 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-xs">Paris, France</p>
              </div>
            </div>
          </div>

          <!-- Contact form -->
          <div class="lg:col-span-3 bg-white border border-gray-100 rounded-2xl p-7 sm:p-9">
            <h2 class="text-lg font-bold text-gray-900 mb-6">Send us a message</h2>

            <form @submit.prevent="submitForm" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1.5">First name</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    placeholder="John"
                    required
                    class="contact-input"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1.5">Last name</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    class="contact-input"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1.5">Email address</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  class="contact-input"
                />
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1.5">Subject</label>
                <select v-model="form.subject" class="contact-input">
                  <option value="">Select a subject…</option>
                  <option value="listing">Question about a listing</option>
                  <option value="account">Account / Login issue</option>
                  <option value="agency">Agency partnership</option>
                  <option value="bug">Report a bug</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1.5">Message</label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  placeholder="Describe your question or request in detail…"
                  required
                  class="contact-input resize-none"
                />
              </div>

              <!-- Success / error feedback -->
              <div v-if="sent" class="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Your message has been sent! We'll get back to you within 24 hours.
              </div>
              <div v-if="error" class="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Something went wrong. Please try again or email us directly.
              </div>

              <button
                type="submit"
                :disabled="sending"
                class="w-full py-3.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg v-if="sending" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                {{ sending ? 'Sending…' : 'Send message' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const PhoneIcon = defineComponent({
  render: () =>
    h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' }),
    ]),
})
const MailIcon = defineComponent({
  render: () =>
    h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }),
    ]),
})
const MapPinIcon = defineComponent({
  render: () =>
    h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z' }),
    ]),
})

const contactInfo = [
  { label: 'Phone', value: '+33 1 23 45 67 89', sub: 'Mon – Fri, 9 am – 6 pm (CET)', icon: PhoneIcon },
  { label: 'Email', value: 'contact@rentglobe.com', sub: 'We reply within 24 hours', icon: MailIcon },
  { label: 'Office', value: '12 Rue de Rivoli, Paris 75001', sub: 'France', icon: MapPinIcon },
]

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
})

const sending = ref(false)
const sent = ref(false)
const error = ref(false)

async function submitForm() {
  sending.value = true
  sent.value = false
  error.value = false
  // Simulate API call — replace with real endpoint
  await new Promise(r => setTimeout(r, 1200))
  sending.value = false
  sent.value = true
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}

useHead({ title: 'Contact Us — RentGlobe' })
</script>

<style scoped>
@reference "tailwindcss";
.contact-input {
  @apply w-full px-4 py-3 text-sm text-gray-900 bg-[#FAFAFA] border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15 transition-all duration-200;
}
</style>
