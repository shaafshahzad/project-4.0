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
                    Your objective is to process and structure course-related information into a JSON format. Specifically, you need to extract from the provided text two essential elements: the course name and its grading scheme. Structure your output as a JSON object with the following keys:

                    courseName: The extracted name of the course.
                    courseGrading: The extracted grading scheme of the course, formatted as "assignment name: weighting".
                    Ensure that the data is accurately identified and formatted. The output should adhere to this JSON structure, representing the course details and grading breakdown.
                    
                    For example, if the input text describes a course with its name and various assignments with their weightings, your output should look like this (example values provided for illustration):    
                    
                    {
                        "courseName": "Introduction to Computer Programming",
                        "courseGrading": {
                          "Midterm Exam": "30%",
                          "Final Exam": "40%",
                          "Assignments": "30%"
                        }
                    }

                    Note: Pay close attention to the input text to correctly identify and format the course name and each component of the grading scheme, including assignment names and their respective weightings.
                    `
                },
                { role: "user", content: parsedText },
            ],
            model: "gpt-4-1106-preview",
            max_tokens: 1000,
            response_format: { type: "json_object" },
        });

        const extracted = completion.choices[0].message.content;
        console.log(extracted);

    } else {
        console.log('Uploaded file is not in the expected format.');
    }

    return NextResponse.json({ fileName, parsedText, extracted });
}