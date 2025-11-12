# 1. Chọn image Python gốc (dùng 3.12 nếu bạn muốn)
FROM python:3.12-slim

# 2. Đặt thư mục làm việc
WORKDIR /app

# 3. Cài đặt thư viện
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# 4. Sao chép code API vào
COPY . /app

# 5. Lệnh chạy API
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
