import client from "../prisma/db.js"

export const create_company = async (req, res) => {
    // const {companyId}=req.params
    const adminid = req.userId
    const { description, name, requirements, packagea, onsite } = req.body
    try {
        const data = await client.createdTeam.create({
            data: {
                adminId: 1,
                description: description,
                name: name,
                requirements: requirements,
                packag: packagea,
                onsite
            }
        })
        res.json({ message: "created team with admin id", id: adminid })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "internal server error" })
    }
}

export const getcommpnies = async (req, res) => {
    // const {companyId}=req.params
    try {
        const teams = await client.createdTeam.findMany()
        res.status(200).json({ teams });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "internal server error" })
    }
}
export const applytoteams = async (req, res) => {
    try {
        const { teamId } = req.body;
        const userId = req.userId;
        const iddd = parseInt(teamId);

        const user = await client.currentStudents.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.documentId) {
            return res.status(400).json({ message: 'You must upload your documents before applying.' });
        }

        // Confirm the team actually exists
        const team = await client.createdTeam.findUnique({
            where: { id: iddd },
        });

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const existingApplication = await client.teamApplication.findFirst({
            where: {
                currentStudentId: userId,
                createdTeamId: iddd,
            },
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied to this team' });
        }

        await client.teamApplication.create({
            data: {
                currentStudentId: userId,
                createdTeamId: iddd,
            },
        });

        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error applying to team:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export const get_all_applicants_related_to_team = async (req, res) => {
    try {
        const teamid = parseInt(req.params.teamid);

        const team = await client.createdTeam.findUnique({
            where: { id: teamid },
            include: {
                applications: {
                    include: {
                        currentStudent: {
                            include: {
                                document: true
                            }
                        }
                    },
                },
            },
        });

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        const applicants = team.applications.map((app) => app.currentStudent);

        res.status(200).json({ team, applicants });
    } catch (error) {
        console.error("Error fetching applicants:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
