// Borrowed and mangled from http://threejs.org/examples/#canvas_camera_orthographic

(function () {
  var height = window.innerHeight;
  var width = window.innerWidth;

  var container;
  var camera, scene, renderer;

  init();
  animate();

  function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.OrthographicCamera(
      width / - 2,
      width / 9,
      height / 2,
      height / - 2,
      - 500,
      1000
    );

    camera.position.x = 200;
    camera.position.y = 100;
    camera.position.z = 200;

    scene = new THREE.Scene();

    var size = 500, step = 20;
    var geometry = new THREE.Geometry();

    for (var i =- size; i <= size; i += step) {
      geometry.vertices.push( new THREE.Vector3(- size, 0, i));
      geometry.vertices.push( new THREE.Vector3(size, 0, i));

      geometry.vertices.push( new THREE.Vector3(i, 0, - size));
      geometry.vertices.push( new THREE.Vector3(i, 0,   size));
    }

    var material = new THREE.LineBasicMaterial({
      color: '#111',
      opacity: 0.9
    });

    var line = new THREE.LineSegments(geometry, material);
    scene.add(line);

    var geometry2 = new THREE.Geometry();

    for (var i =- size; i <= size; i += step) {
      geometry2.vertices.push( new THREE.Vector3(- size, 10, i));
      geometry2.vertices.push( new THREE.Vector3(size, 10, i));

      geometry2.vertices.push( new THREE.Vector3(i, 100, - size));
      geometry2.vertices.push( new THREE.Vector3(i, 100,   size));
    }

    var material2 = new THREE.LineBasicMaterial({
      color: '#a300df',
      opacity: 0.9
    });

    var line2 = new THREE.LineSegments(geometry2, material2);
    scene.add(line2);

    // Cubes - y-axis
    var geometry = new THREE.BoxGeometry(2, 350, 2);
    var material = new THREE.MeshLambertMaterial({
      color: '#ff00e9',
      transparent: true,
      opacity: 0.8,
      shading: THREE.FlatShading, overdraw: 0.5
    });

    for (var i = 0; i < 100; i ++) {
      var cube = new THREE.Mesh(geometry, material);

      cube.scale.y = Math.floor(Math.random() * 5 + 1);
      cube.position.x = Math.floor((Math.random() * 1000 - 500) / 50) * 50 + 25;
      cube.position.y = (cube.scale.y * 50) / 2;
      cube.position.z = Math.floor((Math.random() * 1000 - 500) / 50) * 50 + 25;

      scene.add( cube );
    }

    // Cubes - x-axis
    var geometry2 = new THREE.BoxGeometry(450, 2, 2);
    var material2 = new THREE.MeshLambertMaterial({
      color: '#00dfe9',
      transparent: true,
      opacity: 0.8,
      shading: THREE.FlatShading, overdraw: 0.2
    });

    for (var i = 0; i < 50; i ++) {
      var cube2 = new THREE.Mesh(geometry2, material2);

      cube2.scale.x = Math.floor(Math.random() * 5 + 1);
      cube2.position.x = Math.floor((Math.random() * 1000 - 500) / 50) * 50 + 25;
      cube2.position.y = (cube2.scale.y * 50) / 2;
      cube2.position.z = Math.floor((Math.random() * 1000 - 500) / 50) * 50 + 25;
      cube2.position.z = Math.floor((Math.random() * 1000 - 500) / 50) * 80;

      scene.add(cube2);
    }

    // Lights

    var ambientLight = new THREE.AmbientLight('#fff');
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight('#ff0082');
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    scene.add( directionalLight );

    var directionalLight = new THREE.DirectionalLight('#fff');
    directionalLight.position.x = 0.5;
    directionalLight.position.y = 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    scene.add( directionalLight );

    renderer = new THREE.CanvasRenderer({ alpha: true });
    renderer.setClearColor('#fff', 0);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(width, height );
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.left = window.innerWidth / -2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / - 2;

    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    var timer = Date.now() * 0.001;

    camera.position.x = Math.cos(timer) * Math.floor(Math.random() * 250 + 249) + 250;
    camera.position.z = Math.sin(timer) * 200;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
})();