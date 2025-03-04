
### PWA
---
- PWA(Progressive Web App)는 웹 기술(HTML, CSS, JavaScript)을 사용하여 네이티브 앱과 유사한 사용자 경험을 제공하는 웹 애플리케이션입니다.
- 웹 앱이지만 `오프라인 지원`, `푸시 알림`, `홈 화면 추가` 등의 기능을 제공하며 모바일 및 데스크톱에서 네이티브 앱과 유사한 UX를 제공합니다.
<br>

- **PWA의 탄생 배경**
    - 모바일 환경에서의 부족함
    - 웹 기술의 발전
    - 앱 생태계의 다양성
    - `서비스 워커`의 도입
    - 앱과 웹의 경계 허물기
<br>

- **PWA를 알아야 하는 이유**
    - **네이티브 앱 수준의 모바일 친화적 웹 개발 가능**
        - 고전적인 웹 개발 방법으로는 네이티브 앱과 달리 푸시 알림을 보내거나 오프라인 상태에서 동작하는 기능 자체를 제공하지 않는데 모든 기능을 제공하지는 않지만 `PWA`를 사용하여 유사한 경험을 제공하는 것이 가능해진다.
    - **네이티브 앱을 공부하지 않아도 동등한 수준으로 개발 가능**
        - 프론트엔드 개발자 관점에서 PWA는 네이티브 앱 개발에 비해 러닝 커브가 훨씬 낮기 때문에 PWA를 학습하면 안드로이드, iOS 등 다양한 플랫폼에 대해 하나의 코드베이스로 적용이 가능해진다.
<br>

- **장점**
    - **빠른 개발 & 유지 보수**
        - HTML, CSS, JavaScript로 개발이 가능하여 네이티브 앱보다 개발 속도가 빠르고 유지보수가 용이하다.
    - **멀티 플랫폼 지원**
        - 한 번 개발하면 iOS, Android, 데스크톱 등에서 동일한 환경 제공이 가능하다.
    - **앱 스토어 등록 불필요**
        - 별도의 마켓 심사 없이 배포가 가능하여 즉각적인 업데이트가 가능하다.
    - **오프라인 지원**
        - `서비스 워커(Service Worker)`를 이용해 네트워크가 끊겨도 기본적인 기능 유지가 가능하다.
    - **푸시 알림 지원**
        - 웹 푸시 API를 활용해 사용자에게 알림 전송이 가능하다.
- **단점**
    - **제한적인 네이티브 기능 접근**
        - 블루투스, NFC, 지문 인식 등 일부 하드웨어 기능을 완전히 활용하기는 어렵다.
    - **성능 제한**
        - 네이티브 앱보다는 성능이 다소 떨어질 수 있다.
    - **iOS 지원 한계**
        - 애플이 PWA 기능을 완전히 지원하지 않아 iOS에서는 일부 기능이 제한 될 수 있다.
        (ex: 백그라운드 푸시 알림 지원 제한(iOS 16.4버전 부터는 지원))
<br>

- **PWA는 어떻게 학습하면 좋을까?**
    - Google PWA 학습 가이드
    - Github PWA-Builder
    - PWA Summit
<br>

### PWA 적용하기
---

- **PWA를 위해 공부해야 할 개념**
    - **서비스 워커(Service Worker)**
        - `백그라운드`에서 실행되며 캐싱, 푸시 알림 등을 처리하는 스크립트
    - **웹 매니페스트(Web App Manifest)**
        - 앱의 이름, 아이콘, 시작 URL 등을 정의하는 JSON 파일
    - **캐싱(Cache Storage) 및 오프라인 지원**
        - PWA의 핵심 요소로, 데이터를 로컬에 저장하여 네트워크 없이도 동작하도록 함
    - **HTTPS 보안 적용**
        - PWA는 `HTTPS` 환경에서만 동작하므로 HTTPS 적용 필수
<br>

