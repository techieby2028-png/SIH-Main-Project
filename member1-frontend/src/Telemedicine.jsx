import { JitsiMeeting } from "@jitsi/react-sdk";

function Telemedicine() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <JitsiMeeting
        domain="meet.jit.si"
        roomName="RuralCareConsultation123"
        configOverwrite={{
          startWithAudioMuted: false,
          startWithVideoMuted: false,
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "600px";
          iframeRef.style.width = "100%";
        }}
      />
    </div>
  );
}

export default Telemedicine;