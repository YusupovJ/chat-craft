import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSend } from "@/hooks/useSend";

export const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number>(0);
  const audioChunks = useRef<Blob[]>([]);

  const { sendVoice } = useSend();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      analyserRef.current = analyser;
      audioContextRef.current = audioContext;

      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        audioChunks.current = [];
        sendVoice(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      visualize();
    } catch (error) {
      console.error("Ошибка при доступе к микрофону:", error);
    }
  };

  const stopRecording = (): void => {
    setIsRecording(false);
    mediaRecorderRef.current?.stop();
    if (audioContextRef.current?.state !== "closed") audioContextRef.current?.close();

    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animationFrameRef.current);
  };

  const visualize = () => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bufferLength = analyserRef.current.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyserRef.current?.getByteTimeDomainData(dataArray);

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const value = dataArray[i] / 128.0 - 1.0;
        sum += value ** 2;
      }

      const averageAmplitude = Math.sqrt(sum / bufferLength);

      const circleRadius = 15 + averageAmplitude * 350;

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, circleRadius > 25 ? 25 : circleRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(8, 221, 86, 0.2)";
        ctx.fill();
        ctx.closePath();
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 50;
      canvas.height = 50;
    }
  }, []);

  useEffect(() => {
    if (isRecording) {
      document.addEventListener("mouseup", stopRecording);
    }
  }, [isRecording]);

  return (
    <div className="flex flex-col items-center relative overflow-visible z-10">
      <Button
        aria-label="Отправить голосовое сообщение"
        onMouseDown={startRecording}
        className={cn("rounded-full bg-primary p-2 relative z-20 transition-transform", isRecording && "scale-[0.8]")}
      >
        <Mic />
      </Button>

      <canvas ref={canvasRef} className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};
