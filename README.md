🧩 Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

Node.js

live-server

Puedes instalar live-server globalmente con el siguiente comando:

npm install -g live-server

⚙️ Instalación

Clona este repositorio o descarga los archivos del proyecto.

Abre una terminal en el directorio raíz del proyecto.

Ejecuta el siguiente comando para instalar las dependencias de Node:

npm install

🚀 Ejecución del proyecto

En la primera terminal, ejecuta:

live-server


Esto iniciará un servidor local que servirá los archivos del proyecto (HTML, CSS, JS, etc.).

En una segunda terminal, desde el mismo directorio raíz, ejecuta:

node proxy.js


Esto levantará el servidor proxy, que manejará peticiones hacia APIs externas.

💡 Notas

Asegúrate de que ambos procesos (live-server y proxy) estén corriendo simultáneamente.

Si se presenta un error de puerto ocupado, puedes especificar uno distinto al iniciar live-server:

live-server --port=5500


