function WaveAnimation() {}

Object.assign( WaveAnimation.prototype, {

    init: function() {
        let upperArmTween = new TWEEN.Tween( {theta:0, shoulder:0} )
            .to( {theta:Math.PI/2, shoulder:1.8 }, 500)
            .onUpdate(function(){
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                right_upper_arm.matrix
                    .makeRotationZ(this._object.theta)
                    .premultiply( new THREE.Matrix4().makeTranslation(right_upper_arm.position.x, this._object.shoulder, 0 ) );

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })
        // Here you may include animations for other parts 
        
        let lowerArmTween = new TWEEN.Tween( {theta:0, elbow: 0} )
            .to( {theta: Math.PI/2, elbow: 1}, 500)
            .onUpdate(function(){
                let right_lower_arm =  robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm");
                right_lower_arm.matrix
                    .makeRotationZ(this._object.theta)
                    .premultiply( new THREE.Matrix4().makeTranslation(this._object.elbow, -2, 0 ) );

                // Updating final world matrix (with parent transforms) - mandatory
                right_lower_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let handTweenToLeft = new TWEEN.Tween( {theta:0} )
        .to( {theta: Math.PI/5.3}, 500)
        .onUpdate(function(){
            let right_hand =  robot.getObjectByName("right_upper_arm").getObjectByName("hand");
            right_hand.matrix
                .makeRotationZ(this._object.theta)
                .premultiply( new THREE.Matrix4().makeTranslation(0, -1.5, 0 ) );

            // Updating final world matrix (with parent transforms) - mandatory
            right_hand.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);    
        })

        let handTweenToRight = new TWEEN.Tween( {theta:0} )
        .to( {theta: -Math.PI/5.3}, 500)
        .onUpdate(function(){
            let right_hand =  robot.getObjectByName("right_upper_arm").getObjectByName("hand");
            right_hand.matrix
                .makeRotationZ(this._object.theta)
                .premultiply( new THREE.Matrix4().makeTranslation(0, -1.5, 0 ) );

            // Updating final world matrix (with parent transforms) - mandatory
            right_hand.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);    
        })
        
        upperArmTween.chain(lowerArmTween);
        lowerArmTween.chain(handTweenToLeft);
        handTweenToLeft.chain(handTweenToRight);
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




