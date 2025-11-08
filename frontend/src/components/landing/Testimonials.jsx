import React from 'react';
import { Quote } from 'lucide-react';
import FadeIn from '../common/FadeIn';

const TestimonialCard = ({ quote, name, title }) => (
  <figure className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-8 shadow-sm dark:border-gray-700/80 dark:bg-gray-800">
    <blockquote className="text-gray-900 dark:text-white">
      <Quote className="h-8 w-8 text-gray-300 dark:text-gray-600" />
      <p className="mt-4 text-lg font-medium">"{quote}"</p>
    </blockquote>
    <figcaption className="mt-8 flex items-center gap-4 border-t border-gray-200/80 pt-6 dark:border-gray-700/80">
      <img className="h-12 w-12 rounded-full bg-gray-200 object-cover dark:bg-gray-700" src={`https://avatar.vercel.sh/${name.split(' ').join('')}.png?size=48`} alt={name} />
      <div>
        <div className="text-base font-semibold text-gray-900 dark:text-white">{name}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
      </div>
    </figcaption>
  </figure>
);

const Testimonials = () => (
  <section id="testimonials" className="bg-white py-24 dark:bg-gray-900 sm:py-32">
    <div className="container mx-auto max-w-7xl px-4 lg:px-8">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">What Our Clients Say</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">Don't just take our word for it. Hear from marketing leaders who trust Aura.</p>
        </div>
      </FadeIn>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
        <FadeIn delay={0}><TestimonialCard quote="Aura has been a game-changer for our content team. We're producing twice the content in half the time, and the quality is better than ever." name="Jane Doe" title="CMO, TechSolutions" /></FadeIn>
        <FadeIn delay={200}><TestimonialCard quote="The AI-powered insights are incredibly accurate. We've optimized our strategy and seen a 40% increase in engagement. Highly recommend!" name="John Smith" title="Content Lead, CreativeCo" /></FadeIn>
      </div>
    </div>
  </section>
);

export default Testimonials;