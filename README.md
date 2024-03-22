# Example Backend

El ejemplo muestra una pequeña implementacion de una arquitectura limpia. Esto nos permitira ejecutar el proyecto en el entorno que se desee, implementar test facilmente, versionados, cambios de frameworks, cambio de infraestructura, y otros beneficios.

En la carpeta "core" tendremos el proyecto separado por contexto, esto nos permite identificar y modificar rapidamente.

Luego tenemos la carpeta "functions" que nos permite ejecutar todo nuestro "core", expecificamente los casos de uso. En este ejemplo los mostramos como lambdas de AWS, pero en realidad el "core" puede ser ejecutado por cualquier otra arquitectura (controladores,instacinas,crons,otras nubes,etc...). 


## Contribution guidelines

- Mantener Arquitectura limpia (DDD, SOLID, OCP, etc.)
- Las interfaces de comunicación deben ser en snake_case
- Programación Orientada a Objetos.
- Pruebas de integración y unitarias.
- Aplicar guia de estilos de eslint.
