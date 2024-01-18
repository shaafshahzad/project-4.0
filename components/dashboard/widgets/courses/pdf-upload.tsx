"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";

const PdfUpload = () => {
    const [upload, setUpload] = useState<File | null>(null);
    const router = useRouter();
    const user = useAuth(router);

    const uploadPdf = async () => {
        if (upload) {
            const formData = new FormData();
            formData.append("file", upload);

            try {
                const response = await fetch("/api/courses", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                if (response.ok) {
                    console.log("File uploaded successfully");
                } else {
                    console.error("Error processing PDF: ", data);
                }
            } catch (error) {
                console.error("Error sending PDF to API: ", error);
            }
        }
    };

    return (
        <div className="flex justify-between gap-4">
            <Input
                accept=".pdf"
                className="w-3/4 border-2 cursor-pointer"
                type="file"
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        setUpload(e.target.files[0]);
                    }
                }}
            />
            <Button className="w-1/4 h-full border-2" onClick={uploadPdf}>
                Upload
            </Button>
        </div>
    );
};

export default PdfUpload;
