function SnoopAnimation() { }

function rotateAroundPivot(pivot_x, pivot_y, angle, element) {
    ele_mat = element.matrix;
    ele_mat.makeRotationZ(angle);

    // Como o m�todo makeRotationZ reseta a matriz local do objeto, temos que restaurar
    // as coordenadas antigas dele com uma translacao.
    old_x = element.position.x;
    old_y = element.position.y;
    old_z = element.position.z;
    old_position_mat = new THREE.Matrix4().makeTranslation(old_x, old_y, old_z);
    ele_mat.premultiply(old_position_mat);

    // Criando translacao, colocando o centro de rotacao na origem. 
    // O centro de rotacao � p = [pivot_x, pivot_y]
    translate_mat = new THREE.Matrix4().makeTranslation(-pivot_x, -pivot_y, 0);

    // Pos multiplicacao: M = R * T
    ele_mat.multiply(translate_mat);

    // Desfazendo translacao inicial. Aplicando Pre multiplicacao: M = T^-1 * M. Ou seja: M = T^-1 * R * T
    // Tivemos que atualizar o three.js para utilizar o m�todo invert()
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



Object.assign( SnoopAnimation.prototype, {

    init: function () {
        /*let upperArmTween = new TWEEN.Tween({ theta: 0 })
            .to({ theta: 0 }, 500)
            .onUpdate(function () {
                let right_upper_arm = robot.getObjectByName("right_upper_arm");

                rotateAroundPivot(-0.5, 1.8, this._object.theta, right_upper_arm);

                // Segundo os docs do three.js � importante setar para false para evitar problemas
                // quando mexemos diretamente com as matrizes dos objetos.
                right_upper_arm.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })
         */   


        let lowerArmTween = new TWEEN.Tween({ theta: 0 })
            .to({ theta: [5*(Math.PI / 4 )]}, 700) 
            .onUpdate(function () {
                let right_lower_arm = robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm");

                rotateAroundPivot(0, 1.5, this._object.theta, right_lower_arm);

                right_lower_arm.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                right_lower_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

        // Por que o efeito das rotacoes nao persiste quando � com o mesmo objeto?
        let lowerArmTweenCurva1 = new TWEEN.Tween({ theta: [5*(Math.PI / 4)] })
            .to({ theta: [3*(Math.PI/4)]}, 700)
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate(function () {
                let right_lower_arm = robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm");

                rotateAroundPivot(0, 1.5, this._object.theta, right_lower_arm);

                right_lower_arm.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                right_lower_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })
     

        let handTweenToLeft = new TWEEN.Tween({ theta: 0 })
            .to({ theta: Math.PI / 5.3 }, 500)
            .repeat(1)
            .yoyo(true)
            .onUpdate(function () {
                let right_hand = robot.getObjectByName("right_upper_arm").getObjectByName("hand");

                rotateAroundPivot(0.5, 0, this._object.theta, right_hand);

                // right_hand.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                right_hand.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

        let handTweenToRight = new TWEEN.Tween({ theta: 0 })
            .to({ theta: -Math.PI / 5.3 }, 500)
            .repeat(1)
            .yoyo(true)
            .onUpdate(function () {
                let right_hand = robot.getObjectByName("right_upper_arm").getObjectByName("hand");

                rotateAroundPivot(-0.5, 0, this._object.theta, right_hand);

                right_hand.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                right_hand.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

        let lowerArmLeft = new TWEEN.Tween( {theta:0} )
            .to( {theta: -Math.PI/24}, 1000)
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate(function(){
                let left_lower_arm = robot.getObjectByName("left_upper_arm").getObjectByName("lower_arm");
                
                rotateAroundPivot(0, 1.5, this._object.theta, left_lower_arm);
    
                left_lower_arm.matrixAutoUpdate = false;
    
                // Updating final world matrix (with parent transforms) - mandatory
                left_lower_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })
    
        let leftHandTween = new TWEEN.Tween( {theta:0} )
            .to( {theta: -Math.PI/6}, 1000)
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate(function(){
                let left_hand =  robot.getObjectByName("left_upper_arm").getObjectByName("hand");

                rotateAroundPivot(-0.5, 0, this._object.theta, left_hand);

                left_hand.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                left_hand.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })    

        let torsoDance = new TWEEN.Tween({ theta: 0 })
            .to({ theta: -Math.PI / 30 }, 1000)
            .onUpdate(function () {
                let torso = robot.getObjectByName("torso");

                rotateAroundPivot(0, 0, this._object.theta, torso);

                torso.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                torso.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })    
        let torsoDance2 = new TWEEN.Tween({ theta:  -Math.PI / 30  })
            .to({ theta: Math.PI / 30 }, 1000)
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate(function () {
                let torso = robot.getObjectByName("torso");

                rotateAroundPivot(0, 0, this._object.theta, torso);

                torso.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                torso.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })        
        
        let fixUpperLeg = new TWEEN.Tween({ theta:  Math.PI / 30  })
            .to({ theta: -Math.PI / 30 }, 1000)
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate(function () {
                rotateRightUpperLeg(this._object.theta);
                rotateLeftUpperLeg(this._object.theta);    

                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })        
        
        

        lowerArmTween.chain(handTweenToLeft, lowerArmTweenCurva1,torsoDance,lowerArmLeft,leftHandTween);
        handTweenToLeft.chain(handTweenToRight);
        handTweenToRight.chain(handTweenToLeft);
        torsoDance.chain(torsoDance2,fixUpperLeg);

        //  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
        lowerArmTween.start();
        //torsoDance.start(torsoDance2);
    },
    animate: function (time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function () {
        this.init();
        this.animate(0);
    }
});
