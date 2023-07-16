# hablabarrio-api

## Apis

1. [Catalogs](#Catalogs)

   - [categoryGetAll](#categoryGetAll)
   - [incidentGetAll](#incidentGetAll)

2. [Users](#Users)

   - [SignUp](#SignUp)
   - [SignIn](#SignIn)
   - [incidentCreate](#incidentCreate)
     
3. [Admin](#Admin)


### Catalogs

#### incidentGetAll
API : [http://localhost:3000/catalog/incident/getall](http://localhost:3000/catalog/incident/getall)

METHOD: GET

DESCRIPTION: Se obtiene todos los incidentes.

RESPONSE: 

- Case 1: Se crea el incidente exitosamente
  
```
{
	"status": "ok",
	"data": [
		{
			"idincident": 48,
			"idprofile": 1,
			"idcategory": 1,
			"title": "Contenedores de basura llenos y mal olor",
			"description": "El carro recolector no pasa por la zona de guardia civil , por lo que los contenedores tienen demasiada basura , tanto que ya no hay lugar donde poner",
			"ubication": "Perú, Paucarpata, Avenida Guardia Civil Cuadra 1",
			"date": "2023-07-07T02:56:39.786Z",
			"state": "En proceso",
			"latitud": "",
			"longitud": "",
			"namecategory": "Limpieza pública"
		},
		{
			"idincident": 50,
			"idprofile": 1,
			"idcategory": 1,
			"title": "",
			"description": "",
			"ubication": "Perú, Paucarpata, Calle Eduardo Carbajal Cuadra 2",
			"date": "2023-07-07T02:57:56.173Z",
			"state": "En proceso",
			"latitud": "",
			"longitud": "",
			"namecategory": "Limpieza pública"
		},
	]
}
```

- Case 2: Si ha ocurrido algun error

``` javascript
{
	"status": "err",
	"data": null
}
```

 
### Users

#### SignUp

API : [http://localhost:3000/users/signup](http://localhost:3000/users/signup)

METHOD: POST

DESCRIPTION: Un usuario se registra.

REQUEST:

```javascript
{
  "names" : varchar(50) NOT NULL,
  "surnames" : varchar(50) NOT NULL,
  "dni" : varchar(8) NOT NULL,
  "mobile" : varchar(9) NOT NULL,
  "email" : varchar(150) NOT NULL unique,
  "password" : varchar NOT NULL
}
```

RESPONSE:
Case 1: Registro con éxito

```javascript
{
	"status": "ok",
	"msg": "Se registro con éxito",
	"data": {
		"idprofile": int,
    "names" : varchar(50) NOT NULL,
    "surnames" : varchar(50) NOT NULL,
    "dni" : varchar(8) NOT NULL,
    "mobile" : varchar(9) NOT NULL,
    "email" : varchar(150) NOT NULL unique,
    "password" : varchar NOT NULL
	}
}
```

Case 2: Si no se ingresa el correo o la contraseña

```javascript
{
	"status": "err",
	"msg": "No ha ingresado correo o contraseña",
	"data": null
}
```

Case 3: Si ha ocurrido algún error al insertar en la tabla login

```javascript
{
	"status": "err",
	"msg": "No se registro con éxito",
	"data": null
}
```

Case 4: Si ingresa un email ya registrado

```javascript
{
	"status": "err",
	"msg": "El email ingresado ya ha sido registrado",
	"data": null
}
```


Case 5: Si ingresa un DNI ya registrado

```javascript
{
	"status": "err",
	"msg": "El Dni ingresado ya ha sido registrado",
	"data": null
}
```
#### SignIn

API: `http://localhost:3000/users/signin`

METHOD: POST

DESCRIPTION: El usuario se loguea

REQUEST:

```javascript
{
	"email" : varchar(150),
	"password" : varchar(100)
}
```

RESPONSE:

- Case 1: Logueo exitoso

```javascript
{
	"status": "ok",
	"msg": "Autentificación exitosa",
	"data": {
		"token": varchar encypted
	}
}
```

- Case 2: Email incorrecto

```javascript
{
	"status": "err",
	"msg": "email incorrecto",
	"data": null
}
```

- Case 3: Cuando se quiere loguear un usuario eliminado

```javascript
{
	"status": "err",
	"msg": "El perfil no existe",
	"data": null
}
```

- Case 4: Contraseña incorrecta

```javascript
{
	"status": "err",
	"msg": "Contraseña incorrecta",
	"data": null
}
```

- Case 5: Error al generar token

```javascript
{
	"status": "err",
	"msg": "Error al generar token",
	"data": null
}
```

#### incidentCreate
API :[http://localhost:3000/users/incident/create](http://localhost:3000/users/incident/create)

METHOD: POST

DESCRIPTION: Un usuario se registra.

REQUEST:

``` javascript
{
  "idincident" serial4 NOT NULL,
	"idprofile" int4 NOT NULL,
	"idcategory" int4 NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"ubication" varchar(100) NOT NULL,
	"date" timestamp NOT NULL,
	"state" varchar(20) NOT NULL,
	"latitud" varchar NULL,
	"longitud" varchar NULL,
	"banner" varchar NULL
}
```

RESPONSE: 

- Case 1: Se crea el incidente exitosamente
  
```
{
	"status": "ok",
	"data": {
		"idincident": 97,
		"idprofile": 1,
		"idcategory": 1,
		"title": "Hay basura",
		"description": "Mucha mucha",
		"ubication": "32-32",
		"date": "2023-07-13T22:00:10.122Z",
		"state": "En proces",
		"latitud": "12",
		"longitud": "13",
		"banner": null
	}
}
```

- Case 2: Si ha ocurrid algun error

``` javascript
{
	"status": "err",
	"data": null
}
```
