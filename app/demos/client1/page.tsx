import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Demo | Preview',
}

export default function Client1Demo() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <header className="gradient-bg text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Business Name
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            A quick look at what we can build for you — custom-tailored to your workflow.
          </p>
        </div>
      </header>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Dashboard',
                description: 'Real-time overview of your key metrics, all in one place.',
              },
              {
                title: 'Inventory',
                description: 'Track stock levels, orders, and suppliers without spreadsheets.',
              },
              {
                title: 'Reports',
                description: 'Automated reports delivered on your schedule — no manual exports.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-dark-gray dark:text-slate-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-light-gray dark:bg-slate-900 mt-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to move forward?</h2>
          <p className="text-dark-gray dark:text-slate-400 mb-8">
            This is a preview of what your custom system could look like.
            Let&apos;s talk about making it real.
          </p>
          <a
            href="https://vurso.com/#contact"
            className="inline-block px-8 py-3 rounded-full bg-accent-purple hover:bg-accent-purple-light text-white font-semibold transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}
