import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../firebase';

export default function FamilyDirectory() {
  const [families, setFamilies] = useState([]);
  const [filteredFamilies, setFilteredFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [nativeFilter, setNativeFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    const familiesRef = ref(db, 'families');

    const unsubscribe = onValue(familiesRef, (snapshot) => {
      try {
        const data = snapshot.val();

        if (!data) {
          setError('No families found in database');
          setFamilies([]);
          setLoading(false);
          return;
        }

        const familiesData = Object.entries(data).map(([familyId, familyData]) => {
          const members = familyData.members
            ? Object.entries(familyData.members).map(([memberId, member]) => ({
                id: memberId,
                ...member
              }))
            : [];

          return {
            id: familyId,
            name: familyData.familyName || `Family ${familyId}`,
            city: familyData.city || '',
            native: familyData.native || '',
            phone: familyData.phone || '',
            members
          };
        });

        setFamilies(familiesData);
        setFilteredFamilies(familiesData);
        setLoading(false);
      } catch (err) {
        console.error("Error processing data:", err);
        setError('Failed to process family data');
        setLoading(false);
      }
    }, (error) => {
      console.error("Firebase error:", error);
      setError('Failed to load data from database');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filters
  useEffect(() => {
    const filtered = families.filter(family => {
      const searchMatch = searchTerm === "" || (
        family.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        family.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        family.native?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        family.phone?.includes(searchTerm) ||
        family.members.some(m =>
          m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.mobile?.includes(searchTerm)
        )
      );

      const nativeMatch = nativeFilter === "" || family.native === nativeFilter;
      const cityMatch = cityFilter === "" || family.city === cityFilter;

      return searchMatch && nativeMatch && cityMatch;
    });

    setFilteredFamilies(filtered);
  }, [searchTerm, nativeFilter, cityFilter, families]);

  const uniqueNatives = [...new Set(families.map(f => f.native).filter(Boolean))].sort();
  const uniqueCities = [...new Set(families.map(f => f.city).filter(Boolean))].sort();

  const resetFilters = () => {
    setSearchTerm("");
    setNativeFilter("");
    setCityFilter("");
  };

  const handleEdit = (familyId, member) => {
    setEditingMember({ familyId, memberId: member.id });
    setFormData({
      name: member.name || '',
      relationship: member.relationship || '',
      email: member.email || '',
      phone: member.phone || '',
      birthdate: member.birthdate || '',
      photoURL: member.photoURL || '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (!editingMember) return;

      const updates = {};
      updates[`families/${editingMember.familyId}/members/${editingMember.memberId}`] = formData;

      await update(ref(db), updates);
      setEditingMember(null);
    } catch (err) {
      console.error("Error updating data:", err);
      setError('Failed to save changes');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Family Directory</h1>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name, city, native, phone..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={nativeFilter}
            onChange={e => setNativeFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Natives</option>
            {uniqueNatives.map(native => (
              <option key={native} value={native}>{native}</option>
            ))}
          </select>
          <select
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Cities</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Family Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFamilies.length === 0 ? (
          <div className="text-center text-yellow-700 bg-yellow-100 p-4 rounded col-span-full">
            No families found matching your criteria.
          </div>
        ) : (
          filteredFamilies.map(family => (
            <div key={family.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">{family.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                {family.city} ({family.native})
              </p>
            { /* <p className="text-sm text-gray-600 mb-2">📞 {family.phone}</p>*/}

              <div className="text-sm bg-gray-100 rounded p-2 space-y-1">
                {family.members.length > 0 ? family.members.map(m => (
                <div key={m.id} className="flex justify-between items-center border-b last:border-b-0 py-1">
                <div className="flex items-center gap-2">
                  {/* Call icon before name */}
                  {m.mobile && (
                            <div className="flex gap-1 text-blue-600 text-xs">
                              <a href={`tel:${m.mobile}`} title={`Call ${m.name}`} className="hover:text-blue-800">📞</a>
                            </div>
                          )}
                  <span className={m.isContactPerson ? "font-bold" : ""}>
                    {m.name}
                  </span>
                  <span className="text-gray-500 text-xs">({m.relationWithHead})</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* WhatsApp icon before edit */}
                  {m.mobile && (
                            <button className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4" 
                              viewBox="0 0 24 24" 
                              fill="currentColor"
                            >
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.479 5.093 1.479h.005c3.717 0 6.74-3.024 6.74-6.74 0-3.717-3.024-6.74-6.74-6.74-3.717 0-6.74 3.024-6.74 6.74 0 1.719.647 3.374 1.824 4.634l-.999 3.648 3.742-.981zm11.245-9.348c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                          </button>
                        )}
                  {/* Edit icon */}
                  <button
                    onClick={() => handleEdit(family.id, m)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                    aria-label="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>
                )) : (
                  <div className="italic text-gray-500">No members listed</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Member</h2>
            <div className="space-y-4">
              {['name', 'relationship', 'email', 'phone', 'birthdate', 'photoURL'].map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded border-gray-300 p-2"
                  />
                </div>
              ))}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
