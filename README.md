npx react-native run-android
https://www.oracle.com/java/technologies/downloads/

# GamifiedApp - Setup Guide (Windows)

## 📌 Yêu cầu hệ thống
- Windows 10/11
- Node.js (>= 18)
- Yarn hoặc npm
- Android Studio (SDK, NDK, Emulator)
- JDK 17 (LTS)

---

## 🛠 Checklist cài đặt

### 1. Cài đặt Java JDK
- Tải JDK 17 từ [Adoptium](https://adoptium.net/temurin/releases/?version=17).
- Cài đặt vào `C:\Program Files\Java\jdk-17`.
- Thiết lập biến môi trường:
  - `JAVA_HOME = C:\Program Files\Java\jdk-17`
  - Thêm `%JAVA_HOME%\bin` vào `Path`.
- Kiểm tra:
  ```bash
  java -version

2. Cài đặt Android Studio & SDK
Tải Android Studio từ developer.android.com.

Mở SDK Manager:
Cài NDK (Side by side) → khuyên dùng bản 25.2.9519653 hoặc để Gradle tự cài bản 27.
Đảm bảo emulator đã tạo.

3. Thiết lập biến môi trường Android
ANDROID_HOME = C:\Users\<User>\AppData\Local\Android\Sdk

Thêm vào Path:
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools

4. File local.properties
Trong thư mục android của project:
sdk.dir=C:\\Users\\Admin\\AppData\\Local\\Android\\Sdk

5. Kiểm tra adb
adb version
adb devices

6. Build & chạy app
cd D:\AppGamified\GamifiedApp
npx react-native run-android

✅ Notes
Nếu gặp lỗi Gradle → chạy:
cd android
.\gradlew.bat clean
cd ..
npx react-native run-android

Nếu app không tự mở → vào emulator, tìm app GamifiedApp và mở thủ công.

Metro bundler phải chạy ở port 8081.

# 3. Reset cache
npx react-native start --reset-cache
npx react-native run-android

View → Tool Windows → Logcat (Alt + 6)

# Built test apk
cd android && ./gradlew assembleRelease
app/build/outputs/apk/release/