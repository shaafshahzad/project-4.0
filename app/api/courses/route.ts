import { NextRequest, NextResponse } from 'next/server'; // To handle the request and response
import { promises as fs } from 'fs'; // To save the file temporarily
import { v4 as uuidv4 } from 'uuid'; // To generate a unique filename
import PDFParser from 'pdf2json'; // To parse the pdf
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const uploadedFile = formData.get('file');

    let fileName = '';
    let parsedText = '';
    let extracted = '';

    if (uploadedFile) {
        fileName = uuidv4();

        const tempFilePath = `/tmp/${fileName}.pdf`;

        let fileBuffer: Buffer;
        if (uploadedFile instanceof Blob) {
            const arrayBuffer = await uploadedFile.arrayBuffer();
            fileBuffer = Buffer.from(arrayBuffer);
        } else {
            console.error('Uploaded file is not a Blob.');
            return new NextResponse(null, { status: 400 });
        }

        await fs.writeFile(tempFilePath, fileBuffer);

        const pdfParser = new (PDFParser as any)(null, 1);
        const textPromise = new Promise((resolve, reject) => {
            pdfParser.on('pdfParser_dataError', (errData: any) => reject(errData.parserError));
            pdfParser.on('pdfParser_dataReady', async () => {
                parsedText = await (pdfParser as any).getRawTextContent();
                resolve(parsedText);
            });
        });

        pdfParser.loadPDF(tempFilePath);

        try {
            const text = await textPromise;
        } catch (error) {
            console.error("Error parsing PDF: ", error);
        }

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `
                    Your task is to identify and format course information into a structured output. Analyze the provided text to extract two key pieces of data: the course code and the course name. Your output should be formatted in a specific way, following this structure:

                    - Each entry must be presented in the format "course code - course name".
                    - Ensure accuracy in identifying and separating the course code from the course name.
                    
                    For clarity, here are examples of the expected output format:
                    
                    CSC108 - Introduction to Computer Programming
                    CSC148 - Introduction to Computer Science
                    CSC207 - Software Design
                    COE328 - Digital Systems
                    Note: The course code (e.g., CSC108) and the course name (e.g., Introduction to Computer Programming) should be accurately extracted and formatted as shown in the examples.
                    `
                },
                { role: "user", content: parsedText },
            ],
            model: "gpt-4-1106-preview",
            max_tokens: 1000,
        });

        extracted = completion.choices[0].message.content as string;
        console.log(extracted);

    } else {
        console.log('Uploaded file is not in the expected format.');
    }

    const response = new NextResponse();
    response.headers.set('Extracted', extracted);
    return response;
}