import client from "../prisma/db.js"
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
import { myprompt } from "../prompts/prompt.js";


export const getcompany = async (req, res) => {
  try {
    const data = await client.company.findMany();
    res.json({
      data: data,
      message: "working"
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

}


export const getStudentsCountByYear = async (req, res) => {
  try {
    const companyId = parseInt(req.params.id);
    console.log(companyId)
    const company = await client.company.findUnique({
      where: {
        id: companyId
      },
    });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }


    const studentsByYear = await client.student.groupBy({
      by: ['year'],
      where: {
        companyId: company.id,
      },
      _count: {
        id: true,
      },
    });
    return res.status(200).json(studentsByYear);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const studentdata = async (req, res) => {
  try {
    const companyid = parseInt(req.params.id)
    console.log(companyid)
    const data = await client.student.findMany({
      where: {
        companyId: companyid
      }
    })
    if (!data) res.status(400).json({ message: "company dosen't exist" });
    res.status(200).json({ data: data, message: "fetched the data" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


export const getsuggestiononprompt = async (req, res) => {
  try {
    const prompt = req.body.prompt
    const companyid = parseInt(req.params.id)
    console.log(companyid)
    const data = await client.student.findMany({
      where: {
        companyId: companyid
      },
      select: {
        leetcode: true,
        codechef: true,
        codeforce: true,
        projects: true,
        cgpa: true,
        internship: true,
      }
    })
    if (!data) res.status(400).json({ message: "company dosen't exist" });
    const result = await model.generateContent(myprompt(data, prompt));
    console.log(result.response.text());
    res.status(200).json({ message: 'nice one', data: result.response.text() })
    // res.json({data:data})

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }


}

export const getspecificcompany = async (req, res) => {
  try {
    const companyId = parseInt(req.params.id)
    console.log(companyId)
    const data = await client.company.findUnique({
      where: {
        id: companyId
      }
    })

    if (!data) {
      return res.status(200).json({ message: "failed to fetch the name" })
    }
    return res.status(200).json({ message: "omg", data: data })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}