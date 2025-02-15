# Example of a "prompt-generating prompt" for DeepSeek R1

from groq import Groq
import os

GROQ_API_KEY = os.getenv("GROQ_API_KEY")


def generate_prompt_for_prompt(transcript):
    prompt = f"""
    You are an AI specialized in transforming transcripts into high-quality, engaging blog prompts.

    Instructions:
    1. Read the transcript below.
    2. Generate an outline for a new blog (proposed sections, headings, and any special formatting).
    3. Formulate a final prompt that will guide another language model to create a blog post with a natural, human-like style. 
    4. The blog post content should not copy the transcript verbatim but should present the information in a structured, readable, and creative way.
    5. If there are any key points, interesting facts, or engaging questions in the transcript, highlight them in the blog outline.
    6. If there are any specific keywords or phrases that should be included in the blog post, mention them in the final prompt.
    7. If there are any additional peice of information that will be engaging and relevant to the blog post, then the blog generating model should include them in the blog post. Real Life examples, case studies, and statistics are some examples of such information.

    TRANSCRIPT:
    {transcript}
    """
    # Usage:
    client = Groq()

    full_response = ""
    
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.6,
        max_completion_tokens=4096,
        top_p=0.95,
        stream=True,
        stop=None,
    )

    # Collect all chunks
    for chunk in completion:
        if chunk.choices[0].delta.content:
            full_response += chunk.choices[0].delta.content
    
    return full_response