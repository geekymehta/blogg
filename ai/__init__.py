# ai/__init__.py
from .speech_to_text import process_video
from .prompt_generator import generate_prompt_for_prompt 
from .generate_blog import generate_blog

__all__ = ['process_video', 'generate_prompt_for_prompt', 'generate_blog']