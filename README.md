ASR Gacha Project
===

ASR gacha project for ASR Class 2017/2 by ปาล์มโบ้ทไง จะใครล่ะ


How to run
---

1. Install ReactJS and other modules by calling `npm install`
2. Setup 2 GStreamer server
2.1 The first server is the normal server using the model provided in this repository. The default host setup is `localhost:8080`. This value can be changed in `src/component/Microphone.js` at variable name `dictate`.
2.2 The second server is the wakeword detector server. Configure the server to use the same model as the first server but set the `acoustic-scale` to `1` in the YAML setting of the server. The default host setup is `localhost:8081`. This value can be changed in `src/component/Microphone.js` at variable name `gowajeeDetector`.
3. Start the program by calling `npm start`




How to use
---

1. After starting the program, the web page will be shown.
2. Allow the web page to access the microphone if required.
3. Server status should be shown as `AVAILABLE`. There are 2 statuses, the first one is for the normal server and the second one is for the wakeword detector.
4. The program can be operated in 2 modes:
4.1 Wakeword mode - This mode can be started by pressing `Begin online` button. After pressing this button, wakeword status should say `RECORDING`. After the server detect the wakeword `โกวาจี` then the status of the normal server will be changed to `RECORDING` instead. After finish saying the command, the command will be executed and the wakeword server status will be back to `RECORDING` again, meaning that it's ready to detect another wakeword.
4.2 Start/Stop mode - To start recording, press the `Start` button (Make sure that you are not in the online mode (wakeword mode) or the program might behave incorrectly). After that, say the command you want and then press the `Stop` button to execute the command.


List of commands available
---
- เปิด <กาชา> [หนึ่ง / สิบ]
- เปิด เอา อาจารย์ [เอกพล / อรรถสิทธิ์ / อติวงศ์]
- เติม เพชร [สิบ / ร้อย / พัน]
- เติม เงิน [สิบ / ร้อย / พัน] บาท
- แสดง หน้า คอลเลคชั่น
- แสดง หน้า กาชา
- [เอา เงิน/ขอ เงิน/กู้ เงิน/ยืม เงิน/ขอ ตัง/ยืม ตัง] อาจารย์ [เอกพล / อรรถสิทธิ์ / อติวงศ์] [สิบ / ร้อย / พัน] บาท
- โกง คอลเลคชั่น
- โกง เอา อาจารย์ [เอกพล / อรรถสิทธิ์ / อติวงศ์]
- โกง เอา [อา / เอส อา / เอ เอส อา]
- [หยุด / ข้าม]


Notes
---
- In wakeword mode, after saying `โกวาจี`, wait until the status of the normal server changed to `RECORDING` before saying the command (This can take short or long time depend on the connection and the wakeword detector performance).
- If the server is in wakeword mode for a long time, there might be some problem with the wakeword detection. Refreshing the web page should help.
- We tried to fix most bugs but there might still be some left. Please do not try to break the application (T\_T). Most bug can be resolved by refreshing the web page or restarting the GStreamer servers.
- Cost for gacha 1 time is 3 gems (or saint quartz or whatever you might call). 10 times cost 30 gems (no discount). If there is not enough gem, you can't pull the gacha (Error is not shown in the application but it is shown in the console log).
- Gems are quite expensive (I can't remember the cost). Money can be less than 0 (This is intended behavior as it shows that you are in dept to somebody).
- There are so many debug messages in the console log. You can look there if you want (but even the developers can't remember what most of them are).