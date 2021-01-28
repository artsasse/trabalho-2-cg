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
        let upperArmTween = new TWEEN.Tween( {theta:0, shoulder: 2.6} )
            .to( {theta:Math.PI/2, shoulder:2.1 }, 500)
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
        // Here you may include animations for other parts 
        
        // let lowerArmTween = new TWEEN.Tween( {theta:0, elbow: 0} )
        //     .to( {theta: Math.PI/2, elbow: 1}, 500)
        //     .onUpdate(function(){
        //         let right_lower_arm =  robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm");
        //         right_lower_arm.matrix
        //             .makeRotationZ(this._object.theta)
        //             .premultiply( new THREE.Matrix4().makeTranslation(this._object.elbow, -2, 0 ) );

        //         // Updating final world matrix (with parent transforms) - mandatory
        //         right_lower_arm.updateMatrixWorld(true);
        //         // Updating screen
        //         stats.update();
        //         renderer.render(scene, camera);    
        //     })

        // let handTweenToLeft = new TWEEN.Tween( {theta:0} )
        // .to( {theta: Math.PI/5.3}, 500)
        // .onUpdate(function(){
        //     let right_hand =  robot.getObjectByName("right_upper_arm").getObjectByName("hand");
        //     right_hand.matrix
        //         .makeRotationZ(this._object.theta)
        //         .premultiply( new THREE.Matrix4().makeTranslation(0, -1.5, 0 ) );

        //     // Updating final world matrix (with parent transforms) - mandatory
        //     right_hand.updateMatrixWorld(true);
        //     // Updating screen
        //     stats.update();
        //     renderer.render(scene, camera);    
        // })

        // let handTweenToRight = new TWEEN.Tween( {theta:0} )
        // .to( {theta: -Math.PI/5.3}, 500)
        // .onUpdate(function(){
        //     let right_hand =  robot.getObjectByName("right_upper_arm").getObjectByName("hand");
        //     right_hand.matrix
        //         .makeRotationZ(this._object.theta)
        //         .premultiply( new THREE.Matrix4().makeTranslation(0, -1.5, 0 ) );

        //     // Updating final world matrix (with parent transforms) - mandatory
        //     right_hand.updateMatrixWorld(true);
        //     // Updating screen
        //     stats.update();
        //     renderer.render(scene, camera);    
        // })
        
        // upperArmTween.chain(lowerArmTween);
        // lowerArmTween.chain(handTweenToLeft);
        // handTweenToLeft.chain(handTweenToRight);
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




