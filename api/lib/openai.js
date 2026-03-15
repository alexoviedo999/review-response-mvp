const OpenAI = require('openai');

// Check if OpenAI is configured
function isOpenAIConfigured() {
  return !!process.env.OPENAI_API_KEY;
}

const openai = isOpenAIConfigured() ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

// Mock response generator
function generateMockResponse(review) {
  const { rating, author_name, business_name, text } = review;
  
  if (rating >= 4) {
    const templates = [
      `Thank you so much for the wonderful review, ${author_name}! We're thrilled to hear you enjoyed your experience at ${business_name}. We look forward to seeing you again soon!`,
      `We really appreciate your ${rating}-star review, ${author_name}! It means a lot to us that you took the time to share your experience. See you next time!`,
      `Thank you, ${author_name}! Your kind words about ${business_name} made our day. We're so glad you had a great experience!`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  } else if (rating === 3) {
    return `Thank you for your honest feedback, ${author_name}. We appreciate you taking the time to share your experience at ${business_name}. We're always looking to improve and would love to hear more about how we can make your next visit even better.`;
  } else {
    return `We're sorry to hear about your experience, ${author_name}. At ${business_name}, we strive to provide excellent service to every customer. Please reach out to us directly so we can make this right. Your feedback helps us improve.`;
  }
}

// Generate response for a review
async function generateResponse(review) {
  // Use mock if OpenAI not configured
  if (!isOpenAIConfigured()) {
    console.log('OpenAI not configured, using mock response');
    return generateMockResponse(review);
  }

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
    console.error('OpenAI API error:', error.message);
    // Fall back to mock on error
    console.log('Falling back to mock response');
    return generateMockResponse(review);
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

module.exports = { generateResponse, generateBatchResponses, isOpenAIConfigured, generateMockResponse };
