import openai
import os
import httpx
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query
from textblob import TextBlob
import jwt
from datetime import datetime
import json
from server import ConnectionManager
from context import EMPRESA_CONTEXT
from dotenv import load_dotenv
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY", "OPENAI_API_KEY"))
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")
SUPABASE_JWT_ALGORITHM = "HS256"
SUPABASE_TABLE = "conversaciones"
app = FastAPI()

conversations = {}
print(SUPABASE_URL,SUPABASE_API_KEY,os.getenv("OPENAI_API_KEY", "OPENAI_API_KEY"))
async def get_main_topic(historial):
    user_messages = " ".join([m[6:] for m in historial if m.startswith("User: ")])
    prompt = [
        {"role": "system", "content": "Eres un analista. Resume en una sola frase el tema principal de esta conversación:"},
        {"role": "user", "content": user_messages}
    ]
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=prompt,
            temperature=0.0,
            max_tokens=80
        )
        topic = response.choices[0].message.content.strip()
    except Exception:
        topic = "No fue posible identificar el tema"
    return topic

async def sent_info_database(user_id: str, historial: list, inicio: str, fin: str):
    mensajes_usuario = [m[6:] for m in historial if m.startswith("User: ")]
    if mensajes_usuario:
        scores = [TextBlob(m).sentiment.polarity for m in mensajes_usuario]
        avg_score = sum(scores) / len(scores)
        sentimiento = (
            "positivo" if avg_score > 0.1 else "negativo" if avg_score < -0.1 else "neutral"
        )
    else:
        avg_score, sentimiento = 0, "neutral"

    # Obtener tema principal
    tema_principal = await get_main_topic(historial)

    data = {
        "usuario_id": user_id,
        "sentimiento_global": sentimiento,
        "puntaje_sentimiento": avg_score,
        "inicio": inicio,
        "fin": fin,
        "tema_principal": tema_principal,
    }
    url = f"{SUPABASE_URL}/rest/v1/{SUPABASE_TABLE}"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, headers=headers, json=data)
        resp.raise_for_status()

@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket, token):
    user_id=token
    await websocket.accept()
    conversations.setdefault(user_id, [])
    inicio = datetime.utcnow().isoformat()
    try:
        while True:
            data = await websocket.receive_text()
            conversations[user_id].append(f"User: {data}")
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
            print(answer)
            conversations[user_id].append(f"Bot: {answer}")
            await websocket.send_text(answer)
    except WebSocketDisconnect:
        historial = conversations.get(user_id, [])
        fin = datetime.utcnow().isoformat()
        await sent_info_database(user_id, historial, inicio, fin)
        conversations.pop(user_id, None)
    except Exception as e:
        await websocket.send_text(f"Error: {str(e)}")
        await websocket.close()
