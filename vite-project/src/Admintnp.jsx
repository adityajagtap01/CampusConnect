import { useEffect, useState } from 'react';
import { api } from './services/axios';

export default function TeamApplicants() {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [data, setData] = useState(null);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await api.get('/team/allteams');
        setTeams(response.data.teams || []);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoadingTeams(false);
      }
    };
    fetchTeams();
  }, []);

  const fetchApplicants = async (teamId) => {
    setSelectedTeamId(teamId);
    setLoadingApplicants(true);
    setData(null);
    try {
      const response = await api.get(`/team/getapplicants/${teamId}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    } finally {
      setLoadingApplicants(false);
    }
  };

  if (loadingTeams) return <p className="text-blue-400 text-center mt-10">Loading teams...</p>;

  return (
    <div className="bg-black min-h-screen text-blue-400 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Team Applicants</h1>

      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="text-xl mb-3">Select a team</h2>
        {teams.length === 0 ? (
          <p className="text-gray-500">No teams created yet.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => fetchApplicants(team.id)}
                className={`px-4 py-2 rounded-lg border ${selectedTeamId === team.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-blue-600 hover:bg-blue-900/30'
                  }`}
              >
                {team.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {loadingApplicants && <p className="text-center">Loading applicants...</p>}

      {data && (
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 p-4 border border-blue-600 rounded-lg shadow-lg">
            <p><strong>Name:</strong> {data.team.name}</p>
            <p><strong>Description:</strong> {data.team.description}</p>
            <p><strong>Package:</strong> {data.team.packag}</p>
            <p><strong>Requirements:</strong> {data.team.requirements}</p>
            <p><strong>Onsite:</strong> {data.team.onsite ? 'Yes' : 'No'}</p>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-center">Applicants</h2>
          {data.applicants.length === 0 ? (
            <p className="text-center">No applicants found for this team.</p>
          ) : (
            <div className="space-y-4">
              {data.applicants.map((applicant) => (
                <div key={applicant.id} className="p-4 border border-blue-600 rounded-lg shadow-lg">
                  <p><strong>Username:</strong> {applicant.username}</p>
                  <p><strong>Registration No:</strong> {applicant.regno}</p>
                  <p><strong>Branch:</strong> {applicant.branch}</p>
                  <p><strong>CGPA:</strong> {applicant.cgpa ?? 'N/A'}</p>
                  {applicant.document ? (
                    <div className="mt-4">
                      <h3 className="font-semibold">Documents:</h3>
                      <ul className="list-disc pl-5">
                        <li><a href={applicant.document.twelth_result_file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-300">12th Result</a></li>
                        <li><a href={applicant.document.cgpa_result_file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-300">CGPA Result</a></li>
                        <li><a href={applicant.document.resume_result_file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-300">Resume</a></li>
                      </ul>
                    </div>
                  ) : (
                    <p>No documents available.</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}