# 🧠 AgileGenerator - Plataforma de Generación de Metodologías Ágiles con IA

AgileGenerator es una aplicación que permite a los usuarios crear proyectos y generar automáticamente una metodología ágil personalizada (Scrum, Kanban o híbrida), asistida por inteligencia artificial. Su objetivo es facilitar la estructuración de proyectos desde la idea hasta su ejecución ágil, integrando herramientas visuales como tableros Kanban y un asistente conversacional especializado.

---

## 🚀 Características principales

- Registro e inicio de sesión de usuarios
- Creación de proyectos con formulario guiado
- Generación automática de visión, backlog, estructura ágil y sprints
- Visualización editable del método generado
- Gestión de tareas con tablero Kanban
- Asistente conversacional basado en IA
- Exportación de la metodología en PDF o Markdown

---

## ✅ Requerimientos Funcionales (RF)

### RF01 – Registro e inicio de sesión
- Registro con correo y contraseña
- Futuro soporte para autenticación social (Google, GitHub)

### RF02 – Creación de proyecto
- Campos requeridos:
  - Nombre del proyecto
  - Descripción
  - Objetivo principal
  - Miembros del equipo
  - Tiempo estimado
  - Industria o tipo de proyecto

### RF03 – Generación automática de metodología ágil
- Generación por IA de:
  - Visión del producto
  - Roles sugeridos
  - Backlog inicial con historias de usuario
  - Propuesta de estructura ágil (Scrum, Kanban, híbrido)
  - Plan de sprints sugerido

### RF04 – Visualización del método generado
- Visión general
- Lista editable del backlog
- Tareas agrupadas por sprint

### RF05 – Gestión de tareas con tablero Kanban
- Columnas: To Do, In Progress, Done
- Drag & drop de tareas
- Edición/eliminación de tareas

### RF06 – Edición del backlog y sprint plan
- Modificación de historias de usuario
- Reasignación de tareas entre sprints
- Creación manual de tareas

### RF07 – Asistente de IA
- Chat inteligente para resolver dudas como:
  - “¿Qué hace un Product Owner?”
  - “Reescribe esta historia”
  - “¿Cómo priorizo mi backlog?”

### RF08 – Almacenamiento de proyectos
- Acceso a proyectos anteriores
- Listado, apertura y eliminación

### RF09 – Exportar metodología
- Descarga en PDF o Markdown incluyendo:
  - Visión
  - Backlog
  - Sprints
  - Roles y estructura ágil

---

## 🛡️ Requerimientos No Funcionales (RNF)

### RNF01 – Rendimiento
- Respuestas de la IA en < 3 segundos en condiciones normales

### RNF02 – Seguridad
- Cifrado de datos del usuario
- Protección contra ataques comunes: XSS, CSRF, fuerza bruta

### RNF03 – Escalabilidad
- Soporte a múltiples usuarios simultáneos sin degradar el rendimiento

### RNF04 – Usabilidad
- Interfaz amigable, intuitiva y accesible
- Diseño responsive (mobile-first)

---

## 🧾 Casos de Uso

### CU01 – Registrar Usuario
**Actor**: Usuario  
**Flujo**:
1. Abre la app
2. Selecciona “Registrarse”
3. Ingresa correo y contraseña
4. Se crea la cuenta y accede al panel de proyectos

---

### CU02 – Crear Proyecto y Generar Metodología
**Actor**: Usuario  
**Flujo**:
1. Pulsa “Nuevo Proyecto”
2. Completa el formulario
3. Presiona “Generar”
4. La IA entrega visión, roles, backlog, estructura ágil
5. Usuario edita si lo desea

---

### CU03 – Editar Backlog
**Actor**: Usuario  
**Flujo**:
1. Accede a un proyecto
2. Visualiza historias de usuario
3. Edita nombre, descripción, prioridad
4. Crea o elimina historias

---

### CU04 – Usar el Asistente de IA
**Actor**: Usuario  
**Flujo**:
1. Abre el chat desde cualquier pantalla
2. Escribe dudas sobre metodologías ágiles
3. Recibe respuestas personalizadas según el contexto del proyecto

---

### CU05 – Gestionar tareas en Kanban
**Actor**: Usuario  
**Flujo**:
1. Abre el tablero Kanban del proyecto
2. Visualiza tareas por estado
3. Arrastra tareas entre columnas
4. Marca como terminada o reabre

---

### CU06 – Exportar Proyecto
**Actor**: Usuario  
**Flujo**:
1. Accede a un proyecto
2. Pulsa “Exportar”
3. Elige formato PDF o Markdown
4. Descarga el archivo con todo el contenido del método ágil

---

## 🛠️ Tecnologías sugeridas

- **Frontend**: React / Next.js (Web), React Native (App)
- **Backend**: Node.js con Express
- **Base de datos**: PostgreSQL / MongoDB
- **Autenticación**: JWT + OAuth 2.0 (para login social)
- **IA**: OpenAI API / LLMs personalizados
- **Almacenamiento**: Firebase / AWS S3 (si se requieren archivos)
- **Exportación PDF**: Puppeteer / html-pdf / jsPDF

---

## 📦 Instalación y uso

> ⚠️ Por implementar según stack elegido

---

## 📄 Licencia

MIT © [AndersonRodriguez]