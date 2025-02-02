import os
from pathlib import Path
from datetime import datetime
from groq import Groq
import logging

logger = logging.getLogger(__name__)

def generate_blog(prompt: str, output_dir: str) -> str:
    """Generate blog content using LLM and save to file"""
    try:
        logger.info("Initializing Groq client...")
        client = Groq(api_key=os.getenv("GROQ_API_KEY")) 
        
        logger.info("Making API call to generate blog...")
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=4096,
            stream=False
        )
        
        blog_content = completion.choices[0].message.content
        
        # Create output directory if it doesn't exist
        output_dir = Path(output_dir)
        output_dir.mkdir(exist_ok=True)
        
        # Generate output filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_path = output_dir / f"blog_{timestamp}.md"
        
        # Save blog content
        logger.info(f"Saving blog to {output_path}")
        output_path.write_text(blog_content, encoding="utf-8")
        
        return str(output_path)
        
    except Exception as e:
        logger.error(f"Error generating blog: {e}")
        return None