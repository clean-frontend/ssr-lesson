import { NextResponse } from 'next/server';
import { NlpManager } from 'node-nlp';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const nlpManager = new NlpManager({ languages: ['ru'] });

// Train the NLP model
async function trainModel() {
  nlpManager.addDocument('ru', 'привет', 'greeting');
  nlpManager.addDocument('ru', 'как дела', 'how_are_you');
  
  nlpManager.addAnswer('ru', 'greeting', 'Здравствуйте! Чем могу помочь?');
  nlpManager.addAnswer('ru', 'how_are_you', 'У меня все хорошо, спасибо!');

  await nlpManager.train();
}

// Train the model when the API route is first loaded
trainModel();

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    // Process the text with NLP
    const result = await nlpManager.process('ru', text);
    const response = result.answer || 'Извините, я не понял вопрос';

    // Save to database
    await prisma.conversation.create({
      data: {
        input: text,
        response,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error processing text:', error);
    return NextResponse.json(
      { error: 'Failed to process text' },
      { status: 500 }
    );
  }
}
