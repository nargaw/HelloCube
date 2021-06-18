import './style.css'

//import Three.js
import * as THREE from 'three'

//link to canvas
const canvas = document.querySelector('.display')

//create a scene
const scene = new THREE.Scene()

//create cube with geometry and material and add to scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

//add a camera, adjust postion and add to scene
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 100)
camera.position.z = 5
scene.add(camera)

//create renderer link to DOM Element and set size of renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)


//add event listener that listens to window resize and updates camera's aspect ratio and render size
window.addEventListener('resize', () => {
    //on resize update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    //on resize update camera aspect ratio
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
})

//THREE time constructor
const clock = new THREE.Clock()

//function that updates the window and rerenders 
const update = () => {
    //get elapsed time
    const elapsedTime = clock.getElapsedTime()
    
    //rotate cube right
    cube.rotation.y = elapsedTime
    cube.rotation.x = elapsedTime

    //render scene on each update
    renderer.render(scene, camera)

    //callback to update function
    window.requestAnimationFrame(update)
}

update()

