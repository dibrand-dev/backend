# Example Backend

The example shows a small implementation of a clean architecture. This will allow us to run the project in the desired environment, easily implement tests, versioning, frameworks changes, infrastructure changes, and other benefits.

In the "core" folder we will have the project separated by context, this allows us to identify and modify it quickly.

Then we have the "functions" folder that allows us to execute all our "core", specifically the use cases. In this example we show them as AWS lambdas, but in reality the core can be executed by any other architecture (controllers, instacines, crons, other clouds, etc...).

# Spanish
El ejemplo muestra una pequeña implementacion de una arquitectura limpia. Esto nos permitira ejecutar el proyecto en el entorno que se desee, implementar test facilmente, versionados, cambios de frameworks, cambio de infraestructura, y otros beneficios.

En la carpeta "core" tendremos el proyecto separado por contexto, esto nos permite identificar y modificar rapidamente.

Luego tenemos la carpeta "functions" que nos permite ejecutar todo nuestro "core", expecificamente los casos de uso. En este ejemplo los mostramos como lambdas de AWS, pero en realidad el "core" puede ser ejecutado por cualquier otra arquitectura (controladores,instacinas,crons,otras nubes,etc...). 


## Contribution guidelines

- Maintain a clean architecture (DDD, SOLID, OCP, etc.).
- Communication interfaces must be in snake_case.
- Object Oriented Programming.
- Integration and unit tests.
- Apply slint style guide.

## Spanish
- Mantener Arquitectura limpia (DDD, SOLID, OCP, etc.)
- Las interfaces de comunicación deben ser en snake_case
- Programación Orientada a Objetos.
- Pruebas de integración y unitarias.
- Aplicar guia de estilos de slint.
