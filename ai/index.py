import sys
from pathlib import Path
from speech_to_text import process_video  
from prompt_generator import generate_prompt_for_prompt
from generate_blog import generate_blog
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    if len(sys.argv) < 2:
        print("Usage: python index.py <youtube_url>")
        return

    youtube_url = sys.argv[1]
    
    # Create output directory
    output_dir = Path("output")
    output_dir.mkdir(exist_ok=True)
    
    # Run speech-to-text
    logger.info("Processing video...")
    process_result = process_video(youtube_url)
    if not process_result:
        logger.error("Failed to process video")
        return
        
    # Read transcript
    logger.info("Reading transcript...")
    transcript_path = process_result.split(": ", 1)[1]
    with open(transcript_path, "r", encoding="utf-8") as f:
        transcript_text = f.read()

    # Generate prompt
    logger.info("Generating blog prompt...")
    prompt = generate_prompt_for_prompt(transcript_text)
    
    # Generate blog
    logger.info("Generating blog...")
    blog_path = generate_blog(prompt, str(output_dir))
    if blog_path:
        logger.info(f"Blog generated successfully at: {blog_path}")
    else:
        logger.error("Failed to generate blog")

if __name__ == "__main__":
    main()