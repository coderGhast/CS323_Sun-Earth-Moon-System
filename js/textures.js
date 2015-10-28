var textures = {
    loadTexture : function(imageLocation){
        var texture =  THREE.ImageUtils.loadTexture(imageLocation);
        texture.minFilter = THREE.NearestFilter;
        return texture;
    }
}

textures.earthDiffuse =  textures.loadTexture('images/earthmap1k.jpg');
textures.earthBumpMap = textures.loadTexture('images/earthbump1k.jpg');
textures.earthSpecularMap = textures.loadTexture('images/earthspec1k.jpg');

textures.moonDiffuse = textures.loadTexture('images/moonmap1k.jpg');
textures.moonBumpMap = textures.loadTexture('images/moonbump1k.jpg');

textures.starMap = textures.loadTexture('images/starmap_s.png');

textures.sunDiffuse = textures.loadTexture('images/sunmap.jpg');
