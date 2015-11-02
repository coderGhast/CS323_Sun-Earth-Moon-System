var textures = {
    earthDiffuse : loadTexture('images/earthmap1k.jpg'),
    earthBumpMap : loadTexture('images/earthbump1k.jpg'),
    earthSpecularMap : loadTexture('images/earthspec1k.jpg'),
    moonDiffuse : loadTexture('images/moonmap1k.jpg'),
    moonBumpMap : loadTexture('images/moonbump1k.jpg'),
    starMap : loadTexture('images/starmap_s.png'),
    sunDiffuse : loadTexture('images/sunmap.jpg')
}

function loadTexture(texture){
	var textureLoader = new THREE.TextureLoader();
	return textureLoader.load(texture);
}