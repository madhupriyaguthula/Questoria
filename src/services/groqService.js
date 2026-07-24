const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateBossQuestions = async (topic, numQuestions = 5) => {
  try {
    const prompt = `Generate ${numQuestions} quiz questions about ${topic}.
Mix multiple choice and true/false questions.
Respond with ONLY a valid JSON object, no markdown, no code fences, no explanation, no extra text before or after.
Use this exact structure:
{
  "questions": [
    {
      "question": "question text here",
      "type": "multiple_choice",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": "option1"
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      response_format: { type: 'json_object' }
    });

    const responseText = completion.choices[0].message.content;
    const parsed = JSON.parse(responseText);

    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error('Groq response missing valid questions array');
    }

    return parsed.questions;
  } catch (error) {
    console.error('Groq generation error:', error.message);
    throw error;
  }
};

module.exports = { generateBossQuestions };