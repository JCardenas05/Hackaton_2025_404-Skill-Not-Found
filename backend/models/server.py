from fastapi import WebSocket

class ConnectionManager:
    """Eventos de los sockets"""
    def __init__(self):
        """Iniciar metodos , manter conversacion"""
        self.active_connections = []
    
    async def connect(self, websocket: WebSocket):
        """Conexion al sockert"""
        await websocket.accept()
        self.active_connections.append(websocket)
    def disconnect(self, websocket: WebSocket):
        """disconnect event"""
        self.active_connections.remove(websocket)