import Constants from "@/data/Constants";
import { NextRequest } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_AI_API_KEY,
//   defaultHeaders: {
//     "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
//     "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
//   },
});
export async function POST(req:NextRequest){
  const {model,description,imageUrl}=await req.json();
  const ModelObj=Constants.AiModelList.find(item=>item.name==model);
  const modelName=ModelObj?.modelName;
  console.log(modelName);



    const response = await openai.chat.completions.create({
    model: modelName??"google/gemini-2.0-flash-exp:free",
    stream:true,
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": description
          },
          {
            "type": "image_url",
            "image_url": {
              "url": imageUrl
            }
          }
        ]
      }
    ],
    
  });
  //create a readable stream to send data in real-time
  const stream=new ReadableStream({
    async start(controller){
      for await (const chunk of response){
        const text=chunk.choices?.[0]?.delta?.content||"";
        controller.enqueue(new TextEncoder().encode(text));//send data chunk
      }
      controller.close();//end stream
    },
  });
  return new Response(stream,{
    headers:{
      "Content-Type":"text/plain; charset=utf-8",

    }
  })





}