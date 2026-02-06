import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PDFParser from "pdf2json";

// 1. Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    // 2. Parse the FormData
    const formData = await req.formData();
    const file = formData.get("resume") as File;
    const jobDescription = formData.get("jobDescription") as string;
    const candidateName = formData.get("candidateName") as string;

    if (!file || !jobDescription || !candidateName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 3. Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Extract Text using pdf2json (The Stable Way)
    const resumeText = await new Promise<string>((resolve, reject) => {
      const pdfParser = new PDFParser(null, true); // The '1' tells it to parse as text

      pdfParser.on("pdfParser_dataError", (errData: any) => {
        console.error(errData.parserError);
        reject(errData.parserError);
      });

      pdfParser.on("pdfParser_dataReady", () => {
        // getRawTextContent() is a helper method of pdf2json
        const text = (pdfParser as any).getRawTextContent();
        resolve(text);
      });

      pdfParser.parseBuffer(buffer);
    });

    // 5. Engineer the Prompt
    const prompt = `
      You are an expert career coach. Write a professional cover letter for ${candidateName}.
      
      CONTEXT:
      - The candidate is applying for a role described as: "${jobDescription}"
      - The candidate's resume text is: "${resumeText}"

      INSTRUCTIONS:
      - Analyze the resume to find skills that match the job description.
      - Write a persuasive, professional cover letter.
      - Use HTML formatting for line breaks (<br>) and paragraphs (<p>), but do not wrap the whole thing in markdown code blocks.
      - Keep it concise (approx 300 words).
      - Ensure the tone is confident but polite.
    `;

    // 6. Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const coverLetter = response.text();

    return NextResponse.json({ coverLetter });

  } catch (error) {
    console.error("Error generating cover letter:", error);
    return NextResponse.json({ error: "Failed to generate cover letter" }, { status: 500 });
  }
}