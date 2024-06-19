"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import Modal from "@/components/modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PdfUpload = () => {
  const [upload, setUpload] = useState<File | null>(null);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const router = useRouter();
  const user = useAuth(router);

  const uploadPdf = async () => {
    if (upload && user) {
      setIsUploadingPdf(true);
      const formData = new FormData();
      formData.append("file", upload);

      try {
        const response = await fetch("/api/courses", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        const courseInfo = JSON.parse(result.data);
        if (response.ok) {
          const courseData = {
            [courseInfo.courseName]: {
              grading: courseInfo.courseGrading,
              topics: courseInfo.topics,
            },
          };

          const courseRef = doc(db, "courses", user.uid);
          await setDoc(courseRef, courseData, { merge: true });
        } else {
          console.error("Error processing PDF: ", result);
        }
      } catch (error) {
        console.error("Error sending PDF to API: ", error);
      }
    }
    setIsUploadingPdf(false);
  };

  return (
    <div className="w-full flex gap-2">
      <Input
        accept=".pdf"
        className="w-3/4"
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setUpload(e.target.files[0]);
          }
        }}
      />
      <Button className="w-1/4" onClick={uploadPdf}>
        Upload
      </Button>
      <Modal isOpen={isUploadingPdf} handleClose={() => {}}>
        <Card className="flex flex-col items-center bg-card z-40">
          <CardHeader>
            <CardTitle>Uploading Course Outline</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <CardDescription className="text-center">
              Your course outline is being uploaded.
              <br />
              This may take some time.
            </CardDescription>
            <div className="mt-8 w-16 h-16 border-t-2  border-foreground rounded-full animate-spin" />
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default PdfUpload;
