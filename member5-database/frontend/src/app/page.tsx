"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Video, PhoneOff } from "lucide-react";
import { db } from "./db";

export default function TelemedicineRoom() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [joined, setJoined] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const newSocket = io("http://127.0.0.1:8000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const saveNoteOffline = async () => {
    if (!noteText.trim()) return;
    
    await db.notes.add({
      patientId: "patient-101",
      doctorNotes: noteText,
      timestamp: new Date().toISOString(),
      synced: navigator.onLine,
    });

    setSaveStatus(navigator.onLine ? "Saved & Synced to Cloud" : "Saved Offline (Will sync when online)");
    setNoteText("");
  };

  const startCall = async () => {
    setJoined(true);
    
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { max: 640 }, height: { max: 480 }, frameRate: { max: 15 } },
      audio: { echoCancellation: true, noiseSuppression: true },
    });

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    peerRef.current = pc;

    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit("signal", { room: "room-1", candidate: event.candidate });
      }
    };

    if (socket) {
      socket.emit("join_room", { room: "room-1" });

      socket.on("signal", async (data) => {
        if (data.sdp) {
          await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
          if (data.sdp.type === "offer") {
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            socket.emit("signal", { room: "room-1", sdp: answer });
          }
        } else if (data.candidate) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("signal", { room: "room-1", sdp: offer });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Telemedicine Video Portal</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mb-6">
        <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 relative h-64 flex items-center justify-center">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs">Patient (You)</span>
        </div>

        <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 relative h-64 flex items-center justify-center">
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs">Doctor</span>
        </div>
      </div>

      {!joined ? (
        <button
          onClick={startCall}
          className="bg-green-600 hover:bg-green-700 font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition mb-6"
        >
          <Video className="w-5 h-5" /> Start Consultation
        </button>
      ) : (
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition mb-6"
        >
          <PhoneOff className="w-5 h-5" /> End Call
        </button>
      )}

      {/* Consultation Notes Section */}
      <div className="w-full max-w-4xl bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h2 className="text-lg font-semibold mb-2">Consultation Notes (Offline Supported)</h2>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Type diagnostic notes or prescriptions..."
          className="w-full h-24 p-2 bg-slate-900 text-white rounded border border-slate-700 mb-2 focus:outline-none focus:border-blue-500"
        />
        <div className="flex justify-between items-center">
          <button
            onClick={saveNoteOffline}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium text-sm transition"
          >
            Save Note
          </button>
          {saveStatus && <span className="text-xs text-green-400">{saveStatus}</span>}
        </div>
      </div>
    </main>
  );
}