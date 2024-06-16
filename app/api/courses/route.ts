import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const uploadedFile = formData.get("file");

	let fileName = "";
	let parsedText = "";
	let extracted = "";

	if (uploadedFile) {
		fileName = uuidv4();

		const tempFilePath = `/tmp/${fileName}.pdf`;

		let fileBuffer: Buffer;
		if (uploadedFile instanceof Blob) {
			const arrayBuffer = await uploadedFile.arrayBuffer();
			fileBuffer = Buffer.from(arrayBuffer);
		} else {
			console.error("Uploaded file is not a Blob.");
			return new NextResponse(null, { status: 400 });
		}

		await fs.writeFile(tempFilePath, fileBuffer);

		const pdfParser = new (PDFParser as any)(null, 1);
		const textPromise = new Promise((resolve, reject) => {
			pdfParser.on("pdfParser_dataError", (errData: any) =>
				reject(errData.parserError)
			);
			pdfParser.on("pdfParser_dataReady", async () => {
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
                    Your assignment involves extracting and organizing comprehensive course information into a structured JSON format. This process requires you to identify three critical elements from the provided text:

                    1. courseName: The name of the course. Should be formatted as 'course code: course title' (e.g., 'CPS109: Introduction to Computer Programming').
                    2. courseGrading: The course's grading scheme, detailing each component (e.g., assignments, exams) along with their respective weights. The weights should just be a number without the percentage sign. If there is a component that contains multiple subcomponents, the weights should be distributed evenly. For example, if a course has 5 labs with a total worth of 10%, each lab should be worth 2%. It should be formatted as Lab #: Lab Weighting (e.g., Lab 1: 2%).
                    3. weeklyTopics: The specific content covered in the course on a weekly basis, formatted as "week number: content".
                    In cases where weekly topics are not clearly discernible or absent from the text, the output should explicitly state "No weekly topics found" under the weeklyTopics key.

                    Your output should be a JSON object with these keys, accurately capturing the details of the course, its grading structure, and the weekly curriculum.

                    For example, if the input text provides the course name, its grading components, and a list of weekly topics, your output should look like this (with hypothetical values for illustration):                
                    For a course with three assignments worth a total of 30%, a midterm worth 30%, and a final exam worth 40%, the JSON should look like this:

                    {
                        "courseName": "CPS109: Introduction to Computer Programming",
                        "courseGrading": {
                          "Midterm Exam" {
                            "weight": "30%"
                            "mark": ""
                          },
                          "Final Exam" {
                              "weight": "40%"
                              "mark": ""
                          },
                          "Assignment 1" {
                              "weight": "10%"
                              "mark": ""
                          },
                          "Assignment 2" {
                              "weight": "10%"
                              "mark": ""
                          },
                          "Assignment 3" {
                              "weight": "10%"
                              "mark": ""
                          } 
                        },
                        "weeklyTopics": {
                          "Week 1": "Basics of Programming, we do this, we do that, etc.",
                          "Week 2": "Control Structures",
                          "Week 3": "Data Structures",
                          // ... continue for each week if available
                        }
                    }
                     
                    However, if weekly topics cannot be properly identified, the JSON should reflect that as follows:

                    {
                        "courseName": "CPS109: Introduction to Computer Programming",
                        "courseGrading": {
                            "Midterm Exam" {
                                "weight": "30%"
                                "mark": ""
                            },
                            "Final Exam" {
                                "weight": "40%"
                                "mark": ""
                            },
                            "Assignment 1" {
                                "weight": "10%"
                                "mark": ""
                            },
                            "Assignment 2" {
                                "weight": "10%"
                                "mark": ""
                            },
                            "Assignment 3" {
                                "weight": "10%"
                                "mark": ""
                            } 
                        },
                        "weeklyTopics": "No weekly topics found"
                    }
                    
                    Note: Pay careful attention to accurately parsing and formatting the course name, grading scheme, and weekly topics (if available).
                    `,
				},
				{ role: "user", content: parsedText },
			],
			model: "gpt-4-1106-preview",
			max_tokens: 1000,
			response_format: { type: "json_object" },
		});

		const extracted = completion.choices[0].message.content;
		return NextResponse.json({ data: extracted, success: true });
	} else {
		console.log("Uploaded file is not in the expected format.");
	}

	return NextResponse.json({ data: extracted, success: true });
}
