import openai
from fastapi import FastAPI,WebSocket, Request
from pydantic import BaseModel
from contexto import EMPRESA_CONTEXT
from server import ConnectionManager
import os
import json
import re
from typing import Tuple, Optional

#Configuracion de la apikey y clase websocket
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
connection = ConnectionManager()
app = FastAPI()


json_pattern = re.compile(r'---[\s\S]*$')

def split_message(raw):
    """
    return  (texto_visible, json_dict)
    """
    match = json_pattern.search(raw)
    if not match:

        return raw.strip(), None
    
    json_str = match.group(0).strip()
    answer_user = raw[: match.start()].strip()
    return answer_user, json_str

@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            prompt = [
                {"role": "system", "content": EMPRESA_CONTEXT},
                {"role": "user", "content": data}
            ]
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=prompt,
                temperature=0.2,
                max_tokens=400
            )
            answer = response.choices[0].message.content
            answer,json_info=split_message(answer)
            print("JSON --->",json_info)
            await websocket.send_text(answer)
    except Exception as e:
        await websocket.send_text(f"Error: {str(e)}")
        await websocket.close()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8090))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)