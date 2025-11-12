'use client';

import { useState, useRef, useEffect } from 'react';
import { API_ENDPOINTS } from '@/lib/apiConfig';
import styles from './chat.module.css';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setSessionId('web_' + Date.now());
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || !input.trim() || !sessionId) return;

    const userQuestion = input;
    setMessages(prev => [...prev, { type: 'user', content: userQuestion }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_ENDPOINTS.visualRag}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userQuestion,
          session_id: sessionId
        }),
      });

      if (!response.ok) throw new Error(`Lỗi API: ${response.statusText}`);

      // Xử lý SSE streaming
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';
      
      // Thêm message rỗng cho AI để update dần
      const aiMessageIndex = messages.length + 1;
      setMessages(prev => [...prev, { type: 'ai', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6); // Bỏ "data: "
            
            if (data === '[DONE]') {
              break;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                aiResponse += parsed.content;
                // Update message theo thời gian thực
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[aiMessageIndex] = { type: 'ai', content: aiResponse };
                  return newMessages;
                });
              }
            } catch (parseError) {
              console.warn('Không thể parse chunk:', data);
            }
          }
        }
      }

    } catch (error) {
      console.error("Lỗi khi gọi API chat:", error);
      setMessages(prev => [...prev, { type: 'ai', content: 'Xin lỗi, tôi gặp lỗi khi xử lý câu hỏi của bạn.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatPageContainer}>
      <div className={styles.chatContainer}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>🏥</div>
          <h1>Chatbot Y Tế</h1>
          {sessionId && <p>Session ID: {sessionId}</p>}
        </div>

        <div className={styles.messagesArea}>
          {messages.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>💬</div>
              <p>Xin chào! Tôi có thể giúp gì cho bạn?</p>
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${msg.type === 'user' ? styles.userMessage : styles.aiMessage}`}>
              <div className={styles.avatar}>
                {msg.type === 'user' ? '👤' : '🤖'}
              </div>
              <div className={styles.bubble}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.message} ${styles.aiMessage}`}>
              <div className={styles.avatar}>🤖</div>
              <div className={styles.bubble}>
                <div className={styles.typing}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputArea}>
          <form onSubmit={handleChatSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              className={styles.chatInput}
              disabled={isLoading}
            />
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? '⏳' : '📤'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}