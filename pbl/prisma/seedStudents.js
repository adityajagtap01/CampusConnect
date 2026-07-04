import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Fill these in with the exact ids from Step 46's query result
const companyIds = {
    Barclays: 2,  // <-- replace
    BMC: 5,       // <-- replace
    BNY: 6,       // <-- replace
    SLB: 11,       // <-- replace
};

const students = [
    { codeforce: "1420", codechef: "1650", leetcode: "1550", internship: "Yes", projects: "E-commerce app, Chat app", cgpa: 9, year: 2024, companyId: companyIds.BMC },
    { codeforce: "1380", codechef: "1500", leetcode: "1480", internship: "No", projects: "Portfolio site, ML model", cgpa: 8, year: 2024, companyId: companyIds.BMC },
    { codeforce: "1550", codechef: "1700", leetcode: "1620", internship: "Yes", projects: "Food delivery app", cgpa: 9, year: 2023, companyId: companyIds.BMC },
    { codeforce: "1300", codechef: "1400", leetcode: "1350", internship: "Yes", projects: "Inventory system", cgpa: 8, year: 2024, companyId: companyIds.BNY },
    { codeforce: "1450", codechef: "1550", leetcode: "1500", internship: "No", projects: "Blog platform", cgpa: 9, year: 2023, companyId: companyIds.BNY },
    { codeforce: "1250", codechef: "1350", leetcode: "1300", internship: "Yes", projects: "Task manager", cgpa: 8, year: 2024, companyId: companyIds.SLB },
    { codeforce: "1500", codechef: "1600", leetcode: "1580", internship: "Yes", projects: "Recommendation engine", cgpa: 9, year: 2023, companyId: companyIds.SLB },
    { codeforce: "1350", codechef: "1450", leetcode: "1400", internship: "No", projects: "Weather app, Portfolio", cgpa: 8, year: 2024, companyId: companyIds.Barclays },
    { codeforce: "1480", codechef: "1580", leetcode: "1540", internship: "Yes", projects: "Trading bot simulator", cgpa: 9, year: 2023, companyId: companyIds.Barclays },
];

async function main() {
    for (const s of students) {
        if (!s.companyId) {
            throw new Error('A student has an undefined companyId — check the companyIds mapping at the top.');
        }
        await prisma.student.create({ data: s });
    }
    console.log(`Seeded ${students.length} students.`);
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());