import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { aquaBlue } from "@codesandbox/sandpack-themes";
import Constants from "@/data/Constants";

interface CodeEditorProps {
  codeResp: string;
  isReady: boolean;
}

function CodeEditor({ codeResp, isReady }: CodeEditorProps) {
  const isValidCode = codeResp && codeResp.trim().length > 0;

  return (
    <div>
      {isReady && isValidCode ? (
        <Sandpack
          template="react"
          theme={aquaBlue}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
            showNavigator: true,
            showTabs: true,
            editorHeight: 600,
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDENCY,
            },
          }}
          files={{
            "/App.js": codeResp,
          }}
        />
      ) : (
        <div className="flex justify-center items-center h-[600px] text-gray-500">
          Loading AI-generated code...
        </div>
      )}
    </div>
  );
}

export default CodeEditor;
