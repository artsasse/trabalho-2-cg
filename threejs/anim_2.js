function SnoopAnimation() { }
// inspirado em https://youtu.be/RaCodgL9cvk?t=29

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

function rotateRightUpperArm2(angle, y){

    let element = robot.getObjectByName("right_upper_arm");
    ele_mat = element.matrix;
    ele_mat.makeRotationZ(angle);

    // Como o método makeRotationZ reseta a matriz local do objeto, temos que restaurar
    // as coordenadas antigas dele com uma translacao, exceto para o y nesse caso
    old_x = element.position.x;
    old_z = element.position.z;
    new_position_mat = new THREE.Matrix4().makeTranslation(old_x, y, old_z);
    ele_mat.premultiply(new_position_mat);

    element.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    element.updateMatrixWorld(true);
}

function rotateLeftUpperArm2(angle, y){

    let element = robot.getObjectByName("left_upper_arm");
    ele_mat = element.matrix;
    ele_mat.makeRotationZ(angle);

    // Como o método makeRotationZ reseta a matriz local do objeto, temos que restaurar
    // as coordenadas antigas dele com uma translacao, exceto para o x que nesse caso represeta a translacao
    // do torso no eixo x apos o impacto.
    old_x = element.position.x;
    old_z = element.position.z;
    new_position_mat = new THREE.Matrix4().makeTranslation(old_x, y, old_z);
    ele_mat.premultiply(new_position_mat);

    element.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    element.updateMatrixWorld(true);
}

function rotateRightLowerArm(angle){
    let part = robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm");       
    rotateAroundPivot(0.5, 1.5, angle, part);

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function rotateRightLowerArm2(angle){
    let part = robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm");       
    rotateAroundPivot(0, 1.5, angle, part);

    part.matrixAutoUpdate = false;

    // Updating final world matrix (with parent transforms) - mandatory
    part.updateMatrixWorld(true);
}

function rotateLeftLowerArm2(angle){
    let part = robot.getObjectByName("left_upper_arm").getObjectByName("lower_arm");       
    rotateAroundPivot(0, 1.5, angle, part);

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

Object.assign( SnoopAnimation.prototype, {

    init: function () {

        let headTweenInitial = new TWEEN.Tween({ head_x: 0 })
            .to({ head_x: 0.7}, 700) 
            .onUpdate(function () {

                translateHeadX(this._object.head_x);

                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

        let headTweenLoop = new TWEEN.Tween({ head_x: 0.7 })
            .to({ head_x: [0,-0.7]}, 1400) 
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate(function () {

                translateHeadX(this._object.head_x);

                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

        let upperArmsTweenInitial = new TWEEN.Tween({ theta: 0, shoulder_y: 0 })
            .to({ theta: -Math.PI/30, shoulder_y: 1}, 700) 
            .onUpdate(function () {

                rotateLeftUpperArm2(this._object.theta, this._object.shoulder_y);
                rotateRightUpperArm2(this._object.theta, this._object.shoulder_y);

                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

        let upperArmsTweenLoop = new TWEEN.Tween({ theta: -Math.PI/30, shoulder_y: 1 })
            .to({ theta: Math.PI/30, shoulder_y: [0,1]}, 1400) 
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate(function () {

                rotateLeftUpperArm2(this._object.theta, this._object.shoulder_y);
                rotateRightUpperArm2(this._object.theta, this._object.shoulder_y);

                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

        let lowerArmTweenInitial = new TWEEN.Tween({ theta: 0 })
            .to({ theta: -Math.PI}, 700) 
            .onUpdate(function () {

                rotateLeftLowerArm2(this._object.theta);

                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

        // Por que o efeito das rotacoes nao persiste quando � com o mesmo objeto?
        let lowerArmTweenLoop = new TWEEN.Tween({ theta: -Math.PI })
            .to({ theta: Math.PI }, 1400)
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate(function () {
                
                rotateLeftLowerArm2(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

        let lowerArmRightInitial = new TWEEN.Tween( {theta:0} )
            .to( {theta: -Math.PI/20}, 700)
            .onUpdate(function(){
                rotateRightLowerArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            }) 

        let lowerArmRightLoop = new TWEEN.Tween( {theta: -Math.PI/20} )
            .to( {theta: 0}, 1400)
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate(function(){
                rotateRightLowerArm(this._object.theta);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            }) 

        let torsoDance = new TWEEN.Tween({ theta: 0 })
            .to({ theta: -Math.PI / 30 }, 700)
            .onUpdate(function () {
                  let torso = robot.getObjectByName("torso");

                  rotateAroundPivot(0, 0, this._object.theta, torso);
                  rotateRightUpperLeg(-this._object.theta);
                  rotateLeftUpperLeg(-this._object.theta);  

                  torso.matrixAutoUpdate = false;


              // Updating final world matrix (with parent transforms) - mandatory
              torso.updateMatrixWorld(true);
                // Updating screen
              stats.update();
              renderer.render(scene, camera);

            }) 

        let torsoDance2 = new TWEEN.Tween({ theta:  -Math.PI / 30  })
            .to({ theta: Math.PI / 30 }, 1400)
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate(function () {
                let torso = robot.getObjectByName("torso");

                rotateAroundPivot(0, 0, this._object.theta, torso);
                rotateRightUpperLeg(-this._object.theta);
                rotateLeftUpperLeg(-this._object.theta);

                torso.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                torso.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })          
        
        lowerArmRightInitial.chain(lowerArmRightLoop);
        lowerArmTweenInitial.chain(lowerArmTweenLoop);
        torsoDance.chain(torsoDance2);
        upperArmsTweenInitial.chain(upperArmsTweenLoop);
        headTweenInitial.chain(headTweenLoop);

        torsoDance.start();
        lowerArmTweenInitial.start();
        upperArmsTweenInitial.start();
        headTweenInitial.start();
        lowerArmRightInitial.start();
        
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
