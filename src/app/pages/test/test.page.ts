import { Component, OnInit } from '@angular/core';
import * as THREE from 'three'; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module';
//import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  container: any; 
  scene: any;
  renderer: any;
  camera: any;
  stats: any;
  model: any;
  skeleton: any;
  mixer: any;
  clock: any;

  crossFadeControls:any[] = [];

  currentBaseAction = 'idle';
  allActions:any[] = [];
  baseActions = {
    idle: { weight: 1 },
    walk: { weight: 0 },
    run: { weight: 0 }
  };
  additiveActions = {
    sneak_pose: { weight: 0 },
    sad_pose: { weight: 0 },
    agree: { weight: 0 },
    headShake: { weight: 0 }
  };
  panelSettings: any; 
  numAnimations: any;

  constructor() { }

  ngOnInit() {
    
  }
  /*
  init() {
    const container = document.getElementById( 'container' );
				this.clock = new THREE.Clock();

				this.scene = new THREE.Scene();
				this.scene.background = new THREE.Color( 0xa0a0a0 );
				this.scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

				const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
				hemiLight.position.set( 0, 20, 0 );
				this.scene.add( hemiLight );

				const dirLight = new THREE.DirectionalLight( 0xffffff );
				dirLight.position.set( 3, 10, 10 );
				dirLight.castShadow = true;
				dirLight.shadow.camera.top = 2;
				dirLight.shadow.camera.bottom = - 2;
				dirLight.shadow.camera.left = - 2;
				dirLight.shadow.camera.right = 2;
				dirLight.shadow.camera.near = 0.1;
				dirLight.shadow.camera.far = 40;
				this.scene.add( dirLight );

				// ground

				const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				this.scene.add( mesh );

				const loader = new GLTFLoader();
				loader.load( 'models/gltf/Xbot.glb',  ( gltf:any ) =>{

					this.model = gltf.scene;
					this.scene.add( this.model );

					this.model.traverse( function ( object:any ) {

						if ( object.isMesh ) object.castShadow = true;

					} );

					this.skeleton = new THREE.SkeletonHelper( this.model );
					this.skeleton.visible = false;
					this.scene.add( this.skeleton );

					const animations = gltf.animations;
					this.mixer = new THREE.AnimationMixer( this.model );

					this.numAnimations = animations.length;

					for ( let i = 0; i !== this.numAnimations; ++ i ) {

						let clip = animations[ i ];
						let name = clip.name ;

            if(name!='idle' || name!='walk' || name!='run'){
              name = 'idle';
            }

						if ( this.baseActions[ name ] ) {

							const action:any = this.mixer.clipAction( clip );
							this.activateAction( action );
							this.baseActions[ name ].action = action;
							this.allActions.push( action );

						} else if ( this.additiveActions[ name ] ) {

							// Make the clip additive and remove the reference frame

							THREE.AnimationUtils.makeClipAdditive( clip );

							if ( clip.name.endsWith( '_pose' ) ) {

								clip = THREE.AnimationUtils.subclip( clip, clip.name, 2, 3, 30 );

							}

							const action = this.mixer.clipAction( clip );
							this.activateAction( action );
							this.additiveActions[ name ].action = action;
							this.allActions.push( action );

						}

					}

					this.createPanel();

					this.animate();

				} );

				this.renderer = new THREE.WebGLRenderer( { antialias: true } );
				this.renderer.setPixelRatio( window.devicePixelRatio );
				this.renderer.setSize( window.innerWidth, window.innerHeight );
				this.renderer.outputEncoding = THREE.sRGBEncoding;
				this.renderer.shadowMap.enabled = true;
				this.container.appendChild( this.renderer.domElement );

				// camera
				this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100 );
				this.camera.position.set( - 1, 2, 3 );

				const controls = new OrbitControls( this.camera, this.renderer.domElement );
				controls.enablePan = false;
				controls.enableZoom = false;
				controls.target.set( 0, 1, 0 );
				controls.update();

				this.stats = Stats();
				this.container.appendChild( this.stats.dom );

				window.addEventListener( 'resize', this.onWindowResize() );
  }

  createPanel() {

    const panel = new GUI( { width: 310 } );

    const folder1:any = panel.addFolder( 'Base Actions' );
    const folder2 = panel.addFolder( 'Additive Action Weights' );
    const folder3 = panel.addFolder( 'General Speed' );

    this.panelSettings = {
      'modify time scale': 1.0
    };

    const baseNames = [ 'None', ...Object.keys( this.baseActions ) ];

    for ( let i = 0, l = baseNames.length; i !== l; ++ i ) {

      const name:any = baseNames[ i ];
      const settings = this.baseActions[ name ];
      this.panelSettings[ name ] = function () {

        const currentSettings = this.baseActions[ this.currentBaseAction ];
        const currentAction = currentSettings ? currentSettings.action : null;
        const action = settings ? settings.action : null;

        if ( currentAction !== action ) {
  
          this.prepareCrossFade( currentAction, action, 0.35 );
  
        }

      };

      this.crossFadeControls.push( folder1.add( this.panelSettings, name ) );

    }

    for ( const name of Object.keys( additiveActions ) ) {

      const settings = this.additiveActions[ name ];

      this.panelSettings[ name ] = settings.weight;
      folder2.add( this.panelSettings, name, 0.0, 1.0, 0.01 ).listen().onChange(  ( weight:any )=> {

        this.setWeight( settings.action, weight );
        settings.weight = weight;

      } );

    }

    folder3.add( this.panelSettings, 'modify time scale', 0.0, 1.5, 0.01 ).onChange( this.modifyTimeScale );

    folder1.open();
    folder2.open();
    folder3.open();

    this.crossFadeControls.forEach( function ( control ) {

      control.setInactive = function () {

        control.domElement.classList.add( 'control-inactive' );

      };

      control.setActive = function () {

        control.domElement.classList.remove( 'control-inactive' );

      };

      const settings = this.baseActions[ control.property ];

      if ( ! settings || ! settings.weight ) {

        control.setInactive();

      }

    } );

  }

  activateAction( action:any ) {

    const clip = action.getClip();
    const settings = baseActions[ clip.name ] || additiveActions[ clip.name ];
    this.setWeight( action, settings.weight );
    action.play();

  }

  modifyTimeScale( speed:any ) {

    this.mixer.timeScale = speed;

  }

  prepareCrossFade( startAction:any, endAction:any, duration:any ) {

    // If the current action is 'idle', execute the crossfade immediately;
    // else wait until the current action has finished its current loop

    if ( this.currentBaseAction === 'idle' || ! startAction || ! endAction ) {

      this.executeCrossFade( startAction, endAction, duration );

    } else {

      this.synchronizeCrossFade( startAction, endAction, duration );

    }

    // Update control colors

    if ( endAction ) {

      const clip = endAction.getClip();
      this.currentBaseAction = clip.name;

    } else {

      this.currentBaseAction = 'None';

    }

    this.crossFadeControls.forEach(  ( control:any ) => {

      const name = control.property;

      if ( name === this.currentBaseAction ) {

        control.setActive();

      } else {

        control.setInactive();

      }

    } );

  }

  synchronizeCrossFade( startAction:any, endAction:any, duration:any ) {

    this.mixer.addEventListener( 'loop', onLoopFinished );

     function onLoopFinished( event:any ) {

      if ( event.action === startAction ) {

        mixer.removeEventListener( 'loop', onLoopFinished );

        executeCrossFade( startAction, endAction, duration );

      }

    }
  }
  executeCrossFade( startAction:any, endAction:any, duration:any ) {

    // Not only the start action, but also the end action must get a weight of 1 before fading
    // (concerning the start action this is already guaranteed in this place)

    if ( endAction ) {

      setWeight( endAction, 1 );
      endAction.time = 0;

      if ( startAction ) {

        // Crossfade with warping

        startAction.crossFadeTo( endAction, duration, true );

      } else {

        // Fade in

        endAction.fadeIn( duration );

      }

    } else {

      // Fade out

      startAction.fadeOut( duration );

    }

  }

  setWeight( action:any, weight:any ) {

    action.enabled = true;
    action.setEffectiveTimeScale( 1 );
    action.setEffectiveWeight( weight );

  }

  onWindowResize() {

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );

  }

  animate() {

    // Render loop

    requestAnimationFrame( this.animate );

    for ( let i = 0; i !== this.numAnimations; ++ i ) {

      const action:any = this.allActions[ i ];
      const clip = action.getClip();
      const settings = this.baseActions[ clip.name ] || additiveActions[ clip.name ];
      settings.weight = action.getEffectiveWeight();

    }

    // Get the time elapsed since the last frame, used for mixer update

    const mixerUpdateDelta = this.clock.getDelta();

    // Update the animation mixer, the stats panel, and render this frame

    this.mixer.update( mixerUpdateDelta );

    this.stats.update();

    this.renderer.render( this.scene, this.camera );

  }
  */
  

  stuff() {
    this.container = document.getElementById('canvas'); // should actually be done using ViewChild

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    // var scene = new THREE.Scene();
    console.log('HELLO');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
    this.container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    animate();
  }

}
