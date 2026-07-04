import { useEffect, useState } from 'react';
import { api } from './services/axios';

export default function TeamApplicants() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/team/getapplicants/5");
        console.log(response.data); // Ensure correct structure
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-blue-400 text-center">Loading...</p>;
  if (!data) return <p className="text-blue-400 text-center">No data found.</p>;

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="p-6 max-w-4xl w-full bg-black text-blue-400">
        <h1 className="text-3xl font-bold mb-6 text-center">Team Details</h1>
        <div className="mb-8 p-4 border border-blue-600 rounded-lg shadow-lg">
          <p><strong>Name:</strong> {data.team.name}</p>
          <p><strong>Description:</strong> {data.team.description}</p>
          <p><strong>Package:</strong> {data.team.packag}</p>
          <p><strong>Requirements:</strong> {data.team.requirements}</p>
          <p><strong>Onsite:</strong> {data.team.onsite ? 'Yes' : 'No'}</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-center">Applicants</h2>
        {data.applicants.length === 0 ? (
          <p className="text-center">No applicants found.</p>
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
    </div>
  );
}
