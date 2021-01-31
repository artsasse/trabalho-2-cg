function DanceAnimation() {}

function rotateAroundPivot(pivot_x, pivot_y, angle, element){
    ele_mat = element.matrix;
    ele_mat.makeRotationZ(angle);

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

function rotateTorso(angle, pivot_x, pivot_y){
    let part = robot.getObjectByName("torso");       
    rotateAroundPivot(pivot_x, pivot_y, angle, part);

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function translateElement(x, y, z, element){
    ele_mat = element.matrix;
    translate_mat = new THREE.Matrix4().makeTranslation(x, y, z);
    ele_mat.premultiply(translate_mat);
} 

function translateHeadX(x){
    let part = robot.getObjectByName("head");      

    // translateElement(x, y, z, part);
    part_mat = part.matrix;
    part_mat.makeTranslation(x, part.position.y, part.position.z);

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function translateHeadY(y){
    let part = robot.getObjectByName("head");      

    // translateElement(x, y, z, part);
    part_mat = part.matrix;
    part_mat.makeTranslation(part.position.x, y, part.position.z);

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function translateHead(x,y){
    let part = robot.getObjectByName("head");      

    // translateElement(x, y, z, part);
    part_mat = part.matrix;
    part_mat.makeTranslation(x, y, part.position.z);

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function limbsImpact(angle){
    rotateLeftUpperArm(angle);
    rotateRightUpperArm(angle);
    rotateLeftUpperLeg(angle);
    rotateRightUpperLeg(angle);
}

function translateTorsoX(x){
    let part = robot.getObjectByName("torso");      

    // translateElement(x, y, z, part);
    part_mat = part.matrix;
    part_mat.makeTranslation(x, part.position.y, part.position.z);

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

// Uma transformacao composta de rotacao e translacao que devem ser realizadas na mesma funcao
// para que uma nao anule a outra
function torsoImpact(x, angle){
    let element = robot.getObjectByName("torso");
    ele_mat = element.matrix;
    ele_mat.makeRotationZ(angle);

    // Como o método makeRotationZ reseta a matriz local do objeto, temos que restaurar
    // as coordenadas antigas dele com uma translacao, exceto para o x que nesse caso represeta a translacao
    // do torso no eixo x apos o impacto.
    old_y = element.position.y;
    old_z = element.position.z;
    new_position_mat = new THREE.Matrix4().makeTranslation(x, old_y, old_z);
    ele_mat.premultiply(new_position_mat);

    limbsImpact(angle);

    element.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    element.updateMatrixWorld(true);
}


Object.assign( DanceAnimation.prototype, {

    init: function() {
        // ------------ PARTE 1 - INICIO ------------
        let rightUpperArm1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: Math.PI/1.7}, 1000)
            .onUpdate(function(){
                rotateRightUpperArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let rightUpperArm2 = new TWEEN.Tween( {theta: Math.PI/1.7} )
            .to( {theta: 0}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function(){
                rotateRightUpperArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let rightLowerArm1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: 3*Math.PI/4}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function(){
                rotateRightLowerArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let rightLowerArm2 = new TWEEN.Tween( {theta:3*Math.PI/4} )
            .to( {theta: 0}, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function(){
                rotateRightLowerArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let headLeft1 = new TWEEN.Tween( {new_x:0} )
            .to( {new_x: -4}, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .repeat(1)
            .yoyo(true)
            // .repeatDelay(2000)
            .onUpdate(function(){
                
                translateHeadX(this._object.new_x, 0, 0);

                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        // ------------ PARTE 1 - FIM ------------

        // ...

        // ------------ PARTE 2 - INICIO ------------

        let leftUpperArm1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: -Math.PI/1.7}, 800)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function(){
                rotateLeftUpperArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let leftUpperArm2 = new TWEEN.Tween( {theta:-Math.PI/1.7} )
            .to( {theta: 0}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function(){
                rotateLeftUpperArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let leftLowerArm1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: -3*Math.PI/4}, 800)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function(){
                rotateLeftLowerArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let leftLowerArm2 = new TWEEN.Tween( {theta:-3*Math.PI/4} )
            .to( {theta: 0}, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function(){
                rotateLeftLowerArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let headRight1 = new TWEEN.Tween( {new_x:0} )
            .to( {new_x: 12}, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .repeat(1)
            .yoyo(true)
            // .repeatDelay(2000)
            .onUpdate(function(){
                
                translateHeadX(this._object.new_x, 0, 0);

                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        // ------------ PARTE 2 - FIM ------------

        // ...

        // ------------ PARTE 3 - INICIO ------------
        
        let rightUpperArm3 = new TWEEN.Tween( {theta:0} )
            .to( {theta: Math.PI/1.7}, 400)
            .easing(TWEEN.Easing.Exponential.In)
            .onUpdate(function(){
                rotateRightUpperArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let rightUpperArm4 = new TWEEN.Tween( {theta: Math.PI/1.7} )
            .to( {theta: 0}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function(){
                rotateRightUpperArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let rightLowerArm3 = new TWEEN.Tween( {theta:0} )
            .to( {theta: 3*Math.PI/4}, 400)
            .easing(TWEEN.Easing.Exponential.In)
            .onUpdate(function(){
                rotateRightLowerArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let rightLowerArm4 = new TWEEN.Tween( {theta:3*Math.PI/4} )
            .to( {theta: 0}, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function(){
                rotateRightLowerArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let headTurn1 = new TWEEN.Tween( {new_x:0 , new_y: 4.8} )
            .to( {new_x: [-32, -32, 80, 80], new_y: [4.8, 20, 20, 4.8]}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            // .repeat(1)
            // .yoyo(true)
            // .repeatDelay(2000)
            .onUpdate(function(){
                
                translateHead(this._object.new_x, this._object.new_y);

                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })
        
        let headTurn2 = new TWEEN.Tween( {new_x:80 , new_y: 4.8} )
            .to( {new_x: 0, new_y: 4.8}, 1000)
            .easing(TWEEN.Easing.Exponential.In)
            // .repeat(1)
            // .yoyo(true)
            // .repeatDelay(2000)
            .onUpdate(function(){
                
                translateHead(this._object.new_x, this._object.new_y);

                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let robotImpact = new TWEEN.Tween( {theta:0, new_x: 0} )
            .to( {theta: Math.PI/6, new_x: -10}, 2000)
            .easing(TWEEN.Easing.Quintic.Out)
            .onUpdate(function(){
                // translateTorsoX(this._object.new_x);
                // rotateTorsoWithMomentum(this._object.theta, 0, 0);
                torsoImpact(this._object.new_x, this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        // ------------ PARTE 3 - FIM ------------

        // headTurn1.chain(robotImpact);
        // headTurn1.start();

        // PARTE 3
        headTurn2.chain(robotImpact);
        headTurn1.chain(headTurn2);
        rightLowerArm3.chain(headTurn1, rightUpperArm4, rightLowerArm4);
        // rightUpperArm3.chain(rightLowerArm3);
        headRight1.chain(rightUpperArm3, rightLowerArm3); 

        // PARTE 2
        leftLowerArm1.chain(headRight1, leftUpperArm2, leftLowerArm2);
        // leftUpperArm1.chain(leftLowerArm1);
        headLeft1.chain(leftUpperArm1, leftLowerArm1); 
        
        // PARTE 1
        rightLowerArm1.chain(headLeft1, rightUpperArm2, rightLowerArm2);
        // rightUpperArm1.chain(rightLowerArm1);
        rightUpperArm1.start(); 
        rightLowerArm1.start();
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
