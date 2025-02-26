# Blog Post Manager

## Descripción

Sitio web donde muestran y gestionan posts de usuario utilizando Angular Material with RxJS + NgRX + ngCharts.

## Funcionalidades

- Autenticación, formularios reactivo para login, profile y registro de usuarios
- Guards para mostrar el contenido para usuarios autenticados
- Listado de posts con funcionalidad para apoyar loso posts con "Like" y "Dislike".
- Gestión CRUD de Posts por id de usuario con tablas, formulario reactivo y validaciones.
- Gestión CRUD de Categorias de Post por id de usuario con tablas, formulario reactivo y validaciones.
- Utilzación de gráficas para mostrar al usuario autenicado las estadísticas "like" y "dislike" de los post del usuario.
- Utilización de componentes anidados.
- Despligue de una API REST realizada con nestjs y utilización de base de datos PostgreSQL
  
**Autor:** Omar Hevia Arbana
**Fecha:** Enero 2025

---

# Blog Post Manager

## Description

Website where user posts are displayed and managed using Angular Material with RxJS + NgRX + ngCharts.

## Functionalities

- Authentication, reactive forms for login, profile, and user registration.
- Guards to display content for authenticated users.
- List of posts with functionality to "Like" and "Dislike" the posts.
- CRUD management of posts by user ID with tables, reactive form, and validations.
- CRUD management of post categories by user ID with tables, reactive form, and validations.
- Use of charts to display statistics of "like" and "dislike" for the user's posts.
- Use of nested components.
- Deployment of a REST API built with NestJS and utilization of a PostgreSQL database.

**Author:** Omar Hevia Arbana
**Date:** Enero 2025

---

## Requirements
`npm install` = node version -> 15.14.0



## Development server
[Node.js](http://nodejs.org/) >= 18.x

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
