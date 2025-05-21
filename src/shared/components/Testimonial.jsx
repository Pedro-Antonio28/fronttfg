const Testimonial = ({ name, text }) => (
  <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
    <p className="text-gray-700 italic mb-4">“{text}”</p>
    <p className="font-semibold text-purple-600">— {name}</p>
  </div>
);

export default Testimonial;
