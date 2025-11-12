from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"service": "Face API", "status": "running"}

# (Đây là nơi bạn sẽ thêm logic AI sau này)
# @app.post("/check_face")
# async def check_face_endpoint():
#     # Logic AI
#     return {"result": "face_detected"}
