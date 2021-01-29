function DanceAnimation() {}

function rotateAroundPivot(pivot_x, pivot_y, angle, element){
    ele_mat = element.matrix;
    console.log(ele_mat);
    ele_mat.makeRotationZ(angle);
    
    // id_mat = new THREE.Matrix4().identity();

    // rot_mat = new THREE.Matrix4().makeRotationZ(angle);

    // ele_mat = element.matrix;

    // ele_mat = ele_mat.premultiply(rot_mat);


    // Como o método makeRotationZ reseta a matriz local do objeto, temos que restaurar
    // as coordenadas antigas dele com uma translacao.
    old_x = element.position.x;
    old_y = element.position.y;
    old_z = element.position.z;
    old_position_mat = new THREE.Matrix4().makeTranslation(old_x, old_y, old_z);
    ele_mat.premultiply(old_position_mat);

    // Criando translacao, colocando o centro de rotacao na origem. 
    // O centro de rotacao é p = [pivot_x, pivot_y]
    translate_mat = new THREE.Matrix4().makeTranslation(-pivot_x, -pivot_y, 0);

    // Pos multiplicacao: M = R * T
    ele_mat.multiply(translate_mat);

    // Desfazendo translacao inicial. Aplicando Pre multiplicacao: M = T^-1 * M. Ou seja: M = T^-1 * R * T
    // Tivemos que atualizar o three.js para utilizar o método invert()
    translate_mat.invert();
    ele_mat.premultiply(translate_mat);
}

function rotateRightUpperLeg(angle){
    let part = robot.getObjectByName("right_upper_leg");       
    rotateAroundPivot(0, 2, angle, part);

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function rotateLeftUpperLeg(angle){
    let part = robot.getObjectByName("left_upper_leg");       
    rotateAroundPivot(0, 2, angle, part); //o valor de pivot ta certo?

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function rotateRightLowerLeg(angle){
    let part = robot.getObjectByName("right_upper_leg").getObjectByName("lower_leg");       
    rotateAroundPivot(0, 1.75, angle, part); //o valor de pivot ta certo?

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function rotateLeftLowerLeg(angle){
    let part = robot.getObjectByName("left_upper_leg").getObjectByName("lower_leg");       
    rotateAroundPivot(0, 1.75, angle, part); //o valor de pivot ta certo?

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function rotateRightUpperArm(angle){
    let part = robot.getObjectByName("right_upper_arm");       
    rotateAroundPivot(-0.5, 1.8, angle, part);

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function rotateLeftUpperArm(angle){
    let part = robot.getObjectByName("left_upper_arm");       
    rotateAroundPivot(0.5, 1.8, angle, part);

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function rotateRightLowerArm(angle){
    let part = robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm");       
    rotateAroundPivot(0.5, 1.5, angle, part);

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function rotateLeftLowerArm(angle){
    let part = robot.getObjectByName("left_upper_arm").getObjectByName("lower_arm");       
    rotateAroundPivot(-0.5, 1.5, angle, part);

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function rotateTorso(angle){
    let part = robot.getObjectByName("torso");       
    rotateAroundPivot(0, 0, angle, part);

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function rotateTorsoWithMomentum(angle){
    rotateTorso(angle);
    rotateLeftUpperArm(-angle);
    rotateRightUpperArm(-angle);
    rotateLeftUpperLeg(-angle);
    rotateRightUpperLeg(-angle);
}


Object.assign( DanceAnimation.prototype, {

    init: function() {
        let rightUpperArm1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: Math.PI/1.7}, 1000)
            .onUpdate(function(){
                rotateRightUpperArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let rightLowerArm1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: 3*Math.PI/4}, 500)
            .onUpdate(function(){
                rotateRightLowerArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let leftUpperArm1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: -Math.PI/1.7}, 1000)
            .onUpdate(function(){
                rotateLeftUpperArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let leftLowerArm1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: -3*Math.PI/4}, 500)
            .onUpdate(function(){
                rotateLeftLowerArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let rightUpperLeg1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: Math.PI/6}, 500)
            .onUpdate(function(){
                
                rotateRightUpperLeg(this._object.theta);

                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let torso1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: Math.PI/6}, 500)
            .onUpdate(function(){
                rotateTorsoWithMomentum(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        rightUpperLeg1.chain(torso1);
        leftLowerArm1.chain(rightUpperLeg1);
        rightLowerArm1.chain(leftUpperArm1, leftLowerArm1);
        rightUpperArm1.chain(rightLowerArm1);
        rightUpperArm1.start(); 
        // torso1.start();      
    },
    animate: function(time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function() {
        this.init();
        this.animate(0);
    }
});
