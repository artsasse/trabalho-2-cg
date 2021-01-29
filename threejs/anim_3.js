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

Object.assign( DanceAnimation.prototype, {

    init: function() {
        let rightUpperArm1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: Math.PI/1.7}, 1000)
            .onUpdate(function(){
                let right_upper_arm = robot.getObjectByName("right_upper_arm");

                rotateAroundPivot(-0.5, 1.8, this._object.theta, right_upper_arm);

                // Segundo os docs do three.js é importante setar para false para evitar problemas
                // quando mexemos diretamente com as matrizes dos objetos.
                right_upper_arm.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let rightLowerArm1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: 3*Math.PI/4}, 500)
            .onUpdate(function(){
                let right_lower_arm = robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm");
                
                rotateAroundPivot(0.5, 1.5, this._object.theta, right_lower_arm);

                right_lower_arm.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                right_lower_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let leftUpperArm1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: -Math.PI/1.7}, 1000)
            .onUpdate(function(){
                let part = robot.getObjectByName("left_upper_arm");

                rotateAroundPivot(0.5, 1.8, this._object.theta, part);

                // Segundo os docs do three.js é importante setar para false para evitar problemas
                // quando mexemos diretamente com as matrizes dos objetos.
                part.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                part.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let leftLowerArm1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: -3*Math.PI/4}, 500)
            .onUpdate(function(){
                let part = robot.getObjectByName("left_upper_arm").getObjectByName("lower_arm");
                
                rotateAroundPivot(-0.5, 1.5, this._object.theta, part);

                part.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                part.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let rightUpperLeg1 = new TWEEN.Tween( {theta:0} )
            .to( {theta: Math.PI/6}, 500)
            .onUpdate(function(){
                let part = robot.getObjectByName("right_upper_leg");
                
                rotateAroundPivot(0, 2, this._object.theta, part);

                part.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                part.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })
        
        leftLowerArm1.chain(rightUpperLeg1);
        rightLowerArm1.chain(leftUpperArm1, leftLowerArm1);
        rightUpperArm1.chain(rightLowerArm1);
        rightUpperArm1.start();       
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
