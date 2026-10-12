"use client";

import { useEffect, useRef, useState } from "react";

/** Minimal draw-to-sign canvas; writes a PNG data URL into a hidden input (replaces jquery.signaturepad). */
export default function SignaturePad({ name }: { name: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const drawing = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0E035B";

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const down = (e: PointerEvent) => {
      drawing.current = true;
      const p = pos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drawing.current) return;
      const p = pos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      setHasInk(true);
    };
    const up = () => {
      if (!drawing.current) return;
      drawing.current = false;
      if (inputRef.current) inputRef.current.value = canvas.toDataURL("image/png");
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointerleave", up);

    const form = canvas.closest("form");
    const reset = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (inputRef.current) inputRef.current.value = "";
      setHasInk(false);
    };
    form?.addEventListener("vimtc:reset", reset);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointerleave", up);
      form?.removeEventListener("vimtc:reset", reset);
    };
  }, []);

  const clear = () => {
    const canvas = canvasRef.current!;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    if (inputRef.current) inputRef.current.value = "";
    setHasInk(false);
  };

  return (
    <div>
      <canvas ref={canvasRef} className="signature" aria-label="Signature pad: draw your signature" />
      <input ref={inputRef} type="hidden" name={name} />
      <div className="signature_tools">
        <span>{hasInk ? "Signature captured." : "Draw your signature above."}</span>
        <button type="button" onClick={clear}>
          Clear
        </button>
      </div>
    </div>
  );
}
