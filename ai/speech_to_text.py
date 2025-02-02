import os
import yt_dlp
from groq import Groq
from datetime import datetime

# Constants
AUDIO_DIR = "audio_files"
TRANSCRIPT_DIR = "transcripts"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize Groq client
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is not set")

client = Groq(api_key=GROQ_API_KEY)

def ensure_directories():
    for dir_path in [AUDIO_DIR, TRANSCRIPT_DIR]:
        if not os.path.exists(dir_path):
            os.makedirs(dir_path)

def get_timestamp():
    return datetime.now().strftime("%Y%m%d_%H%M%S")

def extract_video_id(url):
    if "v=" in url:
        return url.split("v=")[1].split("&")[0]
    return url.split("/")[-1]

def download_audio(youtube_url):
    ensure_directories()
    timestamp = get_timestamp()
    
    ydl_opts = {
        'format': 'm4a/bestaudio/best',
        'outtmpl': os.path.join(AUDIO_DIR, f'%(title)s_{timestamp}.%(ext)s'),
        'postprocessors': [],
        'quiet': False,
        'no_warnings': False
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(youtube_url, download=False)
            filename = ydl.prepare_filename(info)
            ydl.download([youtube_url])
            return filename
    except Exception as e:
        print(f"Download error: {str(e)}")
        return None

def save_transcript(text, video_id):
    timestamp = get_timestamp()
    transcript_path = os.path.join(TRANSCRIPT_DIR, f'transcript_{video_id}_{timestamp}.txt')
    
    with open(transcript_path, 'w', encoding='utf-8') as f:
        f.write(text)
    return transcript_path

def transcribe_audio(file_path):
    if not file_path or not os.path.exists(file_path):
        raise ValueError(f"Audio file not found: {file_path}")
    
    try:
        with open(file_path, "rb") as file:
            transcription = client.audio.transcriptions.create(
                file=(file_path, file.read()),
                model="whisper-large-v3",
                response_format="verbose_json"
            )
        return transcription.text
    except Exception as e:
        print(f"Transcription error: {str(e)}")
        return None

def process_video(youtube_url):
    video_id = extract_video_id(youtube_url)
    print(f"Processing video: {video_id}")
    
    audio_file = download_audio(youtube_url)
    if not audio_file:
        return "Failed to download audio"
        
    print(f"Audio downloaded: {audio_file}")
    
    transcript = transcribe_audio(audio_file)
    if not transcript:
        return "Failed to transcribe audio"
        
    transcript_path = save_transcript(transcript, video_id)
    return f"Transcript saved to: {transcript_path}"

if __name__ == "__main__":
    youtube_url = "https://www.youtube.com/watch?v=EJeE9CpHPqc"
    result = process_video(youtube_url)
    print(result)