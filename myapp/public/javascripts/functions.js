async function createIncident() {
    let data = await easyFetch
      .fetchData(
        "/users/incidents/create",
        {
          idprofile: 1,
          idcategory : 1,
          title : "title",
          description: "description",
          ubication: "ubication",
          state: 'En proceso' , 
          longitud: "positionlng" ,
          latitud: "positionlat"
        },
  
        "POST",
        false
      ).catch((e) => {
        console.error(e);
        return null;
      });
    if (data && data.status && data.status == "ok") {
       
    } else if (data && data.status && data.status == "err") {
     
    } else {
      
    }
  }


/*
async function signin() {
  let data = await easyFetch
    .fetchData(
      "/users/signin",
      {
        email: email,
        password: password
      },
      "POST",
      false
    )
    .catch((e) => {
      console.error(e);
      return null;
    });
  if (data && data.status && data.status === "ok") {
    // Inicio de sesión exitoso
    console.log('correcto');

  } else if (data && data.status && data.status === "err") {
    // Inicio de sesión fallido
    console.log('fallido1');
  } else {
    // Error al realizar el inicio de sesión
    console.log('fallido2');
  }
}*/








  function signin() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
  
    const data = {
      email,
      password
    };

    console.log("recibido");
    console.log(data);
  
    fetch('/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
  
      if (data.status === 'ok') {
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: data.msg,
          icon: 'success'
        }).then(() => {
          window.location.replace('/incident/getAll');
        });
      }
      else if (data.status === 'err') {
        Swal.fire({
          title: 'Error',
          text: data.msg,
          icon: 'error'
        });
      }
    })
    .catch(error => {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al iniciar sesión',
        icon: 'error'
      });
    });
  }







function signup() {
  const names = document.querySelector('#names').value;
  const surnames = document.querySelector('#surnames').value;
  const dni = document.querySelector('#dni').value;
  const mobile = document.querySelector('#mobile').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  // Crear objeto con datos del formulario
  const data = {
    names,
    surnames,
    dni,
    mobile,
    email,
    password
  };

  // Enviar datos a un servidor utilizando una solicitud POST
  fetch('/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.status === 'ok') {
      Swal.fire({
        title: 'Registro exitoso',
        text: data.msg,
        icon: 'success'
      });
    } else if (data.status === 'err') {
      Swal.fire({
        title: 'Error',
        text: data.msg,
        icon: 'error'
      });
    }
  })
  .catch(error => {
    // Manejar error en la solicitud
    console.error(error);
    Swal.fire({
      title: 'Error',
      text: 'Ocurrió un error al crear tu cuenta',
      icon: 'error'
    });
  });
}