- **CRA에서 PWA 설정하기**
    - `CRA(Create React App)`는 기본적으로 PWA 지원을 포함한다.
        
        ```
        npx create-react-app my-app --template cra-template-pwa
        cd my-app
        npm start
        ```
        
    - **PWA 기능 활성화(서비스 워커 등록)**
        - 기본적으로 `src/service-worker.js`가 존재하며, 이를 등록하여 PWA 기능을 활성화할 수 있음.
            
            ```jsx
            import React from 'react';
            import ReactDOM from 'react-dom';
            import App from './App';
            import * as serviceWorkerRegistration from './serviceWorkerRegistration';
            
            ReactDOM.render(
              <React.StrictMode>
                <App />
              </React.StrictMode>,
              document.getElementById('root')
            );
            
            // 서비스 워커 활성화
            serviceWorkerRegistration.register();
            
            ```
            
    - **웹 매니페스트 파일 수정**
        - PWA가 올바르게 동작하려면 `public/manifest.json`을 수정해야 한다.
            
            ```json
            {
              "short_name": "MyPWA",
              "name": "My Progressive Web App",
              "icons": [
                {
                  "src": "/icons/icon-192x192.png",
                  "type": "image/png",
                  "sizes": "192x192"
                },
                {
                  "src": "/icons/icon-512x512.png",
                  "type": "image/png",
                  "sizes": "512x512"
                }
              ],
              "start_url": "/",
              "background_color": "#ffffff",
              "display": "standalone",
              "theme_color": "#000000"
            }
            ```
            
    - **캐싱 전략 적용**
        - 서비스 워커에서 `네트워크가 끊겨도 동작`할 수 있도록 캐싱 전략을 적용할 수 있다.
            
            ```jsx
            self.addEventListener('install', (event) => {
              event.waitUntil(
                caches.open('pwa-cache').then((cache) => {
                  return cache.addAll([
                    '/',
                    '/index.html',
                    '/static/js/bundle.js',
                    '/static/css/main.css',
                    '/icons/icon-192x192.png'
                  ]);
                })
              );
            });
            
            self.addEventListener('fetch', (event) => {
              event.respondWith(
                caches.match(event.request).then((response) => {
                  return response || fetch(event.request);
                })
              );
            });
            
            ```
<br>

- **Vite에서 PWA 설정하기**
    - Vite 프로젝트에서 PWA 기능을 추가하려면 패키지를 설치해야 한다.
        
        ```jsx
        npm install vite-plugin-pwa
        ```
        
    - `vite.config.js`에서 PWA 플러그인을 설정한다.
        
        ```jsx
        import { defineConfig } from 'vite';
        import react from '@vitejs/plugin-react';
        import { VitePWA } from 'vite-plugin-pwa';
        
        export default defineConfig({
          plugins: [
            react(),
            VitePWA({
              registerType: 'autoUpdate', // 자동 업데이트 설정
              includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
              manifest: {
                name: 'My Vite PWA',
                short_name: 'VitePWA',
                description: 'A Vite-powered PWA App',
                theme_color: '#ffffff',
                icons: [
                  {
                    src: '/icons/icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                  },
                  {
                    src: '/icons/icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png'
                  }
                ]
              },
              workbox: {
                runtimeCaching: [
                  {
                    urlPattern: /^https:\/\/my-api\.com\/.*/,
                    handler: 'NetworkFirst',
                    options: {
                      cacheName: 'api-cache',
                      expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 60 * 60 * 24 // 1일
                      }
                    }
                  }
                ]
              }
            })
          ]
        });
        
        ```
        
    - **서비스 워커 활성화**
        
        ```jsx
        import React from 'react';
        import ReactDOM from 'react-dom';
        import App from './App';
        import { registerSW } from 'virtual:pwa-register';
        
        const updateSW = registerSW({
          onNeedRefresh() {
            if (confirm('새 버전이 있습니다. 페이지를 새로고침할까요?')) {
              updateSW(true);
            }
          },
          onOfflineReady() {
            console.log('PWA가 오프라인에서도 동작할 준비가 되었습니다.');
          }
        });
        
        ReactDOM.createRoot(document.getElementById('root')).render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
        
        ```
<br>     
    
### 출처
---
- [https://yozm.wishket.com/magazine/detail/1969/](https://yozm.wishket.com/magazine/detail/1969/)
- [https://wevus.net/it/it_terminology/pwa_progressive_web_apps란_사이트를어플화하는방법/](https://wevus.net/it/it_terminology/pwa_progressive_web_apps%EB%9E%80_%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%A5%BC%EC%96%B4%ED%94%8C%ED%99%94%ED%95%98%EB%8A%94%EB%B0%A9%EB%B2%95/)
