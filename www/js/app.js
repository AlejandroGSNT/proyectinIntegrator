// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})



 

.controller('myCtrl', function($scope, $http) {
  $http.get("localhost:8080/estudiante/getOne/cfnd/12345")
  .then(function(response) {
      $scope.myWelcome = response.data.status;
  });
})


.controller('PrincipaltCtrl', function($location,$scope,$ionicModal,$ionicLoading,$http,$rootScope,$state) {
  $scope.tickets =[];
    $scope.Entrar=function()  
  {
    //alert("a");
    cadena= `http://localhost:8080/usuario/getOne/${$scope.login.correo}/${$scope.login.clave}`;
    
         $ionicLoading.show({
    
          content: 'Cargando!!',
    
          animation: 'fade-in',
    
          showBackdrop: true,
    
          maxWidth: 200,
    
          showDelay: 0
    
        });
    
        $http.get(cadena).then(function(response) {
          console.log(response);
          if(response.data.status == "Ok"){
            $rootScope.usuario = response.data.nombre;
            $rootScope.correo = response.data.correo;
            $rootScope.tipo = response.data.tipo;
            console.log($rootScope.tipo);
            
            window.sessionStorage.setItem('correo',$rootScope.correo);
            alert(window.sessionStorage.getItem('correo'));

            if($rootScope.tipo == "universitario"){
              window.location.href ="universitario.html";
            }else if($rootScope.tipo == "responsable"){
              window.location.href ="responsable.html";
            }else if($rootScope.tipo == "bibliotecario"){
              window.location.href ="bibliotecario.html";
            }else if($rootScope.tipo == "administrador"){
              window.location.href ="administrador.html";
            }
          }else{
            $scope.login.clave = "";
          }
          
          $ionicLoading.hide();
          
        });
  }
  $scope.Registrar=function()  
  {
    //alert("primer alert");
    cadena= `http://localhost:8080/usuario/insert/${$scope.signUp.name}/${$scope.signUp.mail}/${$scope.signUp.passwd}/SinAsignar/${$scope.signUp.dependencia}`;
    //187.204.82.108:3000/usuario/insert/Joancornella/john@ucol.mx/miclave/universitario
    //alert("segundo alert");

         $ionicLoading.show({
    
          content: 'Cargando!!',
    
          animation: 'fade-in',
    
          showBackdrop: true,
    
          maxWidth: 200,
    
          showDelay: 0
    
        });
          $http.get(cadena).then(function(response) {
               console.log(response);
          });
    
  }
  $scope.AddTicket = function(){
    //titulo, asunto, usuario, fechaAlta

    let correo = window.sessionStorage.getItem('correo');
    let ticket = `{
      "titulo" :"${$scope.ticket.titulo}",
      "asunto" : "${$scope.ticket.asunto}",
      "usuario" : "${correo}",
      "estado":"Abierto",
      "respuesta":"Sin Contestar"
    }`; 
    cadena = (`http://localhost:8080/ticket/insert/${ticket}`);


    $ionicLoading.show({ 

      content: 'Cargando!!',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $http.get(cadena).then(function(response) {
      if(response.data.ok == 1){
        $ionicLoading.show({ template: 'Tu pregunta ha sido enviada', noBackdrop: true, duration: 2000 });
      }else{
        $ionicLoading.show({ template: 'Hubo un error en el proceso', noBackdrop: true, duration: 2000 });
      }
      
      window.history.back();
      
    });

  }
  $scope.estados = {
    Abierto:"icon ion-android-checkmark-circle",
    Cerrado:"icon ion-android-cancel",
    Proceso:"icon ion-android-alarm-clock"
  };
  $scope.Listar=function()  
  {

    let usuario = window.sessionStorage.getItem('correo');
    cadena = (`http://localhost:8080/ticket/getAll/${usuario}`);
    $http.get(cadena).then(function(response) {
     console.log(response);
    $scope.tickets =response.data;

    console.log($scope.tickets);
    
    });
    //location.reload();
  };

   $scope.ListarRoles=function()  
  {

    let usuario = window.sessionStorage.getItem('correo');
    cadena = (`http://localhost:8080/usuario/getAllRoles`);
    $http.get(cadena).then(function(response) {
     console.log(response);
    $scope.tickets =response.data;
    console.log($scope.tickets);
    });
  };

   $scope.ListarRolesAdministrador=function()  
  {

    let usuario = window.sessionStorage.getItem('adminRoles');
    cadena = (`http://localhost:8080/usuario/get`);
    $http.get(cadena).then(function(response) {
     console.log(response);
    $scope.tickets =response.data;
    console.log($scope.tickets);
    });
  };

     $scope.ListarTransferencia=(function()  
  {

    let usuario = window.sessionStorage.getItem('correo');
    cadena = (`http://localhost:8080/usuario/getAllResponsables`);
    $http.get(cadena).then(function(response) {
     console.log(response);
    $scope.tickets =response.data;
    console.log($scope.tickets);
    });
  })();



  $scope.ListarBibliotecario=function()  
  {

    let usuario = window.sessionStorage.getItem('correo');
    cadena = (`http://localhost:8080/ticket/get`);
    $http.get(cadena).then(function(response) {
     console.log(response);
    $scope.tickets =response.data;

    console.log($scope.tickets);
    });
  };

  $scope.ListarMisTicketsBibliotecario=(function()  
  {
    let usuario = window.sessionStorage.getItem('correo');
    cadena = (`http://localhost:8080/ticket/getAllResponsable/${usuario}`);
    $http.get(cadena).then(function(response) {
     console.log(response);
    $scope.Mistickets =response.data;

    console.log($scope.Mistickets);
    });
  })();


   $scope.asignarRol=function(id){
    let objeto =JSON.parse(window.sessionStorage.getItem('rol'));

    let responsable = id;  

    console.log(objeto);
     let ticketViejo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "${objeto.estado}",
      "fechaAlta" : ${objeto.fechaAlta},
      "titulo":"${objeto.titulo}",
      "usuario":"${objeto.usuario}"
    }`;
      let ticketNuevo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "${objeto.estado}",
      "fechaAlta" : ${objeto.fechaAlta},
      "titulo":"${objeto.titulo}",
      "usuario":"${objeto.usuario}",
      "responsable": "${responsable.correo}"
    }`;
    //window.sessionStorage.setItem('objeto',ticketNuevo);
    //alert(window.sessionStorage.getItem('objeto'));

    console.log(ticketViejo);
    console.log(ticketNuevo);


    cadena = (`http://localhost:8080/ticket/put/${ticketViejo}/${ticketNuevo}`);

   
        $http.get(cadena).then(function(response) {
          console.log(response.data);
        });
  }
  $scope.asignarRolUniversitario=function(id){
    let responsable = id;  
     let ticketViejo = `{
      "nombre" :"${responsable.nombre}",
      "correo" : "${responsable.correo}",
      "clave" : "${responsable.clave}",
      "tipo":"${responsable.tipo}",
      "dependencia":"${responsable.dependencia}"
    }`;
      let ticketNuevo = `{
      "nombre" :"${responsable.nombre}",
      "correo" : "${responsable.correo}",
      "clave" : "${responsable.clave}",
      "tipo":"universitario",
      "dependencia":"${responsable.dependencia}"
    }`;
    //window.sessionStorage.setItem('objeto',ticketNuevo);
    //alert(window.sessionStorage.getItem('objeto'));

    console.log(ticketViejo);
    console.log(ticketNuevo);


    cadena = (`http://localhost:8080/usuario/put/${ticketViejo}/${ticketNuevo}`);

   
        $http.get(cadena).then(function(response) {
          console.log(response.data);
        });
  }
  $scope.asignarRolBibliotecario=function(id){
    let responsable = id;  
     let ticketViejo = `{
      "nombre" :"${responsable.nombre}",
      "correo" : "${responsable.correo}",
      "clave" : "${responsable.clave}",
      "tipo":"${responsable.tipo}",
      "dependencia":"${responsable.dependencia}"
    }`;
      let ticketNuevo = `{
      "nombre" :"${responsable.nombre}",
      "correo" : "${responsable.correo}",
      "clave" : "${responsable.clave}",
      "tipo":"bibliotecario",
      "dependencia":"${responsable.dependencia}"
    }`;
    //window.sessionStorage.setItem('objeto',ticketNuevo);
    //alert(window.sessionStorage.getItem('objeto'));

    console.log(ticketViejo);
    console.log(ticketNuevo);


    cadena = (`http://localhost:8080/usuario/put/${ticketViejo}/${ticketNuevo}`);

   
        $http.get(cadena).then(function(response) {
          console.log(response.data);
        });
  }
  $scope.asignarRolResponsable=function(id){
    let responsable = id;  
     let ticketViejo = `{
      "nombre" :"${responsable.nombre}",
      "correo" : "${responsable.correo}",
      "clave" : "${responsable.clave}",
      "tipo":"${responsable.tipo}",
      "dependencia":"${responsable.dependencia}"
    }`;
      let ticketNuevo = `{
      "nombre" :"${responsable.nombre}",
      "correo" : "${responsable.correo}",
      "clave" : "${responsable.clave}",
      "tipo":"responsable",
      "dependencia":"${responsable.dependencia}"
    }`;
    //window.sessionStorage.setItem('objeto',ticketNuevo);
    //alert(window.sessionStorage.getItem('objeto'));

    console.log(ticketViejo);
    console.log(ticketNuevo);


    cadena = (`http://localhost:8080/usuario/put/${ticketViejo}/${ticketNuevo}`);

   
        $http.get(cadena).then(function(response) {
          console.log(response.data);
        });
  }
  $scope.asignarRolAdministrador=function(id){
    let responsable = id;  
     let ticketViejo = `{
      "nombre" :"${responsable.nombre}",
      "correo" : "${responsable.correo}",
      "clave" : "${responsable.clave}",
      "tipo":"${responsable.tipo}",
      "dependencia":"${responsable.dependencia}"
    }`;
      let ticketNuevo = `{
      "nombre" :"${responsable.nombre}",
      "correo" : "${responsable.correo}",
      "clave" : "${responsable.clave}",
      "tipo":"administrador",
      "dependencia":"${responsable.dependencia}"
    }`;
    //window.sessionStorage.setItem('objeto',ticketNuevo);
    //alert(window.sessionStorage.getItem('objeto'));

    console.log(ticketViejo);
    console.log(ticketNuevo);


    cadena = (`http://localhost:8080/usuario/put/${ticketViejo}/${ticketNuevo}`);

   
        $http.get(cadena).then(function(response) {
          console.log(response.data);
        });
  }
  $scope.asignarTransferencia=function(id){
    let objeto =JSON.parse(window.sessionStorage.getItem('transferencia'));

    let responsable = id;  

    console.log(objeto);
     let ticketViejo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "${objeto.estado}",
      "fechaAlta" : ${objeto.fechaAlta},
      "titulo":"${objeto.titulo}",
      "usuario":"${objeto.usuario}"
    }`;
      let ticketNuevo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "${objeto.estado}",
      "usuario":"${objeto.usuario}",
      "responsable": "${responsable.correo}"
    }`;
    //window.sessionStorage.setItem('objeto',ticketNuevo);
    //alert(window.sessionStorage.getItem('objeto'));

    console.log(ticketViejo);
    console.log(ticketNuevo);


    cadena = (`http://localhost:8080/ticket/put/${ticketViejo}/${ticketNuevo}`);

   
        $http.get(cadena).then(function(response) {
          console.log(response.data);
        });
  }

  $scope.cambiarEstado=function(id){
    let objeto =(id);

    console.log(objeto);
    let objetoClon = Object.assign({},objeto);

    objetoClon.estado = "Cerrado";

    console.log(objeto);
    console.log(objetoClon);

     $rootScope.title = objeto.titulo;
    window.sessionStorage.setItem('title',$rootScope.title);

     let ticketViejo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "${objeto.estado}",
      "fechaAlta" : ${objeto.fechaAlta},
      "titulo":"${objeto.titulo}",
      "usuario":"${objeto.usuario}"
    }`;
      let ticketNuevo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "Cerrado",
      "fechaAlta" :   ${objeto.fechaAlta},
      "titulo":"${objeto.titulo}",
      "usuario":"${objeto.usuario}"
    }`;
    //window.sessionStorage.setItem('objeto',ticketNuevo);
    //alert(window.sessionStorage.getItem('objeto'));


    cadena = (`http://localhost:8080/ticket/put/${ticketViejo}/${ticketNuevo}`);

   
        $http.get(cadena).then(function(response) {
          console.log(response.data);
          location.reload();
        });
  }

   $scope.cambiarEstadoReabrir=function(id){
    let objeto =(id);

    correo = window.sessionStorage.getItem('correo');

    console.log(objeto);
     let ticketViejo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "${objeto.estado}",
      "fechaAlta" : ${objeto.fechaAlta},
      "titulo":"${objeto.titulo}",
      "usuario":"${objeto.usuario}"
    }`;
      let ticketNuevo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "Abierto",
      "fechaAlta" :   ${objeto.fechaAlta},
      "titulo":"${objeto.titulo}",
      "usuario":"${objeto.usuario}",
      "responsable": "${correo}"
    }`;
    //window.sessionStorage.setItem('objeto',ticketNuevo);
    //alert(window.sessionStorage.getItem('objeto'));

    console.log(ticketViejo);
    console.log(ticketNuevo);


    cadena = (`http://localhost:8080/ticket/put/${ticketViejo}/${ticketNuevo}`);

   
        $http.get(cadena).then(function(response) {
          console.log(response.data);
        });
  }

  $scope.cambiarEstadoEnProceso=function(id){
    let objeto =(id);

    correo = window.sessionStorage.getItem('correo');

    console.log(objeto);
     let ticketViejo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "${objeto.estado}",
      "fechaAlta" : ${objeto.fechaAlta},
      "titulo":"${objeto.titulo}",
      "usuario":"${objeto.usuario}"
    }`;
      let ticketNuevo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "Proceso",
      "fechaAlta" :   ${objeto.fechaAlta},
      "titulo":"${objeto.titulo}",
      "usuario":"${objeto.usuario}",
      "responsable": "${correo}"
    }`;
    //window.sessionStorage.setItem('objeto',ticketNuevo);
    //alert(window.sessionStorage.getItem('objeto'));

    console.log(ticketViejo);
    console.log(ticketNuevo);


    cadena = (`http://localhost:8080/ticket/put/${ticketViejo}/${ticketNuevo}`);

   
        $http.get(cadena).then(function(response) {
          console.log(response.data);
        });
  }
   $scope.irRoles=function(id){
    var a = JSON.stringify(id);
    window.sessionStorage.setItem('rol',a);
    alert(window.sessionStorage.getItem('rol'));
    window.location.href ="usuariosRoles.html";
  }
  $scope.irRespuesta=function(id){
    var a = JSON.stringify(id);
    window.sessionStorage.setItem('respuesta',a);
    alert(window.sessionStorage.getItem('respuesta'));
    window.location.href ="responderTicket.html";
  }
  $scope.irTransferir=function(id){
    var a = JSON.stringify(id);
    window.sessionStorage.setItem('transferencia',a);
    alert(window.sessionStorage.getItem('transferencia'));
    window.location.href ="usuariosTransferencia.html";
  }
  $scope.irCalificar=function(id){
    var a = JSON.stringify(id);
    window.sessionStorage.setItem('ticketRespuesta',a);
    alert(window.sessionStorage.getItem('ticketRespuesta'));
    window.location.href ="responderTicket.html";
  }
  $scope.irCalificarEstudiante=function(id){
    var a = JSON.stringify(id);
    window.sessionStorage.setItem('objeto',a);
    alert(window.sessionStorage.getItem('objeto'));
    window.location.href ="viewTicket.html";
  }
  $scope.cargarRespuesta=function(){
    console.log(window.sessionStorage.getItem('respuesta'));
    var objeto = JSON.parse(window.sessionStorage.getItem('respuesta'));
    cadena = (`http://localhost:8080/ticket/getOneTitle/${objeto.titulo}`);
    
    document.getElementById("tituloPregunta").innerHTML  = objeto.titulo;  
    document.getElementById("asuntoPregunta").innerHTML = objeto.asunto;
    document.getElementById("fechaPregunta").innerHTML = objeto.fechaAlta;
    document.getElementById("estadoPregunta").innerHTML = objeto.estado;
    document.getElementById("usuarioPregunta").innerHTML = objeto.usuario;

    $http.get(cadena).then(function(response) {
          console.log(response.data);
          
        });

  }

  $scope.calificar=function(){
    console.log(window.sessionStorage.getItem('objeto'));
    var objeto = JSON.parse(window.sessionStorage.getItem('objeto'));
    console.log(objeto.titulo);
    cadena = (`http://localhost:8080/ticket/getOneTitle/${objeto.titulo}`);
    
    document.getElementById("titulo").innerHTML  = objeto.titulo;  
    document.getElementById("asunto").innerHTML = objeto.asunto;
    document.getElementById("fecha").innerHTML = objeto.fechaAlta;
    document.getElementById("estado").innerHTML = objeto.estado;
    document.getElementById("usuario").innerHTML = objeto.usuario;
    document.getElementById("respuesta").innerHTML = objeto.respuesta;

    $http.get(cadena).then(function(response) {
          console.log(response.data);
          
        });

  }
   $scope.guardarCalificacion=function(){
    console.log(window.sessionStorage.getItem('objeto'));
    var objeto = JSON.parse(window.sessionStorage.getItem('objeto'));

    objeto.calificacion = document.getElementById("calificacionTicket").value;  

     let ticketViejo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "${objeto.estado}",
      "fechaAlta" : ${objeto.fechaAlta},
      "titulo":"${objeto.titulo}",
      "usuario":"${objeto.usuario}"
    }`;
      let ticketNuevo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "${objeto.estado}",
      "fechaAlta" :  ${objeto.fechaAlta},
      "titulo":"${objeto.titulo}",
      "usuario":"${objeto.usuario}",
      "calificacion":${objeto.calificacion}
    }`;
    //window.sessionStorage.setItem('objeto',ticketNuevo);
    //alert(window.sessionStorage.getItem('objeto'));


    cadena = (`http://localhost:8080/ticket/put/${ticketViejo}/${ticketNuevo}`);

   
        $http.get(cadena).then(function(response) {
          console.log(response.data);
            alert("Calificacion guaradad");
        });

  }
  $scope.guardarRespuesta=function(){
    console.log(window.sessionStorage.getItem('respuesta'));
    var objeto = JSON.parse(window.sessionStorage.getItem('respuesta'));
    var correo = window.sessionStorage.getItem('correo');

    objeto.respuesta = document.getElementById("guardarRespuesta").value;  

     let ticketViejo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "${objeto.estado}",
      "fechaAlta" : ${objeto.fechaAlta},
      "titulo":"${objeto.titulo}",
      "usuario":"${objeto.usuario}"
    }`;
      let ticketNuevo = `{
      "asunto" :"${objeto.asunto}",
      "estado" : "${objeto.estado}",
      "fechaAlta" :  ${objeto.fechaAlta},
      "titulo":"${objeto.titulo}",
      "usuario":"${objeto.usuario}",
      "responsable":"${correo}",
      "respuesta":"${objeto.respuesta}"
    }`;
    //window.sessionStorage.setItem('objeto',ticketNuevo);
    //alert(window.sessionStorage.getItem('objeto'));

    console.log(ticketViejo);
    console.log(ticketNuevo);

    cadena = (`http://localhost:8080/ticket/put/${ticketViejo}/${ticketNuevo}`);

   
        $http.get(cadena).then(function(response) {
          console.log(response.data);
          alert("Respuesta enviada");
        });

  }

})

//var app = angular.module('starter', ['ionic'])
