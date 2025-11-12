// Lấy các biến môi trường từ docker-compose.yml
// 'NEXT_PUBLIC_' là bắt buộc để Next.js đọc được ở client
const FACE_API_URL = process.env.NEXT_PUBLIC_FACE_API_URL || 'http://localhost:8001';
const VISUAL_RAG_API_URL = process.env.NEXT_PUBLIC_VISUAL_RAG_API_URL || 'http://localhost:8003';

// Xuất các biến này để các file khác có thể import
export const API_ENDPOINTS = {
  face: FACE_API_URL,
  visualRag: VISUAL_RAG_API_URL,
};
