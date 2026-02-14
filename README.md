# 🌿 EcoTrack | Sistema de Gestión de Inventarios Inteligente

** EcoTrack** es una solución Full-Stack diseñada para optimizar el control de almacenes, enfocándose en la reducción de desperdicios mediante un sistema avanzado de alertas de stock y vencimientos de lotes.

## Funcionalidades Clave

* ** Gestión de Inventario Real-Time:** Control total de productos y categorías con cálculo de stock total automatizado.
* ** Control por Lotes:** Registro detallado de entradas (lotes) vinculados a productos específicos.
* ** Sistema de Alertas Dinámico:**
    * **Stock Bajo:** Notificación visual inmediata cuando un producto cae por debajo de 5 unidades.
    * **Vencimientos Próximos:** Rastreo de lotes que caducan en los próximos 7 días.
* ** Filtrado Inteligente:** Vistas especializadas para navegar entre productos críticos y lotes por vencer desde el Dashboard.

---

##  Stack Tecnológico

### Backend
* **Java 17** con **Spring Boot**
* **Spring Data JPA** para la persistencia
* **MySQL** como base de datos relacional
* **Arquitectura DTO** para optimización de transferencia de datos

### Frontend
* **React 18** (Vite)
* **Tailwind CSS** para un diseño moderno y responsive
* **React Router DOM** para navegación SPA
* **Hooks Personalizados** para lógica desacoplada

---

##  Arquitectura del Proyecto

El sistema utiliza una separación clara de responsabilidades:
- **Backend:** Procesa la lógica de negocio (como el cálculo de días para vencimiento) y expone una API REST.
- **Frontend:** Consume la API y gestiona el estado de forma eficiente, permitiendo una experiencia de usuario fluida.

---

##  Instalación y Configuración

### Requisitos previos
* JDK 17+
* Node.js 18+
* MySQL Server

### Pasos para ejecutar
1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Hellscythe26/EcoTrack.git](https://github.com/tu-usuario/EcoTrack.git)
