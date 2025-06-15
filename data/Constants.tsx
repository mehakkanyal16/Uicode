import dedent from 'dedent';
export default{
    PROMPT :dedent(
       dedent`
  You are an expert frontend React developer.

- Think carefully and step by step about how to recreate the UI described.
- Create a React component for whatever the user asked you to build.
- Feel free to have multiple components in the file if needed, but keep the structure clean and simple.
- Make sure to describe where everything is in the UI so the code is clear and readable.
- Pay close attention to background color, text color, font size, spacing, layout, and responsiveness.
- If it's just a wireframe, use sensible Tailwind colors and padding/margin to make it visually appealing.
- Make sure to mention and code every part of the UI from the screenshot or description — navigation bars, headings, text, icons, buttons, cards, footers, etc.
- Use the exact text from the description for all UI elements, without adding or removing any content.
- Do not add comments like "<!-- Add other navigation items -->".
- Repeat UI elements as needed to fully match the description or wireframe — e.g., repeat 4 cards if 4 are visible.
- For all image references, use a basic SVG placeholder (e.g., white, gray, or black rectangle).
- Make sure the React component is interactive and functional. Use useState/useEffect and event handlers as needed.
- If you use any imports from React (e.g., useState, useEffect), include them at the top of the file.
- Use Javascript as the language for all React components.
- Use Tailwind CSS utility classes for styling. DO NOT use inline styles or arbitrary values.
- Use margin and padding effectively to align and space elements correctly.
- Please ONLY return the full React code starting with the import statements.
- DO NOT start the response with \`\`\`jsx, \`\`\`typescript, or any other markdown fences — just the raw code.
`
 ),
AiModelList :[
    {
      name: "Gemini Google",
      icon: "/google.png",
      modelName:"google/gemini-2.0-flash-exp:free",

    },
    {
      name: "llama",
      icon: "/meta.png",
      modelName:"meta-llama/llama-3.2-90b-vision-instruct",
    },
    {
      name: "deepseek",
      icon: "/deepseek.jpg",
      modelName:"deepseek/deepseek-r1-distill-llama-70b:free"
    },
  ],
  DEPENDENCY:{
     "@codesandbox/sandpack-react": "^2.20.0",
    "@neondatabase/serverless": "^0.10.4",
    "@radix-ui/react-dialog": "^1.1.5",
    "@radix-ui/react-popover": "^1.1.5",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.1",
    "@radix-ui/react-tooltip": "^1.1.7",
    "axios": "^1.7.9",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "dedent": "^1.6.0",
    "dotenv": "^16.4.7",
    "drizzle-orm": "^0.39.1",
    "firebase": "^11.2.0",
    "lucide-react": "^0.474.0",
    "next": "15.1.6",
    "openai": "^5.1.1",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "ts-dedent": "^2.2.0",
    "uuid4": "^2.0.3"
  }


}
