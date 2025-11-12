from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"service": "RAG API", "status": "running"}

# (Đây là nơi bạn sẽ thêm logic RAG sau này)
# @app.post("/ask")
# async def ask_rag_endpoint(query: str):
#     # Logic RAG
#     return {"answer": "response_from_rag"}
