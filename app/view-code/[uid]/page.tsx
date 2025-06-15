"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import Constants from "@/data/Constants";
import AppHeader from "@/app/_components/AppHeader";
import SelectionDeatils from "../_components/SelectionDeatils";
import CodeEditor from "../_components/CodeEditor";

export interface RECORD {
  id: number;
  description: string;
  code: any;
  imageUrl: string;
  model: string;
  createdBy: string;
}

function ViewCode() {
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const [codeResp, setCodeResp] = useState("");
  const [record, setRecord] = useState<RECORD | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof uid === "string") {
      GetRecordInfo(uid);
    }
  }, [uid]);

  const GetRecordInfo = async (uid: string) => {
    setLoading(true);

    try {
      const result = await axios.get("/api/wireframe-to-code?uid=" + uid);
      const resp = result?.data;
      setRecord(resp);

      if (resp?.code == null) {
        await GenerateCode(resp);
      } else {
        setCodeResp(resp.code);
        setIsReady(true);
      }

      if (resp?.error) {
        console.log("No Record Found");
      }
    } catch (error) {
      console.error("Error fetching record info:", error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateCode = async (record: RECORD) => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: record?.description + ":" + Constants.PROMPT,
          model: record.model,
          imageUrl: record?.imageUrl,
        }),
      });

      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value);
      }

      // Clean the AI-generated code
      const cleaned = fullText.replace(/```(typescript|javascript)?/g, "").replace(/```/g, "").trim();
      setCodeResp(cleaned);
      setIsReady(true);
      console.log("AI Code:", cleaned);
    } catch (error) {
      console.error("Error generating code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AppHeader hideSideBar={true} />

      <div className="grid grid-cols-1 md:grid-cols-5 p-5">
        <div>
          {/* selection details */}
          <SelectionDeatils record={record} />
        </div>
        <div className="col-span-4">
          {loading ? (
            <div className="flex justify-center items-center h-[600px]">
              <LoaderCircle className="w-8 h-8 animate-spin text-gray-500" />
            </div>
          ) : (
            <CodeEditor codeResp={codeResp} isReady={isReady} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCode;
