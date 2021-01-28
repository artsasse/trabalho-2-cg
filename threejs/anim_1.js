function WaveAnimation() {}

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

Object.assign( WaveAnimation.prototype, {

    init: function() {
        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/2}, 500)
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
        
        let lowerArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta: Math.PI/2}, 500)
            .onUpdate(function(){
                let right_lower_arm = robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm");
                
                rotateAroundPivot(0, 1.5, this._object.theta, right_lower_arm);

                right_lower_arm.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                right_lower_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        // Por que o efeito das rotacoes nao persiste quando é com o mesmo objeto?
        let lowerArmTweenWave = new TWEEN.Tween( {theta:(Math.PI/2)} )
        .to( {theta: [2*(Math.PI/3), (Math.PI/2), (Math.PI/3)]}, 2000)
        .repeat(5)
        .yoyo(true)
        .onUpdate(function(){
            let right_lower_arm = robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm");
            
            rotateAroundPivot(0, 1.5, this._object.theta, right_lower_arm);

            right_lower_arm.matrixAutoUpdate = false;

            // Updating final world matrix (with parent transforms) - mandatory
            right_lower_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);    
        })

        let handTweenToLeft = new TWEEN.Tween( {theta:0} )
            .to( {theta: Math.PI/5.3}, 500)
            .repeat(1)
            .yoyo(true)
            .onUpdate(function(){
                let right_hand =  robot.getObjectByName("right_upper_arm").getObjectByName("hand");
                
                rotateAroundPivot(0.5, 0, this._object.theta, right_hand);

                // right_hand.matrixAutoUpdate = false;

                // Updating final world matrix (with parent transforms) - mandatory
                right_hand.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let handTweenToRight = new TWEEN.Tween( {theta:0} )
            .to( {theta: -Math.PI/5.3}, 500)
            .repeat(1)
            .yoyo(true)
            .onUpdate(function(){
                let right_hand =  robot.getObjectByName("right_upper_arm").getObjectByName("hand");

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
        .repeat(5)
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
            .repeat(1)
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

        
        
        upperArmTween.chain(lowerArmTween);
        lowerArmTween.chain(handTweenToLeft, lowerArmTweenWave, lowerArmLeft, leftHandTween);
        handTweenToLeft.chain(handTweenToRight);
        handTweenToRight.chain(handTweenToLeft);
        //  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
        upperArmTween.start();       
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




