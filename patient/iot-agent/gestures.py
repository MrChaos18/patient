import cv2
import requests
import time

BACKEND_URL = "http://localhost:8080/api/alerts"  # adjust if your backend runs elsewhere

def send_dummy_alert():
    payload = {
        "roomNumber": 1,
        "patientName": "Dummy Patient",   # ✅ required by schema
        "type": "info",                   # ✅ must match enum (critical | warning | info)
        "message": "Dummy alert triggered from laptop webcam",
    }
    try:
        res = requests.post(BACKEND_URL, json=payload)
        res.raise_for_status()
        print("✅ Alert sent:", res.json())
    except Exception as e:
        print("❌ Backend error:", e)

def main():
    cap = cv2.VideoCapture(0)
    print("Press 'a' to send a dummy alert, 'q' to quit.")

    while True:
        ret, frame = cap.read()
        cv2.imshow("Laptop Camera", frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord("a"):
            send_dummy_alert()
        elif key == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
