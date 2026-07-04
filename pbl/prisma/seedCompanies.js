import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const companyNames = [
    "ZS Associates", "Barclays", "Frontcort / Frontcort.AI", "Siemens", "BMC", "BNY",
    "Master Card", "Dell Technology", "General Mills", "PhonePe", "SLB", "eQ Technologic",
    "Dentsu", "FPL Technologies", "ProcDNA", "Toshiba", "Adobe", "Accordion",
    "Arista Network", "IdeaS", "Equifax", "Nice System", "UPTIQ", "Entrata",
    "Lattice", "FlexTrade", "Wissen Technology", "Walmart", "Principal Global", "Sell.do",
    "Alliance Bernstein", "SAP", "Concentric AI", "ProMobi Technologies", "ACA Global", "Altizon",
    "Qualys", "NCS", "Zensar", "Onix", "Kylas", "Beyondwalls"
];

async function main() {
    for (const name of companyNames) {
        await prisma.company.create({ data: { name } });
    }
    console.log(`Seeded ${companyNames.length} companies.`);
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());