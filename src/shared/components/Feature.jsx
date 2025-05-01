const Feature = ({ icon, title, desc }) => (
    <div className="bg-white shadow rounded-lg p-6 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="font-bold text-xl mb-2">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
  
  export default Feature;
  