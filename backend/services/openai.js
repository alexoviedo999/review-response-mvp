const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Generate response for a review
async function generateResponse(review) {
  const systemPrompt = `You are a professional business owner responding to customer reviews. 
Your responses should be:
- Polite and professional
- Personalized to the specific review
- Appropriate length (2-4 sentences)
- Grateful for positive reviews
- Empathetic and solution-focused for negative reviews
- Never defensive or argumentative`;

  let userPrompt;
  
  if (review.rating >= 4) {
    userPrompt = `Write a thank you response for this ${review.rating}-star review for ${review.business_name}:

Author: ${review.author_name}
Rating: ${review.rating}/5
Review: "${review.text || '(No text provided)'}"`;
  } else if (review.rating === 3) {
    userPrompt = `Write a response to this neutral 3-star review for ${review.business_name}. Acknowledge their feedback professionally:

Author: ${review.author_name}
Rating: ${review.rating}/5
Review: "${review.text || '(No text provided)'}"`;
  } else {
    userPrompt = `Write a professional, empathetic response to this ${review.rating}-star review for ${review.business_name}. Apologize for their experience and offer to make it right:

Author: ${review.author_name}
Rating: ${review.rating}/5
Review: "${review.text || '(No text provided)'}"`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 200,
      temperature: 0.7
    });
    
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate response: ' + error.message);
  }
}

// Generate batch responses (for multiple reviews)
async function generateBatchResponses(reviews) {
  const responses = [];
  
  for (const review of reviews) {
    try {
      const response = await generateResponse(review);
      responses.push({ review_id: review.id, response });
    } catch (error) {
      responses.push({ review_id: review.id, error: error.message });
    }
  }
  
  return responses;
}

module.exports = { generateResponse, generateBatchResponses };
