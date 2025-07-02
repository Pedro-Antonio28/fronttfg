# 🎓 LUDUS - Plataforma de Evaluación Académica

**LUDUS** es una plataforma web desarrollada con **Laravel, React y Tailwind** diseñada para realizar evaluaciones digitales serias en entornos educativos como institutos y universidades. Permite gestionar clases, crear exámenes, corregirlos y analizar el rendimiento de los alumnos mediante estadísticas detalladas y gráficos interactivos.

## 📸 Capturas de Pantalla

* *(Añade tus capturas cuando las tengas, por ejemplo)*

  ![Home](https://github.com/user-attachments/assets/31bce987-ae45-4d0f-82af-fb2e43a57da3)
  ![Resultados](https://github.com/user-attachments/assets/e6190042-c884-4cc7-adb2-700d6ddcf2c1)
  ![Examen](https://github.com/user-attachments/assets/082cea90-9d34-41cf-b559-9643ff268383)

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js 16+ y npm**
- Tener backend configurado, enlace backend: https://github.com/Pedro-Antonio28/ludustfg

## 📥 Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

```sh
# 1️⃣ Clonar el repositorio
git clone https://github.com/Alvareitor48/LUDUS-Laravel-React-Tailwind.git
cd ludus

# 2️⃣ Instalar dependencias
npm install

# 3️⃣ Crear archivo de configuración .env y establece la url de la api, ejemplo:

VITE_API_URL=http://ludustfg.test

# 6️⃣ Compilar assets de React
npm run dev
```
## 👥 Roles y Permisos
LUDUS implementa un sistema de roles diferenciado:

Alumno: realiza exámenes y consulta sus resultados.

Profesor: crea clases, asigna exámenes, corrige respuestas y accede a estadísticas detalladas.

Director: gestiona usuarios (alumnos y profesores) y supervisa el rendimiento general de la institución.

## 📊 Características Clave
✅ Registro y login seguro
✅ Creación de clases y asignación de exámenes
✅ Corrección automática y manual
✅ Gráficos interactivos generados con Recharts
✅ Control centralizado del director sobre usuarios y resultados
✅ Estadísticas detalladas para analizar rendimiento individual y grupal

## 🎯 Problema que resuelve
Las plataformas como Kahoot o Quizizz son útiles para juegos o evaluaciones rápidas, pero no permiten una evaluación académica seria. LUDUS ofrece:

Gestión de clases y usuarios.

Roles diferenciados con permisos específicos.

Estadísticas exhaustivas para análisis académico profesional.

## 🛠️ Tecnologías utilizadas
Backend: Laravel 10 + Sanctum

Frontend: React 18 + Tailwind CSS

Base de datos: MySQL

Gráficos: Recharts

🚀 Posibles mejoras futuras
Implementar notificaciones en tiempo real (Pusher/Soketi).

Añadir exportación de resultados en PDF.

Integrar videoconferencia para clases online.

Implementar un sistema de badges/logros para motivar a los alumnos.
