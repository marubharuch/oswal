export default function UserDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Family</h2>
          <p className="text-gray-600">View and edit your family details</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Family Events</h2>
          <p className="text-gray-600">See and RSVP to upcoming events</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Family Photos</h2>
          <p className="text-gray-600">View and upload family photos</p>
        </div>
      </div>
    </div>
  );
}