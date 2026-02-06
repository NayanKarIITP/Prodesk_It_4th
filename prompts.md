# Prompt Engineering Strategy

This project uses a **"Context-Injection"** strategy. Instead of relying on the AI to guess the context, we programmatically inject structured data (Resume & Job Description) into a strict logic template.

## The Formula: 60% Human / 40% AI

The quality of the output depends on the structure of the input. I designed the prompt to act as a **function**, where I control the *structure*, and the AI controls the *creative execution*.

### 1. The Engineered Template (My 60%)

This is the hardcoded logic residing in `src/app/api/generate/route.ts`. It establishes Role, Context, and Constraints.

```text
You are an expert career coach. Write a professional cover letter for ${candidateName}.

CONTEXT:
- The candidate is applying for a role described as: "${jobDescription}"
- The candidate's resume text is: "${resumeText}"

INSTRUCTIONS:
- Analyze the resume to find skills that match the job description.
- Write a persuasive, professional cover letter.
- Use HTML formatting for line breaks (<br>) and paragraphs (<p>).
- Keep it concise (approx 300 words).
- Ensure the tone is confident but polite.
