'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function SpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      processText(text);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognition);
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const processText = async (text: string) => {
    try {
      const response = await fetch('/api/nlp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to process text');
      }

      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error processing text:', error);
      setResponse('Извините, произошла ошибка при обработке текста');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Голосовой помощник</h1>
        
        <div className="mb-6">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {isListening ? 'Остановить запись' : 'Начать запись'}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Распознанный текст:</h3>
            <p className="p-3 bg-gray-50 rounded-lg min-h-[60px]">
              {transcript || 'Нет текста'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Ответ:</h3>
            <p className="p-3 bg-gray-50 rounded-lg min-h-[60px]">
              {response || 'Нет ответа'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
