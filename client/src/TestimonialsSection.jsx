const testimonials = [
  {
    name: 'Alex Kim',
    role: 'Product Manager',
    quote: 'We improved customer feedback response by 60% in a week.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Priya Singh',
    role: 'HR Executive',
    quote: 'Perfect for event feedback, no technical setup needed.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Jordan Lee',
    role: 'Operations Lead',
    quote: 'The dashboard insights are a game changer for our team.',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
];

const TestimonialsSection = () => (
  <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 font-poppins">What Our Users Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map(({ name, role, quote, avatar }) => (
        <div key={name} className="bg-primary/5 rounded-2xl shadow p-6 flex flex-col items-center text-center">
          <img src={avatar} alt={name} className="w-16 h-16 rounded-full mb-4 object-cover" />
          <blockquote className="text-gray-700 italic mb-3">“{quote}”</blockquote>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialsSection; 