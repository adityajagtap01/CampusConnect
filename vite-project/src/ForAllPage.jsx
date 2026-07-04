import { useState, useEffect } from 'react';
import { api } from './services/axios';
import { useUserStore } from './services/atom';

export default function TeamManagement() {
  const { isadmin } = useUserStore();
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', packagea: '', requirements: '', onsite: false });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await api.get('/team/allteams');
      setTeams(response.data.teams || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setTeams([]);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await api.post('/team/postateam', form);
      alert('Team created successfully!');
      setForm({ name: '', description: '', packagea: '', requirements: '', onsite: false });
      fetchTeams();
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Failed to create team.');
    }
  };

  const handleApplyToTeam = async (teamId) => {
    try {
      await api.post('/team/applytoteam', { teamId });
      alert(`Applied to team ${teamId} successfully!`);
    } catch (error) {
      console.error('Error applying to team:', error);
      alert(error.response?.data?.message || 'Failed to apply.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-blue-400 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        {isadmin ? 'Manage Teams' : 'Available Teams'}
      </h1>

      {isadmin && (
        <form onSubmit={handleCreateTeam} className="bg-gray-900 p-6 rounded-lg shadow-md max-w-lg mx-auto mb-8">
          <h2 className="text-2xl mb-4 text-center">Create a Team</h2>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-blue-400 bg-gray-800 text-white p-2 mb-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-blue-400 bg-gray-800 text-white p-2 mb-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Package"
            value={form.packagea}
            onChange={(e) => setForm({ ...form, packagea: e.target.value })}
            className="w-full border border-blue-400 bg-gray-800 text-white p-2 mb-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Requirements"
            value={form.requirements}
            onChange={(e) => setForm({ ...form, requirements: e.target.value })}
            className="w-full border border-blue-400 bg-gray-800 text-white p-2 mb-2 rounded"
            required
          />
          <div className="flex items-center mb-4">
            <label className="mr-2">Onsite:</label>
            <input
              type="checkbox"
              checked={form.onsite}
              onChange={(e) => setForm({ ...form, onsite: e.target.checked })}
              className="w-5 h-5"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">
            Create Team
          </button>
        </form>
      )}

      <h2 className="text-2xl mt-8 mb-4 text-center">{isadmin ? 'All Teams' : 'Open Positions'}</h2>
      {teams.length === 0 ? (
        <p className="text-center text-gray-500">No teams available right now.</p>
      ) : (
        <ul className="max-w-lg mx-auto">
          {teams.map((team) => (
            <li key={team.id} className="border border-blue-400 bg-gray-900 p-4 mb-4 rounded-lg flex justify-between items-center">
              <div>
                <strong className="text-blue-300">{team.name}</strong> - {team.description} ({team.packag})
              </div>
              {!isadmin && (
                <button
                  onClick={() => handleApplyToTeam(team.id)}
                  className="bg-green-500 hover:bg-green-700 text-white p-2 rounded"
                >
                  Apply
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}